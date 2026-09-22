/* ═══════════════════════════════════════════════════════════
   RONIN STORE — ANIME BG v3 🌃 | شهر انیمه‌ای زنده (۳ لایه پارالاکس)
   ═══════════════════════════════════════════════════════════ */
"use strict";
(function () {
  var RM = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  var MOB = window.innerWidth < 760 || /Mobi|Android/i.test(navigator.userAgent);
  var HI = !RM && !MOB && (navigator.hardwareConcurrency || 4) >= 4;

  var cv = document.getElementById("rbCanvas");
  if (!cv) { cv = document.createElement("canvas"); cv.id = "rbCanvas"; document.body.appendChild(cv); }
  var ctx = cv.getContext("2d");

  if (!document.getElementById("ab3-css")) {
    var st = document.createElement("style"); st.id = "ab3-css";
    st.textContent =
      "#rbCanvas{position:fixed;inset:0;z-index:-9;pointer-events:none;width:100%;height:100%}" +
      "#rbVig{position:fixed;inset:0;z-index:-8;pointer-events:none;" +
      "background:radial-gradient(ellipse at 50% 20%,transparent 34%,rgba(2,3,10,.86))}";
    document.head.appendChild(st);
  }
  if (!document.getElementById("rbVig")) { var v = document.createElement("div"); v.id = "rbVig"; document.body.appendChild(v); }

  var W = 0, H = 0, DPR = 1, seed = 11;
  var stars = [], petals = [], shooters = [], layers = [], windows = [], streaks = [];
  var pointer = { x: 0, y: 0, tx: 0, ty: 0 }, moon = { x: .76, y: .19, r: .07 };
  function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }

  function build() {
    stars = []; petals = []; shooters = []; layers = []; windows = []; streaks = [];
    var i;
    var nS = MOB ? 50 : 150;
    for (i = 0; i < nS; i++) stars.push({ x: rnd() * W, y: rnd() * H * .62, r: rnd() * 1.4 + .3, p: rnd() * 6.28, s: rnd() * .6 + .2 });
    var nP = MOB ? 12 : 34;
    for (i = 0; i < nP; i++) petals.push({ x: rnd() * W, y: rnd() * H, a: rnd() * 6.28, v: rnd() * .5 + .35, dr: rnd() * .6 + .2 });
    var defs = MOB
      ? [{ z: .5, c: "#0a0e24", h: .30, cols: 8 }, { z: .9, c: "#060a1a", h: .42, cols: 7 }, { z: 1.4, c: "#03060f", h: .55, cols: 6 }]
      : [{ z: .5, c: "#0a0e24", h: .28, cols: 16 }, { z: .9, c: "#060a1a", h: .40, cols: 13 }, { z: 1.4, c: "#03060f", h: .54, cols: 10 }];
    defs.forEach(function (d) {
      var bw = W / d.cols, arr = [];
      for (var j = 0; j < d.cols; j++) { var hh = (rnd() * (d.h * .5) + d.h * .5) * H; arr.push({ x: j * bw, w: bw * 1.02, h: hh }); }
      layers.push({ z: d.z, c: d.c, arr: arr });
    });
    layers.forEach(function (L, li) {
      if (li === 0) return;
      L.arr.forEach(function (b) {
        var c2 = Math.max(2, Math.floor(b.w / (13 * DPR))), r2 = Math.max(3, Math.floor(b.h / (19 * DPR)));
        for (var cx = 0; cx < c2; cx++) for (var ry = 0; ry < r2; ry++) {
          if (rnd() < 0.55) continue;
          windows.push({ x: b.x + 3 * DPR + cx * (b.w / c2), y: H - b.h + 6 * DPR + ry * ((b.h - 10 * DPR) / r2),
            w: Math.max(2, (b.w / c2) * .5), h: Math.max(3, ((b.h - 10 * DPR) / r2) * .5), f: rnd() * 6.28, on: true, z: L.z,
            col: ["154,99,255", "55,191,255", "255,79,207", "255,214,107"][Math.floor(rnd() * 4)] });
        }
      });
    });
    var nSt = MOB ? 3 : 7;
    for (i = 0; i < nSt; i++) streaks.push({ y: H * (.86 + rnd() * .10), len: (rnd() * .3 + .12) * W, x: rnd() * W,
      sp: (rnd() * 3 + 2) * DPR * (rnd() < .5 ? -1 : 1), a: rnd() * .4 + .25,
      col: ["255,120,220", "90,200,255", "160,120,255", "255,220,140"][Math.floor(rnd() * 4)] });
  }

  function size() {
    DPR = Math.min(window.devicePixelRatio || 1, HI ? 2 : 1.5);
    W = cv.width = Math.floor(innerWidth * DPR); H = cv.height = Math.floor(innerHeight * DPR);
    cv.style.width = innerWidth + "px"; cv.style.height = innerHeight + "px"; build();
  }

  var last = 0, frames = 0, fpsT = 0, dec = 0, shTimer = 0;
  function loop(now) {
    if (RM) { draw(now, true); return; }
    var dt = now - last; last = now; frames++; fpsT += dt;
    if (fpsT > 1000) { var fps = 1000 / (fpsT / frames); fpsT = 0; frames = 0;
      if (fps < 42 && dec < 2) { dec++; if (dec === 1) stars = stars.slice(0, Math.floor(stars.length * .6)); else petals = petals.slice(0, Math.floor(petals.length * .5)); } }
    draw(now, false); requestAnimationFrame(loop);
  }

  function draw(now, staticMode) {
    pointer.x += (pointer.tx - pointer.x) * .06; pointer.y += (pointer.ty - pointer.y) * .06;
    var tm = now * .001, i;
    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#1b1340"); g.addColorStop(.42, "#0c0b26"); g.addColorStop(1, "#03040c");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

    for (i = 0; i < stars.length; i++) { var s = stars[i], tw = staticMode ? .7 : (.55 + .45 * Math.sin(tm * s.s + s.p));
      ctx.globalAlpha = tw * .9; ctx.fillStyle = "#dfe6ff";
      ctx.beginPath(); ctx.arc(s.x - pointer.x * 8 * DPR, s.y - pointer.y * 8 * DPR, s.r * DPR, 0, 6.283); ctx.fill(); }
    ctx.globalAlpha = 1;

    if (!staticMode) { shTimer -= 1; if (shTimer <= 0) { shTimer = 200 + Math.random() * 500; shooters.push({ x: rnd() * W * .7, y: rnd() * H * .25, t: 0 }); } }
    for (i = shooters.length - 1; i >= 0; i--) { var sh = shooters[i]; sh.t += 1;
      var xx = sh.x + sh.t * 7 * DPR, yy = sh.y + sh.t * 2.4 * DPR, al = Math.max(0, 1 - sh.t / 60);
      ctx.globalAlpha = al * .8; ctx.strokeStyle = "#eaf0ff"; ctx.lineWidth = 1.6 * DPR;
      ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx - 40 * DPR, yy - 14 * DPR); ctx.stroke();
      if (sh.t > 60) shooters.splice(i, 1); }
    ctx.globalAlpha = 1;

    var mx = moon.x * W + pointer.x * 26 * DPR, my = moon.y * H + pointer.y * 26 * DPR, mr = moon.r * Math.min(W, H);
    var mg = ctx.createRadialGradient(mx, my, mr * .2, mx, my, mr * 3.4);
    mg.addColorStop(0, "rgba(245,240,255,.60)"); mg.addColorStop(.25, "rgba(180,170,255,.20)"); mg.addColorStop(1, "transparent");
    ctx.fillStyle = mg; ctx.beginPath(); ctx.arc(mx, my, mr * 3.4, 0, 6.283); ctx.fill();
    ctx.fillStyle = "#f4f0ff"; ctx.beginPath(); ctx.arc(mx, my, mr, 0, 6.283); ctx.fill();
    ctx.fillStyle = "rgba(200,195,235,.35)"; ctx.beginPath(); ctx.arc(mx - mr * .3, my - mr * .2, mr * .18, 0, 6.283); ctx.fill();

    layers.forEach(function (L) { var off = pointer.x * (-16 * L.z) * DPR; ctx.fillStyle = L.c;
      L.arr.forEach(function (b) { ctx.fillRect(b.x + off, H - b.h, b.w, b.h); }); });

    windows.forEach(function (w) { var off = pointer.x * (-16 * w.z) * DPR;
      if (!staticMode && Math.random() < .0007) w.on = !w.on;
      if (!w.on) return;
      ctx.globalAlpha = (staticMode ? .8 : (.32 + .5 * Math.abs(Math.sin(tm * .8 + w.f)))) * .85;
      ctx.fillStyle = "rgba(" + w.col + ",1)"; ctx.fillRect(w.x + off, w.y, w.w, w.h); });
    ctx.globalAlpha = 1;

    streaks.forEach(function (st) {
      if (!staticMode) { st.x += st.sp; if (st.sp > 0 && st.x > W + st.len) st.x = -st.len; if (st.sp < 0 && st.x < -st.len) st.x = W + st.len; }
      var lg = ctx.createLinearGradient(st.x, 0, st.x + st.len, 0);
      lg.addColorStop(0, "rgba(" + st.col + ",0)"); lg.addColorStop(.5, "rgba(" + st.col + "," + st.a + ")"); lg.addColorStop(1, "rgba(" + st.col + ",0)");
      ctx.fillStyle = lg; ctx.fillRect(st.x, st.y, st.len, 2.4 * DPR); });

    var fg = ctx.createLinearGradient(0, H * .5, 0, H);
    fg.addColorStop(0, "rgba(12,14,40,0)"); fg.addColorStop(1, "rgba(12,14,40,.78)");
    ctx.fillStyle = fg; ctx.fillRect(0, H * .5, W, H * .5);

    for (i = 0; i < petals.length; i++) { var pe = petals[i];
      if (!staticMode) { pe.y += pe.v * DPR * (HI ? 1.3 : 1); pe.x += Math.sin(tm * .6 + pe.dr * 8) * .6 * DPR + .25 * DPR; pe.a += .01;
        if (pe.y > H + 10 * DPR) { pe.y = -10 * DPR; pe.x = rnd() * W; } }
      ctx.save(); ctx.translate(pe.x - pointer.x * 12 * DPR, pe.y); ctx.rotate(pe.a);
      ctx.fillStyle = "rgba(255,190,225,.62)"; ctx.beginPath(); ctx.ellipse(0, 0, 4.2 * DPR, 2.1 * DPR, 0, 0, 6.283); ctx.fill(); ctx.restore(); }

    if (!staticMode) { ctx.globalAlpha = .05; ctx.fillStyle = "#8fdcff"; var sy = (tm * 40) % H; ctx.fillRect(0, sy, W, 1.5 * DPR); ctx.globalAlpha = 1; }
  }

  window.addEventListener("pointermove", function (e) { pointer.tx = e.clientX / innerWidth - .5; pointer.ty = e.clientY / innerHeight - .5; }, { passive: true });
  window.addEventListener("deviceorientation", function (e) { if (e.gamma == null) return;
    pointer.tx = Math.max(-1, Math.min(1, e.gamma / 45)); pointer.ty = Math.max(-1, Math.min(1, (e.beta - 45) / 45)); }, { passive: true });
  var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(size, 180); }, { passive: true });

  size(); requestAnimationFrame(loop);
  console.log("%c🌃 RONIN ANIME BG v3 ready", "color:#a78bfa;font-weight:900");
})();
