/* ═══════════════════════════════════════════════════════════════
   RONIN STORE — ANIME BG 🌃 | صحنه انیمه‌ای زنده (تک‌صحنه)
   ═══════════════════════════════════════════════════════════════ */
"use strict";
(function () {
  var RM = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  var MOB = window.innerWidth < 760 || /Mobi|Android/i.test(navigator.userAgent);
  var HI = !RM && !MOB && (navigator.hardwareConcurrency || 4) >= 4;

  var cv = document.getElementById("rbCanvas");
  if (!cv) { cv = document.createElement("canvas"); cv.id = "rbCanvas"; document.body.appendChild(cv); }
  var ctx = cv.getContext("2d");

  if (!document.getElementById("ab2-css")) {
    var st = document.createElement("style"); st.id = "ab2-css";
    st.textContent =
      "#rbCanvas{position:fixed;inset:0;z-index:-9;pointer-events:none;width:100%;height:100%}" +
      "#rbVig{position:fixed;inset:0;z-index:-8;pointer-events:none;" +
      "background:radial-gradient(ellipse at 50% 20%,transparent 36%,rgba(2,3,10,.85))}";
    document.head.appendChild(st);
  }
  if (!document.getElementById("rbVig")) { var v = document.createElement("div"); v.id = "rbVig"; document.body.appendChild(v); }

  var W = 0, H = 0, DPR = 1, stars = [], petals = [], buildings = [], windows = [], seed = 7;
  var pointer = { x: 0, y: 0, tx: 0, ty: 0 }, moon = { x: .74, y: .20, r: .075 };
  function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }

  function build() {
    stars = []; petals = []; windows = []; buildings = [];
    var nS = MOB ? 45 : 140, i;
    for (i = 0; i < nS; i++) stars.push({ x: rnd() * W, y: rnd() * H * .6, r: rnd() * 1.4 + .3, p: rnd() * 6.28, s: rnd() * .6 + .2 });
    var nP = MOB ? 12 : 30;
    for (i = 0; i < nP; i++) petals.push({ x: rnd() * W, y: rnd() * H, s: rnd() * 1.6 + .7, a: rnd() * 6.28, v: rnd() * .5 + .35, dr: rnd() * .5 + .15 });
    var cols = MOB ? 9 : 16, bw = W / cols;
    for (i = 0; i < cols; i++) { var h = (rnd() * .35 + .22) * H; buildings.push({ x: i * bw, w: bw * .92, h: h }); }
    buildings.forEach(function (b) {
      var c2 = Math.max(2, Math.floor(b.w / (14 * DPR))), r2 = Math.max(3, Math.floor(b.h / (20 * DPR)));
      for (var cx = 0; cx < c2; cx++) for (var ry = 0; ry < r2; ry++) {
        if (rnd() < 0.55) continue;
        windows.push({
          x: b.x + 4 * DPR + cx * (b.w / c2), y: H - b.h + 6 * DPR + ry * ((b.h - 10 * DPR) / r2),
          w: Math.max(2, (b.w / c2) * .5), h: Math.max(3, ((b.h - 10 * DPR) / r2) * .5),
          f: rnd() * 6.28, on: true,
          col: ["154,99,255", "55,191,255", "255,79,207", "255,214,107"][Math.floor(rnd() * 4)]
        });
      }
    });
  }

  function size() {
    DPR = Math.min(window.devicePixelRatio || 1, HI ? 2 : 1.5);
    W = cv.width = Math.floor(innerWidth * DPR); H = cv.height = Math.floor(innerHeight * DPR);
    cv.style.width = innerWidth + "px"; cv.style.height = innerHeight + "px";
    build();
  }

  var last = 0, frames = 0, fpsT = 0, dec = 0;
  function loop(now) {
    if (RM) { draw(now, true); return; }
    var dt = now - last; last = now; frames++; fpsT += dt;
    if (fpsT > 1000) {
      var fps = 1000 / (fpsT / frames); fpsT = 0; frames = 0;
      if (fps < 42 && dec < 2) { dec++; if (dec === 1) stars = stars.slice(0, Math.floor(stars.length * .6)); else petals = petals.slice(0, Math.floor(petals.length * .5)); }
    }
    draw(now, false); requestAnimationFrame(loop);
  }

  function draw(now, staticMode) {
    pointer.x += (pointer.tx - pointer.x) * .06; pointer.y += (pointer.ty - pointer.y) * .06;
    var tm = now * .001, px = -pointer.x * 10 * DPR, py = -pointer.y * 10 * DPR, i;
    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#1b1340"); g.addColorStop(.45, "#0b0b24"); g.addColorStop(1, "#03040c");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

    for (i = 0; i < stars.length; i++) {
      var s = stars[i], tw = staticMode ? .7 : (.55 + .45 * Math.sin(tm * s.s + s.p));
      ctx.globalAlpha = tw * .9; ctx.fillStyle = "#dfe6ff";
      ctx.beginPath(); ctx.arc(s.x + px * .4, s.y + py * .4, s.r * DPR, 0, 6.283); ctx.fill();
    }
    ctx.globalAlpha = 1;

    var mx = moon.x * W + pointer.x * 22 * DPR, my = moon.y * H + pointer.y * 22 * DPR, mr = moon.r * Math.min(W, H);
    var mg = ctx.createRadialGradient(mx, my, mr * .2, mx, my, mr * 3);
    mg.addColorStop(0, "rgba(245,240,255,.55)"); mg.addColorStop(.25, "rgba(180,170,255,.18)"); mg.addColorStop(1, "transparent");
    ctx.fillStyle = mg; ctx.beginPath(); ctx.arc(mx, my, mr * 3, 0, 6.283); ctx.fill();
    ctx.fillStyle = "#f4f0ff"; ctx.beginPath(); ctx.arc(mx, my, mr, 0, 6.283); ctx.fill();
    ctx.fillStyle = "rgba(200,195,235,.35)"; ctx.beginPath(); ctx.arc(mx - mr * .3, my - mr * .2, mr * .18, 0, 6.283); ctx.fill();

    var bx = pointer.x * -14 * DPR;
    buildings.forEach(function (b) { ctx.fillStyle = "#070a1c"; ctx.fillRect(b.x + bx, H - b.h, b.w, b.h); });
    windows.forEach(function (w) {
      if (!staticMode && Math.random() < .0008) w.on = !w.on;
      if (!w.on) return;
      ctx.globalAlpha = (staticMode ? .8 : (.35 + .5 * Math.abs(Math.sin(tm * .8 + w.f)))) * .85;
      ctx.fillStyle = "rgba(" + w.col + ",1)"; ctx.fillRect(w.x + bx, w.y, w.w, w.h);
    });
    ctx.globalAlpha = 1;

    var fg = ctx.createLinearGradient(0, H * .55, 0, H);
    fg.addColorStop(0, "rgba(12,14,40,0)"); fg.addColorStop(1, "rgba(12,14,40,.75)");
    ctx.fillStyle = fg; ctx.fillRect(0, H * .55, W, H * .45);

    for (i = 0; i < petals.length; i++) {
      var pe = petals[i];
      if (!staticMode) {
        pe.y += pe.v * DPR * (HI ? 1.3 : 1); pe.x += Math.sin(tm * .6 + pe.dr * 8) * .6 * DPR + .25 * DPR; pe.a += .01;
        if (pe.y > H + 10 * DPR) { pe.y = -10 * DPR; pe.x = rnd() * W; }
      }
      ctx.save(); ctx.translate(pe.x + px * .8, pe.y); ctx.rotate(pe.a);
      ctx.fillStyle = "rgba(255,190,225,.65)";
      ctx.beginPath(); ctx.ellipse(0, 0, 4.2 * DPR, 2.1 * DPR, 0, 0, 6.283); ctx.fill(); ctx.restore();
    }
  }

  window.addEventListener("pointermove", function (e) { pointer.tx = e.clientX / innerWidth - .5; pointer.ty = e.clientY / innerHeight - .5; }, { passive: true });
  window.addEventListener("deviceorientation", function (e) {
    if (e.gamma == null) return;
    pointer.tx = Math.max(-1, Math.min(1, e.gamma / 45)); pointer.ty = Math.max(-1, Math.min(1, (e.beta - 45) / 45));
  }, { passive: true });
  var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(size, 180); }, { passive: true });

  size(); requestAnimationFrame(loop);
  console.log("%c🌃 RONIN ANIME BG ready (single scene)", "color:#a78bfa;font-weight:900");
})();
