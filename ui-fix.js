/* ═══════════════════════════════════════════════════════════════
   RONIN STORE — UI FIX v2 | منوی همبرگری ☰ • دنیای من 🧭
   ═══════════════════════════════════════════════════════════════ */
"use strict";
(function () {

/* ۱ ▸ استایل */
if (!document.getElementById("uifix-css")) {
  var st = document.createElement("style");
  st.id = "uifix-css";
  st.textContent =
    "#menuScrim{position:fixed;inset:0;z-index:52;background:rgba(2,4,12,.58);" +
      "backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);opacity:0;visibility:hidden;transition:.25s}" +
    "body.menuopen #menuScrim{opacity:1;visibility:visible}" +
    "#rail{display:flex!important;inset-inline-start:auto!important;inset-inline-end:12px!important;" +
      "z-index:56;transform:translateX(118%);opacity:0;visibility:hidden;" +
      "transition:transform .3s ease,opacity .22s,visibility .3s}" +
    "body.menuopen #rail{transform:none;opacity:1;visibility:visible}" +
    "@media (min-width:1025px){#stage{padding:calc(var(--top) + 22px) 22px 90px!important}}" +
    "#railBtn{font-size:19px;line-height:1}";
  document.head.appendChild(st);
}

/* ۲ ▸ باز/بسته کردن */
function open(on) {
  var isOpen = on === undefined ? !document.body.classList.contains("menuopen") : !!on;
  document.body.classList.toggle("menuopen", isOpen);
  var b = document.getElementById("railBtn");
  if (b) b.textContent = isOpen ? "✕" : "☰";
}

/* ۳ ▸ پرده پشت منو */
function scrim() {
  if (document.getElementById("menuScrim")) return;
  var d = document.createElement("div");
  d.id = "menuScrim";
  d.addEventListener("click", function () { open(false); });
  document.body.appendChild(d);
}

/* ۴ ▸ دکمه ☰ در نوار بالا */
function menuBtn() {
  var tools = document.querySelector("#top .tools");
  if (!tools || document.getElementById("railBtn")) return;
  var b = document.createElement("button");
  b.className = "icobtn"; b.id = "railBtn"; b.type = "button";
  b.title = "منو"; b.textContent = "☰";
  b.addEventListener("click", function () { open(); });
  tools.insertBefore(b, tools.firstChild);
}

/* ۵ ▸ بستن خودکار */
document.addEventListener("click", function (e) {
  if (!document.body.classList.contains("menuopen")) return;
  var t = e.target;
  if (!t || !t.closest) return;
  if (t.closest("#railBtn")) return;
  if (t.closest("#rail")) {
    if (t.closest("[data-go]")) setTimeout(function () { open(false); }, 60);
    return;
  }
  open(false);
});
document.addEventListener("keydown", function (e) { if (e.key === "Escape") open(false); });

/* ۶ ▸ منوی «دنیای من» */
function addMenu() {
  var rail = document.getElementById("rail");
  if (!rail || document.getElementById("mwItem")) return;
  var it = document.createElement("div");
  it.className = "ditem"; it.id = "mwItem";
  it.setAttribute("data-go", "myworld");
  it.innerHTML = "<i>🧭</i>دنیای من";
  var prem = rail.querySelector('.ditem[data-go="premium"]');
  if (prem && prem.parentNode) prem.parentNode.insertBefore(it, prem.nextSibling);
  else rail.appendChild(it);
}

/* ۷ ▸ بخش «دنیای من» */
function addSection() {
  if (document.getElementById("sec-myworld")) return;
  var s = document.createElement("section");
  s.className = "sec"; s.id = "sec-myworld";
  s.innerHTML = '<div class="head"><h2 class="h2">🧭 دنیای من</h2></div><div id="mwBox"></div>';
  (document.getElementById("stage") || document.body).appendChild(s);
}
function renderMW() {
  var box = document.getElementById("mwBox");
  if (!box) return;
  if (!R.ME) { box.innerHTML = '<div class="empty">برای دیدن «دنیای من» وارد شو 👤</div>'; return; }
  var u = R.USER || {};
  var posts = Object.keys(R.POSTS || {}).map(function (k) { var p = R.POSTS[k]; p.id = k; return p; })
    .filter(function (p) { return p.uid === R.ME; })
    .sort(function (a, b) { return (b.t || 0) - (a.t || 0); });
  var goods = Object.keys(R.PRODS || {}).map(function (k) { var p = R.PRODS[k]; p.id = k; return p; })
    .filter(function (p) { return p.sellerUid === R.ME; });
  var h = '<div class="stats mt mb">' +
    "<div><b>" + R.fa(posts.length) + "</b>پست من</div>" +
    "<div><b>" + R.fa(goods.length) + "</b>آگهی من</div>" +
    "<div><b>" + R.fa(u.xp || 0) + "</b>XP</div>" +
    "<div><b>" + R.fa(R.level(u.xp || 0)) + "</b>سطح</div></div>";
  h += '<div class="card mb"><div class="sm b mb">🛒 آگهی‌های من</div>' +
    (goods.length ? goods.map(function (p) { return R.prodCard ? R.prodCard(p) : ""; }).join("")
                  : '<div class="empty">هنوز آگهی نداری</div>') + "</div>";
  h += '<div class="card"><div class="sm b mb">📝 پست‌های من</div>' +
    (posts.length ? posts.slice(0, 10).map(function (p) { return R.postCard ? R.postCard(p).outerHTML : ""; }).join("")
                  : '<div class="empty">هنوز پستی نداری</div>') + "</div>";
  box.innerHTML = h;
}
R.hooks = R.hooks || {};
R.hooks.myworld = renderMW;
document.addEventListener("click", function (e) {
  var t = e.target && e.target.closest ? e.target.closest('[data-go="myworld"]') : null;
  if (t) setTimeout(renderMW, 80);
});

/* ۸ ▸ راه‌اندازی */
function boot() {
  try { scrim(); } catch (e) {}
  try { menuBtn(); } catch (e) {}
  try { addMenu(); } catch (e) {}
  try { addSection(); } catch (e) {}
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();
setTimeout(boot, 1200);

})();
