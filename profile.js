/* ═══════════════════════════════════════════════════════════════
   RONIN STORE — PROFILE+ | عکس پروفایل • آواتار آماده • قاب
   ═══════════════════════════════════════════════════════════════ */
"use strict";
(function () {

/* ۱ ▸ استایل */
if (!document.getElementById("profx-css")) {
  var st = document.createElement("style");
  st.id = "profx-css";
  st.textContent =
    ".av.fr-basic{box-shadow:0 0 0 2px rgba(170,170,210,.4)}" +
    ".av.fr-pink{box-shadow:0 0 0 2px #ff4fcf,0 0 14px rgba(255,79,207,.6)}" +
    ".av.fr-cyan{box-shadow:0 0 0 2px #22d3ee,0 0 14px rgba(34,211,238,.6)}" +
    ".av.fr-violet{box-shadow:0 0 0 2px #a78bfa,0 0 15px rgba(167,139,250,.65)}" +
    ".av.fr-gold{box-shadow:0 0 0 2px #ffd66b,0 0 16px rgba(255,214,107,.7)}" +
    ".pick{display:grid;grid-template-columns:repeat(auto-fill,minmax(52px,1fr));gap:8px}" +
    ".pick button{background:0;border:2px solid transparent;border-radius:50%;padding:1px;line-height:0}" +
    ".pick button.on{border-color:#8fdcff}" +
    ".pick img,.pick svg{width:42px;height:42px;border-radius:50%;display:block}" +
    ".frpick button{border-radius:11px;padding:6px 9px;line-height:1.7;border:1px solid rgba(140,140,220,.25)}" +
    ".upl{display:inline-block;margin:12px 0;cursor:pointer}";
  document.head.appendChild(st);
}

/* ۲ ▸ آواتارهای آماده */
R.AVP = {
  ronin: { n: "رونین", p: false, s: '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" fill="#2a1c12"/><path d="M18 18h28l-3-9H21z" fill="#ffb03a"/><circle cx="32" cy="38" r="17" fill="#ffd9b3"/><rect x="13" y="27" width="38" height="9" fill="#e63946"/><rect x="26" y="24" width="12" height="10" rx="2" fill="#cfd3e6"/><circle cx="25" cy="42" r="3" fill="#1b1e33"/><circle cx="39" cy="42" r="3" fill="#1b1e33"/></svg>' },
  kitsune: { n: "کیتسونه", p: false, s: '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" fill="#1a1030"/><path d="M12 22 17 7l11 8h8l11-8 5 15z" fill="#f6f6ff"/><path d="M14 22h36a18 18 0 0 1-36 0z" fill="#f6f6ff"/><circle cx="25" cy="32" r="3.5" fill="#e63946"/><circle cx="39" cy="32" r="3.5" fill="#e63946"/><path d="M32 40l-4 5h8z" fill="#e63946"/></svg>' },
  sakura: { n: "ساکورا", p: false, s: '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" fill="#2b1030"/><g fill="#ff9ecb"><circle cx="32" cy="20" r="11"/><circle cx="32" cy="44" r="11"/><circle cx="20" cy="32" r="11"/><circle cx="44" cy="32" r="11"/></g><circle cx="32" cy="32" r="8" fill="#ffd66b"/></svg>' },
  neko: { n: "نکو", p: false, s: '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" fill="#12142a"/><path d="M14 24 18 9l10 7h8l10-7 4 15z" fill="#8b93b8"/><circle cx="32" cy="38" r="17" fill="#b9c0de"/><circle cx="25" cy="36" r="3.4" fill="#1b1e33"/><circle cx="39" cy="36" r="3.4" fill="#1b1e33"/><path d="M32 44l-4 3h8z" fill="#ff6fa5"/></svg>' },
  cyber: { n: "سایبر", p: true, s: '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" fill="#04121c"/><circle cx="32" cy="36" r="17" fill="#0d3346"/><rect x="13" y="27" width="38" height="11" rx="3" fill="#22d3ee"/><rect x="18" y="30" width="28" height="5" rx="2" fill="#04202c"/><path d="M32 50v9M22 55h20" stroke="#22d3ee" stroke-width="3"/></svg>' },
  oni: { n: "اونی", p: true, s: '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" fill="#1b0a12"/><path d="M18 16l4-10 8 7M46 16l-4-10-8 7" stroke="#ffd66b" stroke-width="4" fill="none"/><circle cx="32" cy="37" r="17" fill="#e63946"/><circle cx="25" cy="34" r="3.4" fill="#ffd66b"/><circle cx="39" cy="34" r="3.4" fill="#ffd66b"/><path d="M24 45h16" stroke="#25060d" stroke-width="4"/></svg>' },
  moon: { n: "روح ماه", p: true, s: '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" fill="#0a0620"/><circle cx="32" cy="32" r="20" fill="#f3efff"/><circle cx="40" cy="26" r="16" fill="#0a0620"/><circle cx="24" cy="34" r="2" fill="#a78bfa"/><circle cx="30" cy="42" r="1.6" fill="#a78bfa"/></svg>' },
  samurai: { n: "سامورایی", p: true, s: '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" fill="#1a1608"/><path d="M10 30 32 8l22 22-6 6H16z" fill="#ffd66b"/><path d="M32 8l-6 6 6 24 6-24z" fill="#d99e0b"/><circle cx="32" cy="44" r="12" fill="#2a2d47"/><rect x="20" y="41" width="24" height="5" rx="2" fill="#e63946"/></svg>' }
};

/* ۳ ▸ قاب‌ها */
R.AVF = [
  { id: "basic", n: "ساده", p: false },
  { id: "pink", n: "صورتی", p: true },
  { id: "cyan", n: "فیروزه‌ای", p: true },
  { id: "violet", n: "بنفش", p: true },
  { id: "gold", n: "طلایی", p: true }
];

/* ۴ ▸ نمایش آواتار با قاب */
R.avHTML = function (u, cls) {
  u = u || {};
  var ini = R.esc(R.initials(u.name));
  var inner = u.av ? '<img src="' + R.esc(u.av) + '" alt="">' : ini;
  var fr = u.avFrame ? " fr-" + u.avFrame : "";
  return '<div class="av ' + (cls || "") + fr + '">' + inner + "</div>";
};

/* ۵ ▸ ذخیره */
R.saveAv = function (o) {
  if (!R.ME) return R.needLogin("پروفایل");
  if (!R.db) return R.toast("اتصال برقرار نشد ❌", "err");
  R.db.ref("users/" + R.ME).update(o).then(function () {
    if (R.USER) { for (var k in o) R.USER[k] = o[k]; }
    R.toast("ذخیره شد ✅", "ok");
    if (R.renderProfile) R.renderProfile(R.ME);
  }).catch(function (e) { R.toast("ذخیره نشد: " + e.message, "err"); });
};

/* ۶ ▸ فشرده‌سازی عکس گالری */
R.pickPhoto = function (file) {
  if (!file) return;
  if (!file.type || file.type.indexOf("image/") !== 0) return R.toast("فقط عکس انتخاب کن 🖼", "err");
  if (file.size > 8 * 1024 * 1024) return R.toast("عکس بزرگ‌تر از ۸ مگه ❌", "err");
  R.toast("دارم عکس رو آماده می‌کنم… ⏳", "ok");
  var fr = new FileReader();
  fr.onload = function () {
    var im = new Image();
    im.onload = function () {
      try {
        var S = 256, c = document.createElement("canvas");
        c.width = c.height = S;
        var x = c.getContext("2d");
        var m = Math.min(im.width, im.height);
        x.drawImage(im, (im.width - m) / 2, (im.height - m) / 2, m, m, 0, 0, S, S);
        var out = c.toDataURL("image/webp", 0.72);
        if (out.indexOf("webp") === -1) out = c.toDataURL("image/jpeg", 0.82);
        if (out.length > 160000) out = c.toDataURL("image/jpeg", 0.55);
        R.saveAv({ av: out, avKind: "photo", avPre: "", avAt: Date.now() });
      } catch (e) { R.toast("پردازش عکس نشد ❌", "err"); }
    };
    im.onerror = function () { R.toast("این عکس خوانده نشد ❌", "err"); };
    im.src = fr.result;
  };
  fr.onerror = function () { R.toast("خواندن فایل نشد ❌", "err"); };
  fr.readAsDataURL(file);
};

/* ۷ ▸ کارت آواتار در پروفایل */
R.avCard = function () {
  var u = R.USER || {};
  var h = '<div class="card mb" id="avCard">';
  h += '<div class="between"><span class="sm b">🎨 آواتار و قاب</span>' +
       '<span class="xs mut">' + (R.prem ? "💎 پرمیوم" : "پایه") + "</span></div>";
  h += '<div class="xs mut mt mb">از گالری عکس بذار، یا یکی از آواتارهای آماده رو بزن</div>';
  h += '<div class="pick">';
  Object.keys(R.AVP).forEach(function (k) {
    var a = R.AVP[k];
    h += '<button class="' + (u.avPre === k ? "on" : "") + '" data-avp="' + k +
         '" title="' + a.n + (a.p && !R.prem ? " (پرمیوم)" : "") + '">' + a.s + "</button>";
  });
  h += "</div>";
  h += '<label class="btn mini upl">🖼 انتخاب عکس از گالری' +
       '<input id="avFile" type="file" accept="image/*" hidden></label>';
  h += '<div class="xs mut mb">قاب پروفایل:</div><div class="pick frpick">';
  R.AVF.forEach(function (f) {
    h += '<button class="xs ' + ((u.avFrame || "basic") === f.id ? "on" : "") + '" data-avf="' +
         f.id + '">' + f.n + (f.p && !R.prem ? " 💎" : "") + "</button>";
  });
  h += "</div></div>";
  return h;
};

/* ۸ ▸ تزریق کارت */
R.avHook = function () {
  var box = R.$("profBox");
  if (!box || !R.ME) return;
  if (box.querySelector("#avCard")) return;
  var d = document.createElement("div");
  d.innerHTML = R.avCard();
  box.insertBefore(d.firstChild, box.firstChild);
  var f = R.$("avFile");
  if (f) f.addEventListener("change", function (e) {
    R.pickPhoto(e.target.files && e.target.files[0]);
    e.target.value = "";
  });
};

/* ۹ ▸ کلیک روی آواتار و قاب */
document.addEventListener("click", function (e) {
  var t = e.target && e.target.closest ? e.target.closest("[data-avp],[data-avf]") : null;
  if (!t) return;
  e.preventDefault();
  var p = t.getAttribute("data-avp"), f = t.getAttribute("data-avf");
  if (p) {
    var a = R.AVP[p];
    if (!a) return;
    if (a.p && !R.prem) return R.toast("این آواتار مخصوص پرمیوم است 💎", "err");
    R.saveAv({ av: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(a.s),
               avKind: "preset", avPre: p, avAt: Date.now() });
  } else if (f) {
    var fr = R.AVF.filter(function (x) { return x.id === f; })[0];
    if (fr && fr.p && !R.prem) return R.toast("این قاب مخصوص پرمیوم است 💎", "err");
    R.saveAv({ avFrame: f, avAt: Date.now() });
  }
});

/* ۱۰ ▸ زیر نظر گرفتن پروفایل */
(function start() {
  var b = R.$ && R.$("profBox");
  if (!b) { setTimeout(start, 400); return; }
  if (!window.MutationObserver) return;
  new MutationObserver(function () { setTimeout(R.avHook, 0); })
    .observe(b, { childList: true });
})();

})();
