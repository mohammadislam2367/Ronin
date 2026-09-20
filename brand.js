/* ═══════════════════════════════════════════════════════════════
   RONIN STORE — BRAND | لوگو • نام سایت (فقط مالک 👑)
   ═══════════════════════════════════════════════════════════════ */
"use strict";
(function () {

/* ۱ ▸ استایل */
if (!document.getElementById("brand-css")) {
  var st = document.createElement("style");
  st.id = "brand-css";
  st.textContent =
    "#top .brandmark img{width:100%;height:100%;object-fit:cover;border-radius:12px}" +
    ".lgpick{display:flex;flex-wrap:wrap;gap:8px}" +
    ".lgpick button{width:54px;height:54px;border-radius:14px;font-size:21px;line-height:1;" +
      "background:rgba(120,130,220,.08);border:1px solid rgba(140,150,230,.25);padding:3px}" +
    ".lgpick button.on{border-color:#8fdcff;box-shadow:0 0 14px rgba(143,220,255,.55)}" +
    ".lgpick button svg{width:100%;height:100%}";
  document.head.appendChild(st);
}

/* ۲ ▸ لوگوهای آماده */
R.LOGOS = {
  shinobi: "忍",
  ronin2: "浪人",
  torii: "⛩",
  dragon: "🐉",
  swords: "⚔",
  emblem: '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="rgx" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7c5cff"/><stop offset="1" stop-color="#22d3ee"/></linearGradient></defs><path d="M32 3l25 14v30L32 61 7 47V17z" fill="#0a0e22" stroke="url(#rgx)" stroke-width="3"/><path d="M20 45L44 21" stroke="url(#rgx)" stroke-width="4" stroke-linecap="round"/><text x="32" y="41" text-anchor="middle" font-size="23" fill="#eef1ff">忍</text></svg>'
};

/* ۳ ▸ اعمال روی سایت */
R.applyBrand = function (b) {
  b = b || {};
  var n = b.name || "RONIN STORE";
  var sb = b.sub || "ANIME • COMMUNITY • MARKETPLACE";
  var lg = b.logo || "忍";
  var t1 = document.querySelector("#top .brandtx b");
  var t2 = document.querySelector("#top .brandtx small");
  var mk = document.querySelector("#top .brandmark");
  if (t1) t1.textContent = n;
  if (t2) t2.textContent = sb;
  if (mk) mk.innerHTML = lg.indexOf("data:image") === 0 ? '<img src="' + lg + '" alt="">' : lg;
  document.title = n + " — Anime Universe";
  var old = document.head.querySelectorAll("link[rel='icon']");
  for (var i = 0; i < old.length; i++) document.head.removeChild(old[i]);
  var ic = document.createElement("link");
  ic.rel = "icon";
  ic.href = lg.indexOf("data:image") === 0 ? lg
    : "data:image/svg+xml," + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0a0e22"/><text x="32" y="45" text-anchor="middle" font-size="34" fill="#8fdcff">' + lg + "</text></svg>");
  document.head.appendChild(ic);
};

/* ۴ ▸ خواندن از دیتابیس */
function watch() {
  if (!R.db || R._bw) return;
  R._bw = true;
  R.db.ref("settings/brand").on("value", function (s) {
    R.brand = s.val() || {};
    R.applyBrand(R.brand);
  }, function () {});
}

/* ۵ ▸ کارت ویرایش (فقط مالک) */
function card() {
  if (!R.isOwner()) return;
  var sec = document.getElementById("sec-settings");
  if (!sec || document.getElementById("brandCard")) return;
  var b = R.brand || {};
  var h = '<div class="card mb" id="brandCard">' +
    '<div class="between"><span class="sm b">🖼 لوگو و نام سایت</span>' +
    '<span class="chip gd">👑 فقط مالک</span></div>' +
    '<div class="xs mut mt mb">لوگو:</div><div class="lgpick">';
  Object.keys(R.LOGOS).forEach(function (k) {
    h += '<button data-logo="' + k + '">' + R.LOGOS[k] + "</button>";
  });
  h += "</div>";
  h += '<label class="btn mini" style="display:inline-block;margin:12px 0;cursor:pointer">' +
       '🖼 عکس لوگو از گالری<input id="logoFile" type="file" accept="image/*" hidden></label>';
  h += '<div class="field"><label class="lbl">نام سایت</label>' +
       '<input class="inp" id="bName" maxlength="24" value="' + R.esc(b.name || "RONIN STORE") + '"></div>';
  h += '<div class="field"><label class="lbl">زیرنویس</label>' +
       '<input class="inp" id="bSub" maxlength="48" value="' + R.esc(b.sub || "ANIME • COMMUNITY • MARKETPLACE") + '"></div>';
  h += '<button class="btn p" data-bsave="1">💾 ذخیره لوگو</button></div>';
  var d = document.createElement("div");
  d.innerHTML = h;
  sec.appendChild(d.firstChild);
  if (R.qa("#brandCard [data-logo]").forEach) {
    R.qa("#brandCard [data-logo]").forEach(function (x) {
      var kk = x.getAttribute("data-logo");
      if (R.LOGOS[kk] === (b.logo || "忍")) x.classList.add("on");
    });
  }
  var f = document.getElementById("logoFile");
  if (f) f.addEventListener("change", function (e) { pick(e.target.files && e.target.files[0]); e.target.value = ""; });
}

/* ۶ ▸ عکس لوگو از گالری */
function pick(file) {
  if (!file || !R.isOwner()) return;
  if (!file.type || file.type.indexOf("image/") !== 0) return R.toast("فقط عکس 🖼", "err");
  if (file.size > 8 * 1024 * 1024) return R.toast("عکس بزرگ‌تر از ۸ مگه ❌", "err");
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
        R.brand = R.brand || {};
        R.brand.logo = c.toDataURL("image/webp", 0.9);
        R.applyBrand(R.brand);
        R.toast("آماده شد — حالا 💾 ذخیره رو بزن", "ok");
      } catch (e) { R.toast("پردازش نشد ❌", "err"); }
    };
    im.onerror = function () { R.toast("عکس خوانده نشد ❌", "err"); };
    im.src = fr.result;
  };
  fr.readAsDataURL(file);
}

/* ۷ ▸ کلیک‌ها */
document.addEventListener("click", function (e) {
  var t = e.target && e.target.closest ? e.target.closest("[data-logo],[data-bsave]") : null;
  if (!t) return;
  e.preventDefault();
  if (!R.isOwner()) return R.toast("فقط مالک سایت 👑", "err");
  var k = t.getAttribute("data-logo");
  if (k) {
    R.brand = R.brand || {};
    R.brand.logo = R.LOGOS[k];
    R.applyBrand(R.brand);
    R.qa("#brandCard [data-logo]").forEach(function (x) { x.classList.toggle("on", x === t); });
    R.toast("انتخاب شد — 💾 ذخیره رو بزن", "ok");
    return;
  }
  if (t.getAttribute("data-bsave")) {
    var o = {
      logo: (R.brand && R.brand.logo) || "忍",
      name: R.clean(R.$("bName") ? R.$("bName").value : "", 24) || "RONIN STORE",
      sub: R.clean(R.$("bSub") ? R.$("bSub").value : "", 48) || "ANIME • COMMUNITY • MARKETPLACE",
      t: Date.now()
    };
    R.db.ref("settings/brand").set(o).then(function () {
      R.applyBrand(o); R.toast("لوگو و نام ذخیره شد ✅", "ok");
    }).catch(function (er) { R.toast("ذخیره نشد: " + er.message, "err"); });
  }
});

/* ۸ ▸ راه‌اندازی */
var prevLogin = R.onLogin;
R.onLogin = function () {
  if (prevLogin) { try { prevLogin(); } catch (e) {} }
  setTimeout(function () { watch(); card(); }, 500);
};
function boot() { watch(); setTimeout(card, 900); }
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();
setTimeout(function () { watch(); card(); }, 2200);

})();
