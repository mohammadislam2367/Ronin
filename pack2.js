/* ═══════════════════════════════════════════════════════════════
   RONIN STORE — PACK 2  |  🥷 آرشیو همراه‌های ویژه (پرمیوم)
   ═══════════════════════════════════════════════════════════════ */
"use strict";
(function () {

/* ── استایل ─────────────────────────────────────────────────── */
if (!document.getElementById("pack2-css")) {
  var st = document.createElement("style");
  st.id = "pack2-css";
  st.textContent =
    "#gninja svg{filter:drop-shadow(0 6px 14px rgba(0,0,0,.5))}" +
    ".carc{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;" +
      "padding:12px 9px;border-radius:18px;background:rgba(11,13,35,.7);" +
      "border:1px solid rgba(132,124,255,.22);transition:.2s;cursor:pointer}" +
    ".carc:hover{border-color:rgba(34,211,238,.55);transform:translateY(-3px)}" +
    ".carc.on{border-color:#ffd66b;box-shadow:0 0 18px rgba(255,214,107,.35)}" +
    ".carc .cw{width:66px;height:80px;display:grid;place-items:center;overflow:hidden}" +
    ".carc .cw svg{width:100%;height:100%}" +
    ".carc .cn{font-size:12px;font-weight:800}" +
    ".carc .cr{font-size:10px;color:#a8a7c3}" +
    ".carc.lk{opacity:.55}" +
    ".carc .lk2{position:absolute;top:7px;inset-inline-end:7px;font-size:11px}";
  document.head.appendChild(st);
}

/* ── کاراکترها (viewBox اصلی: 0 0 120 152) ─────────────────── */
var CH = {};

CH.ninja = { n: "نینجا", r: "پایه • رایگان", p: false,
  d: "همراه پیش‌فرض رونین", html: "" };

CH.samurai = { n: "سامورایی", r: "کمیاب • پرمیوم", p: true,
  d: "شمشیرزن وفادار با کلاه‌خود طلایی", html:
'<svg viewBox="0 0 120 152" xmlns="http://www.w3.org/2000/svg">' +
'<ellipse cx="60" cy="145" rx="33" ry="6.5" fill="rgba(0,0,0,.45)"/>' +
'<rect x="44" y="105" width="12" height="34" rx="6" fill="#232637"/>' +
'<rect x="64" y="105" width="12" height="34" rx="6" fill="#232637"/>' +
'<rect x="41" y="132" width="18" height="11" rx="5.5" fill="#11131f"/>' +
'<rect x="61" y="132" width="18" height="11" rx="5.5" fill="#11131f"/>' +
'<path d="M38 62h44a10 10 0 0 1 10 10v34a10 10 0 0 1-10 10H38a10 10 0 0 1-10-10V72a10 10 0 0 1 10-10z" class="ja"/>' +
'<path d="M26 64h68v10H26z" class="jb"/>' +
'<rect x="92" y="56" width="6" height="50" rx="3" class="jc" transform="rotate(10 95 81)"/>' +
'<circle cx="60" cy="42" r="25" fill="#ffd9b3"/>' +
'<ellipse cx="50" cy="46" rx="3.2" ry="3.8" fill="#1b1e33"/>' +
'<ellipse cx="70" cy="46" rx="3.2" ry="3.8" fill="#1b1e33"/>' +
'<path d="M38 52q22 15 44 0q-4 12-22 12t-22-12z" fill="#2a2e4a"/>' +
'<path d="M32 37q0-25 28-25t28 25z" class="jb"/>' +
'<path d="M60 12l-7-11 7 5 7-5z" class="jc"/>' +
'<path d="M30 34h60v7H30z" class="jc"/>' +
'<path d="M24 33q-11-2-13-13q15 2 23 9z" class="jb"/>' +
'<path d="M96 33q11-2 13-13q-15 2-23 9z" class="jb"/></svg>' };

CH.mage = { n: "جادوگر", r: "کمیاب • پرمیوم", p: true,
  d: "جادوگر رونین با عصای نور", html:
'<svg viewBox="0 0 120 152" xmlns="http://www.w3.org/2000/svg">' +
'<ellipse cx="60" cy="145" rx="33" ry="6.5" fill="rgba(0,0,0,.45)"/>' +
'<rect x="44" y="108" width="12" height="31" rx="6" fill="#232637"/>' +
'<rect x="64" y="108" width="12" height="31" rx="6" fill="#232637"/>' +
'<rect x="41" y="132" width="18" height="11" rx="5.5" fill="#11131f"/>' +
'<rect x="61" y="132" width="18" height="11" rx="5.5" fill="#11131f"/>' +
'<path d="M41 66h38l14 52H27z" class="ja"/>' +
'<path d="M47 66h26l-6 22H53z" class="jb"/>' +
'<rect x="24" y="58" width="6" height="66" rx="3" fill="#6b5a3e"/>' +
'<circle cx="27" cy="52" r="10" class="jc"/>' +
'<circle cx="60" cy="44" r="24" fill="#ffd9b3"/>' +
'<ellipse cx="50" cy="48" rx="3.2" ry="3.8" fill="#1b1e33"/>' +
'<ellipse cx="70" cy="48" rx="3.2" ry="3.8" fill="#1b1e33"/>' +
'<path d="M39 54q21 15 42 0q-4 12-21 12t-21-12z" fill="#2a2e4a"/>' +
'<path d="M32 32h56v8H32z" class="jb"/>' +
'<path d="M60 2L36 33h48z" class="jc"/>' +
'<circle cx="60" cy="8" r="3.4" class="jb"/></svg>' };

CH.cyber = { n: "سایبر", r: "حماسی • پرمیوم", p: true,
  d: "جنگاور سایبری با بازوی نئونی", html:
'<svg viewBox="0 0 120 152" xmlns="http://www.w3.org/2000/svg">' +
'<ellipse cx="60" cy="145" rx="33" ry="6.5" fill="rgba(0,0,0,.45)"/>' +
'<rect x="44" y="105" width="12" height="34" rx="6" fill="#1b2233"/>' +
'<rect x="64" y="105" width="12" height="34" rx="6" fill="#1b2233"/>' +
'<rect x="41" y="132" width="18" height="11" rx="5.5" fill="#0b1220"/>' +
'<rect x="61" y="132" width="18" height="11" rx="5.5" fill="#0b1220"/>' +
'<path d="M38 62h44a10 10 0 0 1 10 10v34a10 10 0 0 1-10 10H38a10 10 0 0 1-10-10V72a10 10 0 0 1 10-10z" class="ja"/>' +
'<path d="M46 70h28v22H46z" class="jb"/>' +
'<circle cx="60" cy="81" r="6" class="jc"/>' +
'<rect x="72" y="70" width="12" height="30" rx="6" class="jb"/>' +
'<circle cx="60" cy="44" r="24" fill="#0d1b26"/>' +
'<rect x="35" y="39" width="50" height="14" rx="7" class="jc"/>' +
'<rect x="39" y="42" width="42" height="8" rx="4" fill="#04121c"/>' +
'<path d="M60 20v-10" stroke="#67e8f9" stroke-width="3"/>' +
'<circle cx="60" cy="7" r="4" class="jc"/>' +
'<path d="M37 35h46" stroke="#22d3ee" stroke-width="2"/></svg>' };

CH.kitsune = { n: "کیتسونه", r: "حماسی • پرمیوم", p: true,
  d: "روح روباه با دُم درخشان", html:
'<svg viewBox="0 0 120 152" xmlns="http://www.w3.org/2000/svg">' +
'<ellipse cx="60" cy="145" rx="33" ry="6.5" fill="rgba(0,0,0,.45)"/>' +
'<path d="M90 112q28-6 24-30q-4-20-24-12q12 22-6 30z" class="jb"/>' +
'<rect x="44" y="105" width="12" height="34" rx="6" fill="#2a2d47"/>' +
'<rect x="64" y="105" width="12" height="34" rx="6" fill="#2a2d47"/>' +
'<rect x="41" y="132" width="18" height="11" rx="5.5" fill="#141726"/>' +
'<rect x="61" y="132" width="18" height="11" rx="5.5" fill="#141726"/>' +
'<path d="M38 62h44a10 10 0 0 1 10 10v34a10 10 0 0 1-10 10H38a10 10 0 0 1-10-10V72a10 10 0 0 1 10-10z" class="ja"/>' +
'<rect x="30" y="66" width="60" height="9" rx="4" class="jc"/>' +
'<circle cx="60" cy="42" r="25" fill="#fff3e0"/>' +
'<path d="M34 32L28 6l20 12z" class="ja"/>' +
'<path d="M86 32L92 6L72 18z" class="ja"/>' +
'<circle cx="50" cy="44" r="3.4" fill="#1b1e33"/>' +
'<circle cx="70" cy="44" r="3.4" fill="#1b1e33"/>' +
'<path d="M60 50l-5 5h10z" fill="#e63946"/>' +
'<path d="M42 54q18 10 36 0" stroke="#d2c7b3" stroke-width="2" fill="none"/></svg>' };

CH.oni = { n: "اونی", r: "افسانه‌ای • پرمیوم", p: true,
  d: "دیو جنگل با شاخ و گرز", html:
'<svg viewBox="0 0 120 152" xmlns="http://www.w3.org/2000/svg">' +
'<ellipse cx="60" cy="145" rx="33" ry="6.5" fill="rgba(0,0,0,.45)"/>' +
'<rect x="44" y="105" width="12" height="34" rx="6" fill="#2a2d47"/>' +
'<rect x="64" y="105" width="12" height="34" rx="6" fill="#2a2d47"/>' +
'<rect x="41" y="132" width="18" height="11" rx="5.5" fill="#141726"/>' +
'<rect x="61" y="132" width="18" height="11" rx="5.5" fill="#141726"/>' +
'<path d="M38 62h44a10 10 0 0 1 10 10v34a10 10 0 0 1-10 10H38a10 10 0 0 1-10-10V72a10 10 0 0 1 10-10z" class="ja"/>' +
'<path d="M30 64q30 14 60 0v10q-30 13-60 0z" class="jc"/>' +
'<rect x="86" y="74" width="16" height="36" rx="7" class="jb"/>' +
'<circle cx="60" cy="42" r="25" fill="#e0563f"/>' +
'<path d="M38 30q-6-18 3-24q7 9 6 22z" class="jc"/>' +
'<path d="M82 30q6-18-3-24q-7 9-6 22z" class="jc"/>' +
'<circle cx="50" cy="44" r="3.6" fill="#ffd66b"/>' +
'<circle cx="70" cy="44" r="3.6" fill="#ffd66b"/>' +
'<path d="M44 54q16 11 32 0" stroke="#3a0d0d" stroke-width="3.4" fill="none"/>' +
'<path d="M48 51l-3 6M72 51l3 6" stroke="#fff" stroke-width="2.4"/></svg>' };

CH.cosmic = { n: "کیهانی", r: "افسانه‌ای • پرمیوم", p: true,
  d: "نگهبان ستاره‌ها با هاله کهکشانی", html:
'<svg viewBox="0 0 120 152" xmlns="http://www.w3.org/2000/svg">' +
'<ellipse cx="60" cy="145" rx="33" ry="6.5" fill="rgba(0,0,0,.45)"/>' +
'<rect x="44" y="105" width="12" height="34" rx="6" fill="#232637"/>' +
'<rect x="64" y="105" width="12" height="34" rx="6" fill="#232637"/>' +
'<rect x="41" y="132" width="18" height="11" rx="5.5" fill="#11131f"/>' +
'<rect x="61" y="132" width="18" height="11" rx="5.5" fill="#11131f"/>' +
'<path d="M38 62h44a10 10 0 0 1 10 10v34a10 10 0 0 1-10 10H38a10 10 0 0 1-10-10V72a10 10 0 0 1 10-10z" class="ja"/>' +
'<circle cx="48" cy="80" r="2.4" class="jc"/>' +
'<circle cx="72" cy="90" r="2" class="jc"/>' +
'<circle cx="60" cy="98" r="2.6" class="jc"/>' +
'<circle cx="60" cy="42" r="25" fill="#0b1030"/>' +
'<circle cx="51" cy="38" r="2.8" class="jc"/>' +
'<circle cx="69" cy="46" r="2.2" class="jc"/>' +
'<circle cx="60" cy="29" r="1.9" class="jc"/>' +
'<circle cx="48" cy="48" r="3" fill="#fff"/>' +
'<circle cx="72" cy="48" r="3" fill="#fff"/>' +
'<path d="M60 4l4 12 12 4-12 4-4 12-4-12-12-4 12-4z" class="jc"/></svg>' };

/* ── منطق ─────────────────────────────────────────────────── */
function av(id) { return CH[id] || CH.ninja; }

R.paintArchive = function () {
  var w = R.$("archWall"); if (!w) return;
  var cur = (R.USER && R.USER.npcChar) || R.npcCharCur || "ninja";
  w.innerHTML = Object.keys(CH).map(function (id) {
    var c = CH[id];
    var locked = c.p && !R.prem;
    var html = c.html || String(R.NPC_SVG || "").replace(/<style>[\s\S]*?<\/style>/, "");
    var prev = html.replace(/id="nj(Head|Arm)"/g, "");
    return '<div class="carc' + (cur === id ? " on" : "") + (locked ? " lk" : "") +
      '" data-char="' + id + '">' +
      (locked ? '<span class="lk2">💎</span>' : "") +
      '<div class="cw">' + prev + '</div>' +
      '<div class="cn">' + R.esc(c.n) + '</div>' +
      '<div class="cr">' + R.esc(c.r) + '</div></div>';
  }).join("");
};

R.pickChar = function (id) {
  var c = av(id);
  if (c.p && !R.prem) return R.toast("این همراه مخصوص پرمیوم است 💎", "err");
  if (!R.ME) return R.needLogin("همراه ویژه");
  R.npcCharCur = id;
  R.upd("users/" + R.ME, { npcChar: id }).catch(function () {});
  R._cNow = null;
  R.paintArchive();
  if (R.npcApply) R.npcApply();
  if (R.npcSay) R.npcSay("همراه جدید فعال شد! " + c.n, 3500);
  R.toast(c.n + " انتخاب شد ✅", "ok");
};

/* ── جایگزینی کاراکتر روی صفحه ─────────────────────────────── */
var apply0 = R.npcApply;
R.npcApply = function () {
  if (apply0) { try { apply0(); } catch (e) {} }
  try {
    var n = R.$("gninja"); if (!n) return;
    var id = (R.USER && R.USER.npcChar) || R.npcCharCur || "ninja";
    var c = av(id);
    if (c.p && !R.prem) { id = "ninja"; c = CH.ninja; }
    if (R._cNow === id) return;
    var wrap = document.createElement("div");
    wrap.innerHTML = c.html || R.NPC_SVG || "";
    var nsvg = wrap.querySelector("svg");
    var cur = n.querySelector("svg");
    if (nsvg && cur) { cur.parentNode.replaceChild(nsvg, cur); R._cNow = id; }
  } catch (e) { console.error("[Ronin pack2]", e); }
};

/* ── بخش + آیتم منو ───────────────────────────────────────── */
function build() {
  var ref = R.$("sec-settings") || R.$("sec-premium");
  if (ref && !R.$("sec-archive")) {
    var s = document.createElement("section");
    s.className = "sec"; s.id = "sec-archive";
    s.innerHTML = '<div class="head"><h2 class="h2">🥷 آرشیو همراه</h2>' +
      '<span class="xs mut">همراه راهنمای خودت را انتخاب کن</span></div>' +
      '<div class="grid auto" id="archWall"></div>' +
      '<div class="card mt"><div class="xs mut">💡 رنگ هر همراه را از ' +
      'تنظیمات → پالت کاراکتر عوض کن.</div></div>';
    ref.parentNode.insertBefore(s, ref.nextSibling);
  }
  var rail = R.$("rail");
  if (rail && !R.$("archItem")) {
    var it = document.createElement("div");
    it.className = "ditem"; it.id = "archItem";
    it.setAttribute("data-go", "archive");
    it.innerHTML = "<i>🥷</i>آرشیو همراه";
    var base = R.$("dmItem") || rail.querySelector('.ditem[data-go="premium"]');
    if (base && base.parentNode) base.parentNode.insertBefore(it, base.nextSibling);
    else rail.appendChild(it);
  }
  R.paintArchive();
}

document.addEventListener("click", function (e) {
  var t = e.target.closest ? e.target.closest("[data-char]") : null;
  if (t) R.pickChar(t.getAttribute("data-char"));
});

R.hooks.archive = function () { R.paintArchive(); };

var prevLogin = R.onLogin;
R.onLogin = function () {
  if (prevLogin) { try { prevLogin(); } catch (e) {} }
  try { build(); } catch (e) { console.error(e); }
};

function start() {
  try { build(); } catch (e) { console.error(e); }
  [600, 1800, 3400].forEach(function (ms) {
    setTimeout(function () { try { build(); } catch (e) {} }, ms);
  });
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else { start(); }

console.log("%c🥷 RONIN PACK 2 ready", "color:#a78bfa;font-weight:900");
})();
