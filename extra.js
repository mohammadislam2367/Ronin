/* ═══════════════════════════════════════════════════════════════
   RONIN STORE — EXTRA | نصب مثل اپ (PWA) + ظاهر ویژه چت (پرمیوم)
   ═══════════════════════════════════════════════════════════════ */
"use strict";
(function () {

/* ── استایل ───────────────────────────────────────────────── */
if (!document.getElementById("extra-css")) {
  var st = document.createElement("style");
  st.id = "extra-css";
  st.textContent =
    ".bub.prem{background:linear-gradient(135deg,rgba(124,92,255,.44),rgba(34,211,238,.22))!important;" +
      "border:1px solid rgba(255,214,107,.45)!important;box-shadow:0 0 16px rgba(124,92,255,.38)!important}" +
    ".elite{font-size:11px}" +
    "#instBar{position:fixed;inset-inline:12px;bottom:92px;z-index:73;display:none;" +
      "align-items:center;gap:10px;padding:11px 13px;border-radius:16px;" +
      "background:linear-gradient(135deg,rgba(14,18,44,.96),rgba(9,12,30,.92));" +
      "border:1px solid rgba(130,215,255,.22);box-shadow:0 16px 40px rgba(0,0,0,.6)}" +
    "#instBar.on{display:flex}";
  document.head.appendChild(st);
}

/* ══════════ بخش ۱: نصب مثل اپ (PWA) ══════════ */
function manifest() {
  if (document.querySelector('link[rel="manifest"]')) return;
  var l = document.createElement("link");
  l.rel = "manifest";
  l.href = "manifest.webmanifest";
  document.head.appendChild(l);
}
function sw() {
  if (!("serviceWorker" in navigator)) return;
  if (location.protocol !== "https:") return;
  navigator.serviceWorker.register("sw.js").catch(function (e) {
    console.warn("[Ronin] sw:", e && e.message);
  });
}

var deferred = null;
window.addEventListener("beforeinstallprompt", function (e) {
  e.preventDefault(); deferred = e; bar(true);
});
window.addEventListener("appinstalled", function () {
  bar(false);
  if (R.toast) R.toast("رونین نصب شد 🎉", "ok");
});

function bar(on) {
  var d = document.getElementById("instBar");
  if (!d) {
    if (!on) return;
    d = document.createElement("div");
    d.id = "instBar";
    d.innerHTML = '<div style="font-size:22px">📱</div>' +
      '<div class="grow"><div class="sm b">رونین رو نصب کن</div>' +
      '<div class="xs mut">مثل یه اپ واقعی روی گوشی</div></div>' +
      '<button class="btn p mini" id="instDo">نصب</button>' +
      '<button class="btn mini" id="instNo">بعداً</button>';
    document.body.appendChild(d);
    document.getElementById("instNo").addEventListener("click", function () { d.remove(); });
    document.getElementById("instDo").addEventListener("click", function () {
      if (!deferred) return R.toast("از منوی مرورگر «افزودن به صفحه اصلی» رو بزن", "err");
      deferred.prompt();
      if (deferred.userChoice) deferred.userChoice.then(function () { d.remove(); });
      deferred = null;
    });
  }
  d.classList.toggle("on", !!on);
}

/* ══════════ بخش ۲: ظاهر ویژه چت برای پرمیوم 💎 ══════════ */
R.PREMC = {};      /* کش: uid → پرمیوم؟ */
R._premQ = {};

R.premOf = function (uid) {
  if (!uid) return false;
  if (uid === R.ME) return !!R.prem;
  return R.PREMC[uid] === true;
};

function askPrem(uid) {
  if (!R.db || !uid || uid === R.ME) return;
  if (uid in R.PREMC || R._premQ[uid]) return;
  R._premQ[uid] = 1;
  R.db.ref("users/" + uid + "/prem").once("value").then(function (s) {
    R.PREMC[uid] = s.val() === true;
    if (R.PREMC[uid] && R.renderChat) R.renderChat();
  }).catch(function () { R.PREMC[uid] = false; });
}

/* بازنویسی ردیف پیام: حباب و نشان ویژه */
var _row = R.chatRow;
R.chatRow = function (m, path) {
  var h = _row(m, path);
  askPrem(m && m.uid);
  if (R.premOf(m && m.uid)) {
    h = h.replace('<div class="bub">', '<div class="bub prem">');
    h = h.replace('<b class="xs cy">', '<b class="xs cy"><span class="elite">💎</span> ');
  }
  return h;
};

/* ══════════ راه‌اندازی ══════════ */
function boot() {
  try { manifest(); } catch (e) {}
  try { sw(); } catch (e) {}
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();

})();
