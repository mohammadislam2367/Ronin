/* ═══════════════════════════════════════════════════════════════
   RONIN STORE — ANIME BG 🌃 | پس‌زمینه انیمه‌ای زنده (صحنه‌ی کامل)
   ═══════════════════════════════════════════════════════════════ */
"use strict";
(function () {
if (!window.R) { console.error("[animebg] R نیست"); return; }

/* ── دستگاه ─────────────────────────────────────────────────── */
var rm = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
var mobile = window.innerWidth < 760 || /Mobi|Android/i.test(navigator.userAgent);
var cores = navigator.hardwareConcurrency || 4;
var mem = navigator.deviceMemory || 4;
var hi = !rm && !mobile && cores >= 4 && mem >= 4;
function rnd(a, b) { return a + Math.random() * (b - a); }
function isPrem() {
  return !!(R.prem || R.premium || (R.USER && (R.USER.prem || R.USER.premium)));
}
function rngFor(seed) {
  var a = seed >>> 0;
  return function () { a |= 0; a = a + 0x6D2B79F5 | 0;
    var t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}

/* ── استایل ─────────────────────────────────────────────────── */
if (!document.getElementById("ab-css")) {
  var st = document.createElement("style");
  st.id = "ab-css";
  st.textContent =
    "#rbCanvas{position:fixed;inset:0;z-index:-9;pointer-events:none}" +
    "#rbVig{position:fixed;inset:0;z-index:-8;pointer-events:none;" +
      "background:radial-gradient(ellipse at 50% 20%,transparent 36%,rgba(2,3,10,.85))}" +
    "#vibeBtn{position:fixed;inset-inline-end:12px;bottom:200px;z-index:74;width:38px;" +
      "height:38px;border-radius:50%;border:1px solid rgba(132,124,255,.35);" +
      "background:rgba(11,13,35,.7);color:#cfcaff;font-size:16px;display:grid;" +
      "place-items:center;backdrop-filter:blur(8px);cursor:pointer}" +
    "#vibeBtn.off{opacity:.5}" +
    "body.vibeoff #rbCanvas{display:none}" +
    ".thc{position:relative;border-radius:18px;overflow:hidden;" +
      "border:1px solid rgba(132,124,255,.25);cursor:pointer;transition:.2s;" +
      "background:rgba(11,13,35,.6)}" +
    ".thc:hover{transform:translateY(-3px);border-color:rgba(34,211,238,.6)}" +
    ".thc.on{border-color:#ffd66b;box-shadow:0 0 18px rgba(255,214,107,.35)}" +
    ".thc .pvw{height:82px}" +
    ".thc .tb{padding:8px 10px}" +
    ".thc .tn{font-size:12px;font-weight:800}" +
    ".thc .td{font-size:10px;color:#a8a7c3}" +
    ".thc .lk2{position:absolute;top:7px;inset-inline-end:7px;font-size:12px;" +
      "background:rgba(11,13,35,.75);border-radius:8px;padding:2px 7px}";
  document.head.appendChild(st);
}

/* ── لایه‌ها ─────────────────────────────────────────────────── */
var cv = document.createElement("canvas"); cv.id = "rbCanvas";
document.body.appendChild(cv);
var ctx = cv.getContext("2d", { alpha: true });
var vig = document.createElement("div"); vig.id = "rbVig";
document.body.appendChild(vig);

var btn = document.createElement("button");
btn.id = "vibeBtn"; btn.type = "button"; btn.title = "افکت‌ها"; btn.textContent = "✨";
btn.addEventListener("click", function () {
  document.body.classList.toggle("vibeoff");
  var off = document.body.classList.contains("vibeoff");
  btn.classList.toggle("off", off); btn.textContent = off ? "🌙" : "✨";
  try { localStorage.setItem("rbVibe", off ? "0" : "1"); } catch (e) {}
});
document.body.appendChild(btn);
if (localStorage.getItem("rbVibe") === "0") {
  document.body.classList.add("vibeoff"); btn.classList.add("off"); btn.textContent = "🌙";
}

/* ── تم‌ها (هر کدوم یه صحنه‌ی انیمه) ──────────────────────── */
var THEMES = {
default: { n: "توکیو شب", d: "ماه و برج‌های نئونی", p: false, seed: 7,
  sky: [[30,20,64], [12,12,38], [3,4,12]], stars: true,
  moon: { x: .74, y: .2, r: .075, c: "245,240,255", g: "180,170,255" },
  bcol: { far: "#0a0c22", mid: "#070a1c", near: "#04050f" },
  neon: ["154,99,255", "55,191,255", "255,79,207", "255,214,107"],
  fog: "12,14,40", fogA: .5, dens: 1, weather: "petal", wcount: 18, rays: true },

neonrain: { n: "باران نئونی", d: "باران + مه + رعد", p: true, seed: 21,
  sky: [[8,14,40], [10,26,58], [2,3,10]], stars: false, flash: true,
  moon: { x: .7, y: .17, r: .06, c: "210,225,255", g: "120,180,255" },
  bcol: { far: "#08122c", mid: "#060c22", near: "#03060f" },
  neon: ["0,220,255", "255,79,207", "120,180,255", "90,255,200"],
  fog: "20,40,80", fogA: .7, dens: 1.1, weather: "rain", wcount: 140, rays: false },

sakura: { n: "معبد شکوفه", d: "آسمون صورتی + شکوفه", p: true, seed: 33,
  sky: [[62,26,62], [48,20,52], [10,7,16]], stars: true,
  moon: { x: .28, y: .22, r: .085, c: "255,240,246", g: "255,150,200" },
  bcol: { far: "#2a1630", mid: "#1d1026", near: "#0e0814" },
  neon: ["255,140,190", "255,90,170", "255,214,107", "220,160,255"],
  fog: "60,24,54", fogA: .45, dens: 1, weather: "petal", wcount: 70, rays: true },

cyber: { n: "شهر سایبری", d: "نئون سرخابی و فیروزه", p: true, seed: 44,
  sky: [[6,6,18], [14,8,40], [2,3,10]], stars: true, moon: null,
  bcol: { far: "#0b0722", mid: "#080518", near: "#04020d" },
  neon: ["255,60,200", "0,255,220", "140,90,255", "255,150,0"],
  fog: "30,10,60", fogA: .55, dens: 1.2, weather: "spark", wcount: 40, rays: false },

galaxy: { n: "آسمون کهکشان", d: "افق کوتاه + شهاب‌سنگ", p: true, seed: 55,
  sky: [[22,12,52], [10,6,30], [2,3,10]], stars: true,
  moon: { x: .82, y: .16, r: .05, c: "240,235,255", g: "150,120,255" },
  bcol: { far: "#0c0a24", mid: "#080618", near: "#04030e" },
  neon: ["180,160,255", "120,200,255", "255,180,240", "255,240,200"],
  fog: "24,16,60", fogA: .4, dens: .45, weather: "shoot", wcount: 0, rays: false },

sunset: { n: "غروب سرخ", d: "افق گرم + ذرات آتشین", p: true, seed: 66,
  sky: [[70,28,40], [40,16,34], [8,5,10]], stars: false,
  moon: { x: .5, y: .55, r: .12, c: "255,180,90", g: "255,90,40" },
  bcol: { far: "#2a1220", mid: "#1c0c18", near: "#0d060c" },
  neon: ["255,170,60", "255,90,60", "255,214,107", "255,120,160"],
  fog: "90,30,20", fogA: .55, dens: 1, weather: "ember", wcount: 46, rays: true }
};

/* ── موتور ──────────────────────────────────────────────────── */
var W = 0, H = 0, dpr = 1, CUR = "default", last = 0, frames = 0, t0 = 0;
var city = null, cityFor = "", skyG = null, skyDirty = true;
var wx = [], clouds = [], stars = [], px = 0, py = 0, mx = 0, my = 0, flash = 0;
var QUAL = 1;

function size() {
  dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
  W = cv.width = Math.floor(window.innerWidth * dpr);
  H = cv.height = Math.floor(window.innerHeight * dpr);
  cv.style.width = window.innerWidth + "px";
  cv.style.height = window.innerHeight + "px";
  skyDirty = true; cityFor = "";
}

function genCity(seed, dens) {
  var r = rngFor(seed), far = [], mid = [], near = [], x, w, h;
  var horizon = H * .60;
  var skip = 1 / Math.max(.15, dens);
  x = -20 * dpr;
  while (x < W + 20 * dpr) {
    if (r() > (skip - .35) * .6 + .25) {
      w = r() * .05 * W + .018 * W; h = r() * .13 * H + .06 * H;
      far.push({ x: x, w: w, h: h, y: horizon - h });
    }
    x += (r() * .05 * W + .012 * W) * (1 + skip * .2);
  }
  x = -30 * dpr;
  while (x < W + 30 * dpr) {
    if (r() > skip * .35) {
      w = r() * .07 * W + .04 * W; h = r() * .22 * H + .10 * H;
      mid.push(mkB(x, w, h, horizon, r, 16));
    }
    x += (r() * .07 * W + .04 * W) * (1 + skip * .25);
  }
  x = -40 * dpr;
  while (x < W + 40 * dpr) {
    if (r() > skip * .45) {
      w = r() * .11 * W + .06 * W; h = r() * .30 * H + .14 * H;
      near.push(mkB(x, w, h, H * .88, r, 20));
    }
    x += (r() * .11 * W + .06 * W) * (1 + skip * .3);
  }
  return { far: far, mid: mid, near: near };
}

function mkB(x, w, h, baseY, r, cap) {
  var b = { x: x, w: w, h: h, y: baseY - h, win: [], ci: Math.floor(r() * 4) };
  var cols = Math.max(2, Math.round(w / (8 * dpr)));
  var rows = Math.max(2, Math.round(h / (12 * dpr)));
  var maxW = Math.floor((mobile ? 9 : 17) * QUAL), c = 0;
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (c >= Math.min(cap, maxW)) continue;
      if (r() < .5) {
        b.win.push({
          x: b.x + (i + .3) * (w / cols), y: b.y + (j + .32) * (h / rows),
          w: Math.max(1.2 * dpr, (w / cols) * .4),
          h: Math.max(2 * dpr, (h / rows) * .3),
          ph: r() * 6.28, sp: .4 + r() * 1.3, blink: r() < .1
        });
        c++;
      }
    }
  }
  return b;
}

function genClouds() {
  clouds = [];
  var n = mobile ? 3 : 6;
  for (var i = 0; i < n; i++) clouds.push({
    x: Math.random(), y: rnd(.06, .34), w: rnd(.18, .34),
    h: rnd(.03, .07), a: rnd(.05, .13), sp: rnd(.002, .008)
  });
}

function genStars(cfg) {
  stars = [];
  if (!cfg.stars) return;
  var n = mobile ? 40 : (hi ? 130 : 80), i;
  for (i = 0; i < n; i++) stars.push({ x: Math.random(), y: Math.random() * .7,
    r: rnd(.3, 1.6), ph: rnd(0, 6.28), sp: rnd(.3, 1.2) });
}

function genWeather(cfg) {
  wx = [];
  var n = Math.round(cfg.wcount * (mobile ? .55 : 1) * QUAL), i;
  for (i = 0; i < n; i++) {
    if (cfg.weather === "rain") wx.push({ x: Math.random(), y: Math.random(),
      l: rnd(10, 26), v: rnd(.5, 1.2), a: rnd(.15, .5) });
    else if (cfg.weather === "petal") wx.push({ x: Math.random(), y: Math.random(),
      s: rnd(3.5, 11), vy: rnd(.10, .40), sw: rnd(.4, 1.3), ph: rnd(0, 6.28),
      rot: rnd(0, 6.28), vr: rnd(-.03, .03), a: rnd(.35, .85) });
    else if (cfg.weather === "ember") wx.push({ x: Math.random(), y: Math.random(),
      s: rnd(1.2, 3), ph: rnd(0, 6.28), vy: rnd(-.06, -.015), vx: rnd(-.02, .02) });
    else if (cfg.weather === "spark") wx.push({ x: Math.random(), y: Math.random(),
      s: rnd(.8, 2), v: rnd(.05, .22) });
  }
  if (cfg.weather === "shoot") wx.next = 900;
}

function build(id) {
  var cfg = THEMES[CUR];
  if (cityFor !== CUR + "_" + W + "_" + H) {
    city = genCity(cfg.seed, cfg.dens);
    genClouds(); genStars(cfg); cityFor = CUR + "_" + W + "_" + H;
  }
  genWeather(cfg);
}

/* ── نقاشی صحنه ─────────────────────────────────────────────── */
function drawScene(t, dt) {
  var cfg = THEMES[CUR];

  /* آسمون */
  if (skyDirty || !skyG) {
    skyG = ctx.createLinearGradient(0, 0, 0, H);
    skyG.addColorStop(0, "rgb(" + cfg.sky[0].join(",") + ")");
    skyG.addColorStop(.55, "rgb(" + cfg.sky[1].join(",") + ")");
    skyG.addColorStop(1, "rgb(" + cfg.sky[2].join(",") + ")");
    skyDirty = false;
  }
  ctx.fillStyle = skyG; ctx.fillRect(0, 0, W, H);

  var ox = px * dpr, oy = py * dpr;

  /* ستاره‌ها */
  for (var s = 0; s < stars.length; s++) { var stt = stars[s];
    var a = .35 + .6 * Math.abs(Math.sin(t * stt.sp + stt.ph));
    ctx.beginPath(); ctx.fillStyle = "rgba(225,220,255," + a.toFixed(2) + ")";
    ctx.arc(stt.x * W + ox * 4, stt.y * H + oy * 3, stt.r * dpr, 0, 6.2832); ctx.fill();
  }

  /* ماه */
  if (cfg.moon) {
    var mxx = cfg.moon.x * W + ox * 6, myy = cfg.moon.y * H + oy * 4;
    var mr = cfg.moon.r * Math.min(W, H);
    var mg = ctx.createRadialGradient(mxx, myy, 0, mxx, myy, mr * 3.4);
    mg.addColorStop(0, "rgba(" + cfg.moon.g + ",.34)");
    mg.addColorStop(1, "rgba(" + cfg.moon.g + ",0)");
    ctx.fillStyle = mg; ctx.beginPath(); ctx.arc(mxx, myy, mr * 3.4, 0, 6.2832); ctx.fill();
    var pulse = 1 + Math.sin(t * .6) * .02;
    ctx.fillStyle = "rgba(" + cfg.moon.c + ",.95)";
    ctx.beginPath(); ctx.arc(mxx, myy, mr * pulse, 0, 6.2832); ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,.06)";
    ctx.beginPath(); ctx.arc(mxx - mr * .3, myy - mr * .2, mr * .18, 0, 6.2832); ctx.fill();
    ctx.beginPath(); ctx.arc(mxx + mr * .25, myy + mr * .3, mr * .12, 0, 6.2832); ctx.fill();
  }

  /* ابرها */
  for (var c = 0; c < clouds.length; c++) { var cl = clouds[c];
    cl.x += cl.sp * dt / 1000 * 6; if (cl.x > 1.25) cl.x = -.25;
    ctx.beginPath();
    ctx.fillStyle = "rgba(200,205,255," + cl.a + ")";
    ctx.ellipse(cl.x * W + ox * 9, cl.y * H + oy * 5,
      cl.w * W, cl.h * H, 0, 0, 6.2832); ctx.fill();
  }

  /* مه */
  var fg = ctx.createLinearGradient(0, H * .40, 0, H * .78);
  fg.addColorStop(0, "rgba(" + cfg.fog + ",0)");
  fg.addColorStop(1, "rgba(" + cfg.fog + "," + cfg.fogA + ")");
  ctx.fillStyle = fg; ctx.fillRect(0, H * .40, W, H * .4);

  /* ساختمان‌ها */
  drawB(city.far, cfg.bcol.far, ox * 11 + oy * 4, t, cfg, false);
  drawB(city.mid, cfg.bcol.mid, ox * 22 + oy * 8, t, cfg, true);
  drawB(city.near, cfg.bcol.near, ox * 38 + oy * 13, t, cfg, true);

  /* نورهای تیرکی */
  if (cfg.rays) {
    ctx.save(); ctx.globalCompositeOperation = "lighter";
    for (var r2 = 0; r2 < 3; r2++) {
      var xr = ((t * 12 + r2 * 260) % (W * 1.6)) - W * .3;
      ctx.beginPath();
      ctx.fillStyle = "rgba(" + cfg.neon[r2 % cfg.neon.length] + ",.045)";
      ctx.moveTo(xr, 0); ctx.lineTo(xr + 90 * dpr, 0);
      ctx.lineTo(xr - 160 * dpr, H); ctx.lineTo(xr - 250 * dpr, H);
      ctx.closePath(); ctx.fill();
    }
    ctx.restore();
  }

  /* آب‌وهوا */
  if (cfg.weather === "rain") {
    for (var i = 0; i < wx.length; i++) { var d = wx[i];
      d.y += d.v * dt / 250; d.x -= .015 * dt / 250;
      if (d.y > 1.05) { d.y = -.05; d.x = Math.random(); }
      if (d.x < -.05) d.x = 1.05;
      var x2 = d.x * W, y2 = d.y * H;
      ctx.beginPath(); ctx.strokeStyle = "rgba(150,225,255," + d.a + ")";
      ctx.lineWidth = 1 * dpr; ctx.moveTo(x2, y2);
      ctx.lineTo(x2 + 1.4 * dpr, y2 + d.l * dpr); ctx.stroke(); }
    if (cfg.flash) {
      if (Math.random() < .0035) flash = 1;
      if (flash > 0) { flash *= .93;
        ctx.fillStyle = "rgba(190,235,255," + (flash * .2).toFixed(3) + ")";
        ctx.fillRect(0, 0, W, H); }
    }
  } else if (cfg.weather === "petal") {
    for (var j = 0; j < wx.length; j++) { var p = wx[j];
      p.y += p.vy * dt / 460;
      p.x += Math.sin(t * p.sw + p.ph) * .0016; p.rot += p.vr;
      if (p.y > 1.06) { p.y = -.08; p.x = Math.random(); }
      ctx.save(); ctx.translate(p.x * W, p.y * H); ctx.rotate(p.rot);
      ctx.beginPath(); ctx.fillStyle = "rgba(255,170,215," + p.a + ")";
      ctx.ellipse(0, 0, p.s * dpr, p.s * dpr * .58, 0, 0, 6.2832); ctx.fill();
      ctx.beginPath(); ctx.fillStyle = "rgba(255,236,246," + (p.a * .55).toFixed(2) + ")";
      ctx.ellipse(-p.s * dpr * .24, -p.s * dpr * .16, p.s * dpr * .3,
        p.s * dpr * .18, 0, 0, 6.2832); ctx.fill();
      ctx.restore(); }
  } else if (cfg.weather === "ember") {
    for (var k = 0; k < wx.length; k++) { var e = wx[k];
      e.y += e.vy * dt / 700; e.x += e.vx * dt / 700 + Math.sin(t * 1.4 + e.ph) * .0008;
      if (e.y < -.06) { e.y = 1.06; e.x = Math.random(); }
      if (e.x < -.06) e.x = 1.06; if (e.x > 1.06) e.x = -.06;
      var aa = .3 + .5 * Math.abs(Math.sin(t * 1.5 + e.ph));
      var ex = e.x * W, ey = e.y * H, er = e.s * dpr;
      ctx.beginPath(); ctx.fillStyle = "rgba(255,180,80," + (aa * .16).toFixed(2) + ")";
      ctx.arc(ex, ey, er * 4.5, 0, 6.2832); ctx.fill();
      ctx.beginPath(); ctx.fillStyle = "rgba(255,225,150," + aa.toFixed(2) + ")";
      ctx.arc(ex, ey, er, 0, 6.2832); ctx.fill(); }
  } else if (cfg.weather === "spark") {
    var horizon2 = H * .60;
    for (var m = 0; m < wx.length; m++) { var sp = wx[m];
      sp.y -= sp.v * dt / 460; if (sp.y < 0) { sp.y = 1; sp.x = Math.random(); }
      ctx.beginPath(); ctx.fillStyle = "rgba(0,255,220,.5)";
      ctx.arc(sp.x * W, sp.y * horizon2, sp.s * dpr, 0, 6.2832); ctx.fill(); }
  } else if (cfg.weather === "shoot") {
    wx.next -= dt;
    if (wx.next <= 0) { wx.next = rnd(1400, 4200);
      wx.shoot = wx.shoot || [];
      wx.shoot.push({ x: rnd(.1, .75), y: rnd(.05, .3), v: rnd(.9, 1.5), a: 1 }); }
    var arr = wx.shoot || [];
    for (var q = arr.length - 1; q >= 0; q--) { var sh = arr[q];
      sh.x += sh.v * dt / 700; sh.y += sh.v * dt / 1100; sh.a -= dt / 1200;
      var sx = sh.x * W, sy = sh.y * H;
      var shg = ctx.createLinearGradient(sx - 90 * dpr, sy - 60 * dpr, sx, sy);
      shg.addColorStop(0, "rgba(255,255,255,0)");
      shg.addColorStop(1, "rgba(255,255,255," + Math.max(sh.a, 0).toFixed(2) + ")");
      ctx.beginPath(); ctx.strokeStyle = shg; ctx.lineWidth = 2 * dpr;
      ctx.moveTo(sx - 90 * dpr, sy - 60 * dpr); ctx.lineTo(sx, sy); ctx.stroke();
      if (sh.a <= 0) arr.splice(q, 1); }
  }
}

function drawB(arr, col, off, t, cfg, win) {
  if (!arr || !arr.length) return;
  ctx.save(); ctx.translate(off, 0);
  for (var i = 0; i < arr.length; i++) { var b = arr[i];
    ctx.fillStyle = col; ctx.fillRect(b.x, b.y, b.w, b.h);
    if (win && b.win.length) {
      var c = cfg.neon[b.ci % cfg.neon.length];
      var a0 = .5 + .45 * Math.abs(Math.sin(t * (.5 + b.ci * .13) + i));
      ctx.fillStyle = "rgba(" + c + ",1)";
      for (var k = 0; k < b.win.length; k++) { var wd = b.win[k];
        ctx.globalAlpha = wd.blink
          ? (.12 + .88 * Math.abs(Math.sin(t * wd.sp + wd.ph))) : a0;
        ctx.fillRect(wd.x, wd.y, wd.w, wd.h); }
      ctx.globalAlpha = 1;
    }
  }
  ctx.restore();
}

function loop(ts) {
  requestAnimationFrame(loop);
  if (document.body.classList.contains("vibeoff")) { last = 0; return; }
  if (!last) last = ts;
  var dt = Math.min(ts - last, 48); last = ts;
  px += (mx - px) * .045; py += (my - py) * .045;
  ctx.clearRect(0, 0, W, H);
  try { drawScene(ts * .001, dt); } catch (e) {}
  frames++;
  if (ts - t0 > 2500) {
    var fps = frames / ((ts - t0) / 1000);
    if (fps < 40 && QUAL > .45) {
      QUAL = Math.max(.45, QUAL - .25); cityFor = ""; build();
    }
    frames = 0; t0 = ts;
  }
}

/* ── پارالاکس ──────────────────────────────────────────────── */
function mv(cxp, cyp) {
  mx = (cxp / window.innerWidth - .5) * 2;
  my = (cyp / window.innerHeight - .5) * 2;
}
window.addEventListener("mousemove", function (e) { mv(e.clientX, e.clientY); }, { passive: true });
window.addEventListener("touchmove", function (e) {
  if (e.touches[0]) mv(e.touches[0].clientX, e.touches[0].clientY);
}, { passive: true });

/* ── انتخاب تم ─────────────────────────────────────────────── */
function applyTheme(id, silent) {
  var T = THEMES[id] || THEMES.default;
  CUR = THEMES[id] ? id : "default";
  skyDirty = true; cityFor = "";
  document.body.setAttribute("data-theme", CUR);
  try { localStorage.setItem("rbTheme", CUR); } catch (e) {}
  if (W && H) build();
  if (!silent) renderPicker();
}
function applySafe(id) {
  var T = THEMES[id]; if (!T) return;
  if (T.p && !isPrem()) return;
  applyTheme(id);
}
function pick(id) {
  var T = THEMES[id]; if (!T) return;
  if (T.p && !isPrem()) { if (R.toast) R.toast("این پس‌زمینه مخصوص پرمیوم است 💎", "err"); return; }
  applyTheme(id);
  if (R.ME && R.upd) R.upd("users/" + R.ME, { bg: id }).catch(function () {});
  if (R.toast) R.toast("صحنه «" + T.n + "» فعال شد ✅", "ok");
  renderPicker();
}

/* ── پنل ───────────────────────────────────────────────────── */
function renderPicker() {
  var w = R.$("thWall"); if (!w) return;
  var prem = isPrem();
  w.innerHTML = Object.keys(THEMES).map(function (id) {
    var T = THEMES[id], locked = T.p && !prem;
    var g = "linear-gradient(180deg,rgb(" + T.sky[0].join(",") + "),rgb(" +
      T.sky[1].join(",") + "),rgb(" + T.sky[2].join(",") + "))";
    return '<div class="thc' + (CUR === id ? " on" : "") + (locked ? " lk" : "") +
      '" data-th="' + id + '">' +
      (locked ? '<span class="lk2">💎</span>' : "") +
      '<div class="pvw" style="background:' + g + '"></div>' +
      '<div class="tb"><div class="tn">' + T.n + (T.p ? "" : " 🆓") + '</div>' +
      '<div class="td">' + T.d + '</div></div></div>';
  }).join("");
}

document.addEventListener("click", function (e) {
  var t = e.target && e.target.closest ? e.target.closest("[data-th]") : null;
  if (t) pick(t.getAttribute("data-th"));
});

/* ── بخش + منو ─────────────────────────────────────────────── */
function buildUI() {
  if (!R.$("sec-themes")) {
    var all = document.querySelectorAll(".sec");
    var ref = R.$("sec-settings") || R.$("sec-premium") || all[all.length - 1];
    var s = document.createElement("section");
    s.className = "sec"; s.id = "sec-themes";
    s.innerHTML = '<div class="head"><h2 class="h2">🎨 پس‌زمینه</h2>' +
      '<span class="xs mut">دنیای رونین را انتخاب کن</span></div>' +
      '<div class="grid auto" id="thWall"></div>' +
      '<div class="card mt"><div class="xs mut">💎 ۵ صحنه‌ی ویژه مخصوص پرمیوم است.</div></div>';
    if (ref && ref.parentNode) ref.parentNode.insertBefore(s, ref.nextSibling);
    else document.body.appendChild(s);
  }
  var rail = R.$("rail");
  if (rail && !R.$("thItem")) {
    var it = document.createElement("div");
    it.className = "ditem"; it.id = "thItem";
    it.setAttribute("data-go", "themes");
    it.innerHTML = "<i>🎨</i>پس‌زمینه";
    var base = R.$("archItem") || rail.querySelector('.ditem[data-go="settings"]') ||
      rail.querySelector('.ditem[data-go="premium"]');
    if (base && base.parentNode) base.parentNode.insertBefore(it, base.nextSibling);
    else rail.appendChild(it);
  }
  renderPicker();
}

/* ── راه‌اندازی ─────────────────────────────────────────────── */
function initial() {
  var id = (R.USER && R.USER.bg) || null;
  if (!id) { try { id = localStorage.getItem("rbTheme"); } catch (e) {} }
  id = id || "default";
  if (THEMES[id] && THEMES[id].p && !isPrem()) id = "default";
  CUR = THEMES[id] ? id : "default";
  document.body.setAttribute("data-theme", CUR);
}

R.hooks = R.hooks || {};
R.hooks.themes = function () { renderPicker(); };
var prevLogin = R.onLogin;
R.onLogin = function () {
  if (prevLogin) { try { prevLogin(); } catch (e) {} }
  try {
    buildUI();
    if (R.get && R.ME) {
      R.get("users/" + R.ME + "/bg").then(function (v) { if (v) applySafe(v); }).catch(function () {});
    }
    renderPicker();
  } catch (e) { console.error(e); }
};

var rsz;
window.addEventListener("resize", function () {
  clearTimeout(rsz); rsz = setTimeout(function () { size(); build(); }, 220);
}, { passive: true });
document.addEventListener("visibilitychange", function () { if (document.hidden) last = 0; });

function start() {
  size(); initial();
  try { buildUI(); } catch (e) { console.error(e); }
  [700, 2000, 4000].forEach(function (ms) {
    setTimeout(function () { try { buildUI(); } catch (e) {} }, ms);
  });
  if (!rm) requestAnimationFrame(loop);
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
else start();

console.log("%c🌃 RONIN ANIME BG ready", "color:#37bfff;font-weight:900");
})();
