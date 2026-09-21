/* ═══════════════════════════════════════════════════════════════
   RONIN STORE — ANIME BG v2 🌃
   پس‌زمینه انیمه‌ای زنده + پنل انتخاب صحنه (جایگزین کامل فایل قبلی)
   ═══════════════════════════════════════════════════════════════ */
"use strict";
(function () {
var R = window.R;
if (!R) { console.error("[bg] R نیست"); return; }
function $(id) { return document.getElementById(id); }

/* ── دستگاه ─────────────────────────────────────────────────── */
var RM = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
var MOB = window.innerWidth < 760 || /Mobi|Android/i.test(navigator.userAgent);
var HI = !RM && !MOB && (navigator.hardwareConcurrency || 4) >= 4;
function rng(s){var a=s>>>0;return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};}
function isPrem(){ return !!(R.prem || (R.USER && (R.USER.prem || R.USER.premium)) || R.role === "owner"); }

/* ── صحنه‌ها ────────────────────────────────────────────────── */
var TH = {
tokyo:    { n:"توکیو شب", d:"ماه + برج‌های نئونی", p:false, seed:7,  stars:1,
  moon:[.74,.20,.075,"245,240,255","180,170,255"], sky:["#1b1340","#0b0b24","#03040c"],
  far:"#0b0d24", mid:"#070a1c", near:"#04050f",
  neon:["154,99,255","55,191,255","255,79,207","255,214,107"],
  fog:"12,14,40", fogA:.55, w:"petal", wn:MOB?14:26, wc:"255,190,225", rays:1 },
neonrain: { n:"باران نئونی", d:"باران + مه + رعد", p:true, seed:21, stars:0,
  moon:[.70,.17,.060,"210,225,255","120,180,255"], sky:["#08142e","#081a3a","#02030a"],
  far:"#081430", mid:"#060c22", near:"#03060f",
  neon:["0,220,255","255,79,207","120,180,255","90,255,200"],
  fog:"20,40,80", fogA:.75, w:"rain", wn:MOB?70:150, wc:"140,190,255", rays:0, flash:1 },
sakura:   { n:"معبد شکوفه", d:"آسمون صورتی + شکوفه", p:true, seed:33, stars:1,
  moon:[.28,.22,.085,"255,240,246","255,150,200"], sky:["#431c46","#33143a","#0d0712"],
  far:"#2a1630", mid:"#1d1026", near:"#0e0814",
  neon:["255,140,190","255,90,170","255,214,107","220,160,255"],
  fog:"60,24,54", fogA:.45, w:"petal", wn:MOB?55:120, wc:"255,205,225", rays:1 },
cyber:    { n:"شهر سایبری", d:"نئون سرخابی و فیروزه", p:true, seed:44, stars:1, moon:null,
  sky:["#08061c","#120a34","#02030a"], far:"#0b0722", mid:"#080518", near:"#04020d",
  neon:["255,60,200","0,255,220","140,90,255","255,150,0"],
  fog:"30,10,60", fogA:.6, w:"spark", wn:MOB?30:60, wc:"0,255,220", rays:0 },
galaxy:   { n:"آسمون کهکشان", d:"افق کوتاه + شهاب‌سنگ", p:true, seed:55, stars:1,
  moon:[.82,.16,.050,"240,235,255","150,120,255"], sky:["#180d3a","#0a0620","#02030a"],
  far:"#0c0a24", mid:"#080618", near:"#04030e",
  neon:["180,160,255","120,200,255","255,180,240","255,240,200"],
  fog:"24,16,60", fogA:.4, w:"shoot", wn:MOB?20:40, wc:"190,175,255", rays:0 },
sunset:   { n:"غروب سرخ", d:"افق گرم + ذرات آتشین", p:true, seed:66, stars:0,
  moon:[.50,.55,.120,"255,180,90","255,90,40"], sky:["#4a1c2c","#2a1024","#08050a"],
  far:"#2a1220", mid:"#1c0c18", near:"#0d060c",
  neon:["255,170,60","255,90,60","255,214,107","255,120,160"],
  fog:"90,30,20", fogA:.6, w:"ember", wn:MOB?30:52, wc:"255,150,70", rays:1 }
};
var IDS = Object.keys(TH);

/* ── استایل ─────────────────────────────────────────────────── */
if (!$("bg2-css")) {
  var st = document.createElement("style"); st.id = "bg2-css";
  st.textContent =
    "#bgCanvas{position:fixed;inset:0;z-index:-9;pointer-events:none}" +
    "body.vibeoff #bgCanvas{display:none}" +
    "#bgTog{position:fixed;inset-inline-end:12px;bottom:210px;z-index:70;width:38px;height:38px;" +
      "border-radius:50%;border:1px solid rgba(132,124,255,.35);background:rgba(11,13,35,.7);" +
      "color:#cfcaff;font-size:15px;display:grid;place-items:center;cursor:pointer}" +
    "#bgTog.off{opacity:.45}" +
    ".bggrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:11px}" +
    ".bgc{position:relative;border-radius:16px;overflow:hidden;border:1px solid rgba(132,124,255,.22);" +
      "background:rgba(11,13,35,.66);cursor:pointer;transition:.2s}" +
    ".bgc:hover{transform:translateY(-3px);border-color:rgba(34,211,238,.6)}" +
    ".bgc.on{border-color:#ffd66b;box-shadow:0 0 16px rgba(255,214,107,.32)}" +
    ".bgc.lk{opacity:.6}" +
    ".bgc .pv{height:74px;width:100%}" +
    ".bgc .tt{padding:8px 10px}" +
    ".bgc .tn{font-size:12px;font-weight:800}" +
    ".bgc .td{font-size:10px;color:#a8a7c3}" +
    ".bgc .lk2{position:absolute;top:7px;inset-inline-end:8px;font-size:12px}";
  document.head.appendChild(st);
}

/* ── وضعیت ──────────────────────────────────────────────────── */
var W=0,H=0,DPR=1,CUR="tokyo";
var cv, ctx, px=0,py=0,mx=0,my=0, skyG=null, skyFor="";
var city=[], cityFor="", stars=[], parts=[];
var QUAL=1, frames=0, t0=0, last=0;

function size(){
  DPR = Math.min(window.devicePixelRatio || 1, MOB ? 1.5 : 2);
  W = cv.width  = Math.floor(window.innerWidth  * DPR);
  H = cv.height = Math.floor(window.innerHeight * DPR);
  cv.style.width = window.innerWidth + "px";
  cv.style.height = window.innerHeight + "px";
  skyFor = ""; cityFor = "";
}

/* ── ساخت صحنه ──────────────────────────────────────────────── */
function buildSky(){ var T=TH[CUR]; skyG=ctx.createLinearGradient(0,0,0,H);
  skyG.addColorStop(0,T.sky[0]); skyG.addColorStop(.55,T.sky[1]); skyG.addColorStop(1,T.sky[2]);
  skyFor = CUR+"_"+H; }

function buildStars(){ var T=TH[CUR]; stars=[];
  if(!T.stars) return;
  var n=Math.round((HI?150:MOB?55:100)*QUAL), r=rng(T.seed+5);
  for(var i=0;i<n;i++) stars.push({x:r()*W,y:r()*H*.72,r:(.6+r()*1.5)*DPR,p:r()*6.28,s:.4+r()*1.4}); }

function buildCity(){
  var T=TH[CUR], L=[];
  var conf=[
    {top:.58,n:HI?16:MOB?9:12, c:T.far,  pa:5,  ws:1,   lit:.20},
    {top:.67,n:HI?14:MOB?8:11, c:T.mid,  pa:10, ws:1.4, lit:.26},
    {top:.77,n:HI?12:MOB?7:10, c:T.near, pa:16, ws:1.9, lit:.34}
  ];
  for(var li=0; li<conf.length; li++){
    var c=conf[li], r=rng(T.seed+li*17), arr=[], x=-50*DPR;
    while(x < W+50*DPR){
      var bw=(34+r()*80)*DPR*c.ws, bh=(70+r()*Math.min(H*.40,340*DPR));
      var b={x:x,w:bw,h:bh,ws:[]};
      var cols=Math.max(1,Math.floor(bw/(10*DPR))), rows=Math.max(1,Math.floor(bh/(14*DPR)));
      for(var i=0;i<cols;i++) for(var j=0;j<rows;j++){
        if(r() > c.lit) continue;
        b.ws.push({ x:(i+.5)*(bw/cols), y:(j+.6)*(bh/rows),
          ph:r()*6.28, sp:.6+r()*2.2, on:r()>.42,
          col:T.neon[Math.floor(r()*T.neon.length)] });
      }
      arr.push(b);
      x += bw + (5+r()*14)*DPR;
    }
    L.push({c:c, arr:arr});
  }
  city = L; cityFor = CUR+"_"+W+"_"+H;
}

function newPart(T, r, init){
  var p = { x:r()*W, y:0 };
  if(T.w==="rain"){ p.y = init? r()*H : -20*DPR; p.vy=(1.0+r()*.9)*DPR; p.vx=-.35*DPR; p.len=(11+r()*20)*DPR; }
  else if(T.w==="petal"){ p.y = init? r()*H : -20*DPR; p.vy=(.25+r()*.5)*DPR; p.vx=(.15+r()*.4)*DPR; p.rad=(2.4+r()*3.2)*DPR; p.a=r()*6.28; p.sp=.6+r(); }
  else if(T.w==="ember"){ p.y = init? r()*H : H*(.85+r()*.3); p.vy=-(.35+r()*.6)*DPR; p.vx=(r()-.5)*.35*DPR; p.rad=(1.2+r()*2.4)*DPR; }
  else { p.y = init? r()*H : r()*H; p.vy=(.05+r()*.25)*DPR; p.vx=(r()-.5)*.45*DPR; p.rad=(1+r()*2)*DPR; p.a=r()*6.28; }
  return p;
}
function buildParts(){
  var T=TH[CUR], n=Math.round(T.wn*(MOB?.6:1)*QUAL), r=rng(T.seed+91);
  parts=[]; for(var i=0;i<n;i++) parts.push(newPart(T, r, true));
}

function build(){ if(!W||!H) return; buildSky(); buildStars(); buildCity(); buildParts(); }

/* ── رسم ────────────────────────────────────────────────────── */
function drawMoon(ts){
  var T=TH[CUR]; if(!T.moon) return;
  var m=T.moon, rad=m[2]*Math.min(W,H);
  var cx=m[0]*W - px*8*DPR, cy=m[1]*H - py*8*DPR;
  var gl=ctx.createRadialGradient(cx,cy,rad*.3,cx,cy,rad*4.2);
  gl.addColorStop(0,"rgba("+m[4]+",.40)"); gl.addColorStop(1,"rgba("+m[4]+",0)");
  ctx.fillStyle=gl; ctx.beginPath(); ctx.arc(cx,cy,rad*4.2,0,6.2832); ctx.fill();
  ctx.fillStyle="rgb("+m[3]+")"; ctx.beginPath(); ctx.arc(cx,cy,rad,0,6.2832); ctx.fill();
  ctx.fillStyle="rgba(0,0,0,.10)"; ctx.beginPath(); ctx.arc(cx+rad*.42,cy-rad*.22,rad*.88,0,6.2832); ctx.fill();
}
function drawStars(ts){
  var T=TH[CUR]; if(!T.stars) return;
  for(var i=0;i<stars.length;i++){ var s=stars[i];
    var a=.35+.65*(.5+.5*Math.sin(ts*s.s+s.p));
    ctx.fillStyle="rgba(255,255,255,"+(a*.9).toFixed(2)+")";
    ctx.beginPath(); ctx.arc(s.x-px*4*DPR, s.y-py*4*DPR, s.r, 0, 6.2832); ctx.fill(); }
}
function drawRays(ts){
  var T=TH[CUR]; if(!T.rays) return;
  ctx.save(); ctx.globalCompositeOperation="lighter";
  for(var i=0;i<3;i++){
    var o=(i-.5)*W*.4 + Math.sin(ts*.12+i)*22*DPR;
    var g=ctx.createLinearGradient(o,0,o+W*.28,H*.8);
    g.addColorStop(0,"rgba("+T.neon[i%T.neon.length]+",0)");
    g.addColorStop(.5,"rgba("+T.neon[i%T.neon.length]+",.06)");
    g.addColorStop(1,"rgba("+T.neon[i%T.neon.length]+",0)");
    ctx.fillStyle=g; ctx.beginPath();
    ctx.moveTo(o,H*.1); ctx.lineTo(o+90*DPR,H*.1); ctx.lineTo(o+240*DPR,H); ctx.lineTo(o+60*DPR,H);
    ctx.closePath(); ctx.fill();
  }
  ctx.restore();
}
function drawLayer(L, ts){
  var c=L.c, base=H*c.top - py*c.pa*DPR, dx=-px*c.pa*DPR;
  for(var i=0;i<L.arr.length;i++){ var b=L.arr[i];
    ctx.fillStyle=c.c; ctx.fillRect(b.x+dx, base-b.h, b.w, b.h+H);
    for(var k=0;k<b.ws.length;k++){ var w=b.ws[k];
      var lit = w.on ? (Math.sin(ts*w.sp+w.ph)>.12?1:0) : (Math.sin(ts*1.7+w.ph)>.94?1:0);
      if(!lit) continue;
      ctx.fillStyle="rgba("+w.col+",.85)";
      ctx.fillRect(b.x+dx+w.x-1.7*DPR, base-b.h+w.y, 3.4*DPR, 4.8*DPR);
    }
  }
}
function drawFog(){
  var T=TH[CUR];
  var g=ctx.createLinearGradient(0,H*.52,0,H);
  g.addColorStop(0,"rgba("+T.fog+",0)");
  g.addColorStop(.55,"rgba("+T.fog+","+(T.fogA*.55).toFixed(2)+")");
  g.addColorStop(1,"rgba("+T.fog+","+T.fogA+")");
  ctx.fillStyle=g; ctx.fillRect(0,H*.52,W,H*.48);
}
function drawWeather(ts, dt){
  var T=TH[CUR];
  if(T.w==="shoot"){
    var ph=(ts*.16)%1;
    if(ph<.22){ var t=ph/.22, sx=W*(.15+.7*t), sy=H*(.05+.28*t);
      var g=ctx.createLinearGradient(sx,sy,sx-160*DPR,sy-80*DPR);
      g.addColorStop(0,"rgba(255,255,255,.75)"); g.addColorStop(1,"rgba(255,255,255,0)");
      ctx.strokeStyle=g; ctx.lineWidth=2*DPR; ctx.beginPath();
      ctx.moveTo(sx,sy); ctx.lineTo(sx-160*DPR,sy-80*DPR); ctx.stroke(); }
  }
  var d = dt/16.7;
  for(var i=0;i<parts.length;i++){ var p=parts[i];
    p.x+=p.vx*d; p.y+=p.vy*d;
    if(T.w==="petal") p.a+=.03*p.sp*d;
    var out = (p.y>H+30*DPR) || (p.x>W+40*DPR) || (p.x<-40*DPR) || (T.w==="ember" && p.y<-20*DPR);
    if(out){ parts[i]=newPart(T, Math.random, false); continue; }
    if(T.w==="rain"){
      ctx.strokeStyle="rgba("+T.wc+",.42)"; ctx.lineWidth=1.3*DPR;
      ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(p.x+p.vx*2.4, p.y+p.len); ctx.stroke();
    } else if(T.w==="petal"){
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.a);
      ctx.fillStyle="rgba("+T.wc+",.55)";
      ctx.beginPath(); ctx.ellipse(0,0,p.rad,p.rad*.55,0,0,6.2832); ctx.fill(); ctx.restore();
    } else if(T.w==="ember"){
      var a=.45+.55*Math.sin(ts*2+i);
      ctx.fillStyle="rgba("+T.wc+","+(a*.7).toFixed(2)+")";
      ctx.beginPath(); ctx.arc(p.x,p.y,p.rad,0,6.2832); ctx.fill();
    } else {
      var a2=.3+.7*(.5+.5*Math.sin(ts*1.6+(p.a||0)));
      ctx.fillStyle="rgba("+T.wc+","+(a2*.55).toFixed(2)+")";
      ctx.beginPath(); ctx.arc(p.x,p.y,p.rad,0,6.2832); ctx.fill();
    }
  }
  if(T.flash){ var f=Math.sin(ts*1.1)*Math.sin(ts*.37);
    if(f>.965){ ctx.fillStyle="rgba(180,210,255,"+((f-.965)*3).toFixed(2)+")"; ctx.fillRect(0,0,W,H); } }
}
function drawScene(ts, dt){
  if(skyFor!==CUR+"_"+H) buildSky();
  ctx.fillStyle=skyG; ctx.fillRect(0,0,W,H);
  drawStars(ts); drawMoon(ts); drawRays(ts);
  ctx.globalAlpha=1;
  drawLayer(city[0], ts); drawLayer(city[1], ts);
  drawFog();
  drawLayer(city[2], ts);
  drawWeather(ts, dt);
}

function loop(ts){
  requestAnimationFrame(loop);
  if(document.body.classList.contains("vibeoff")){ last=0; return; }
  if(!last) last=ts;
  var dt=Math.min(ts-last,48); last=ts;
  px += (mx-px)*.05; py += (my-py)*.05;
  ctx.clearRect(0,0,W,H);
  try{ drawScene(ts*.001, dt); }catch(e){}
  frames++;
  if(ts-t0>2500){ var fps=frames/((ts-t0)/1000);
    if(fps<40 && QUAL>.45){ QUAL=Math.max(.45, QUAL-.25); cityFor=""; build(); }
    frames=0; t0=ts; }
}

/* ── پنل انتخاب ─────────────────────────────────────────────── */
function renderWall(){
  var w=$("bgWall"); if(!w) return;
  w.innerHTML="";
  for(var i=0;i<IDS.length;i++){
    var id=IDS[i], T=TH[id], locked = T.p && !isPrem();
    var el=document.createElement("div");
    el.className="bgc"+(CUR===id?" on":"")+(locked?" lk":"");
    el.innerHTML='<div class="pv" style="background:linear-gradient(180deg,'+T.sky[0]+','+T.sky[1]+','+T.sky[2]+')"></div>'+
      '<div class="tt"><div class="tn">'+T.n+(T.p?"":" 🆓")+'</div><div class="td">'+T.d+'</div></div>'+
      (locked ? '<span class="lk2">💎</span>' : (CUR===id ? '<span class="lk2">✅</span>' : ""));
    (function(k){ el.onclick = function(){ pick(k); }; })(id);
    w.appendChild(el);
  }
}
function buildUI(){
  if(!$("sec-themes")){
    var secs=document.querySelectorAll(".sec");
    var ref=$("sec-settings")||$("sec-premium")||$("sec-chat")||secs[secs.length-1];
    var s=document.createElement("section");
    s.className="sec"; s.id="sec-themes";
    s.innerHTML='<div class="head"><h2 class="h2">🎨 پس‌زمینه</h2>'+
      '<span class="xs mut">صحنه‌ی دنیای رونین را انتخاب کن</span></div>'+
      '<div id="bgWall" class="bggrid"></div>'+
      '<div class="card mt"><div class="xs mut">💎 ۵ صحنه‌ی ویژه مخصوص پرمیوم است — با پرمیوم همه باز می‌شود.</div></div>';
    if(ref && ref.parentNode) ref.parentNode.insertBefore(s, ref.nextSibling);
    else document.body.appendChild(s);
  }
  var rail=$("rail");
  if(rail && !$("bgItem")){
    var it=document.createElement("div");
    it.className="ditem"; it.id="bgItem"; it.setAttribute("data-go","themes");
    it.innerHTML="<i>🎨</i>پس‌زمینه";
    var base=$("archItem")||rail.querySelector('.ditem[data-go="settings"]')||rail.querySelector('.ditem[data-go="premium"]');
    if(base && base.parentNode) base.parentNode.insertBefore(it, base.nextSibling);
    else rail.appendChild(it);
  }
  renderWall();
}

/* ── اعمال ──────────────────────────────────────────────────── */
function apply(id){
  CUR = TH[id] ? id : "tokyo";
  document.body.setAttribute("data-theme",CUR);
  try{ localStorage.setItem("rbTheme",CUR); }catch(e){}
  QUAL=1; cityFor=""; skyFor=""; build();
  renderWall();
}
function pick(id){
  var T=TH[id]; if(!T) return;
  if(T.p && !isPrem()){ if(R.toast) R.toast("این پس‌زمینه مخصوص پرمیوم است 💎","err"); return; }
  apply(id);
  try{ if(R.ME && R.upd) R.upd("users/"+R.ME,{bg:id}); }catch(e){}
  if(R.toast) R.toast("صحنه «"+T.n+"» فعال شد ✅","ok");
}
function syncDB(){
  if(!R.ME || !R.get) return;
  try{
    R.get("users/"+R.ME+"/bg").then(function(v){
      if(v && TH[v] && (!TH[v].p || isPrem()) && v!==CUR) apply(v);
    }).catch(function(){});
  }catch(e){}
}

/* ── بوت ────────────────────────────────────────────────────── */
function start(){
  var old=$("rbCanvas"); if(old && old.parentNode) old.parentNode.removeChild(old);
  cv=document.createElement("canvas"); cv.id="bgCanvas";
  document.body.appendChild(cv);
  ctx=cv.getContext("2d",{alpha:true});
  var tg=document.createElement("button"); tg.id="bgTog"; tg.type="button"; tg.title="خاموش/روشن افکت‌ها";
  tg.textContent="✨";
  tg.onclick=function(){
    var off=document.body.classList.toggle("vibeoff");
    tg.classList.toggle("off", off);
    tg.textContent = off ? "💤" : "✨";
  };
  document.body.appendChild(tg);

  var id=(R.USER && R.USER.bg)||null;
  if(!id){ try{ id=localStorage.getItem("rbTheme"); }catch(e){} }
  id = id || "tokyo";
  if(!TH[id] || (TH[id].p && !isPrem())) id="tokyo";
  CUR=id; document.body.setAttribute("data-theme",CUR);

  size(); build();
  window.addEventListener("resize", function(){ size(); build(); }, {passive:true});
  window.addEventListener("mousemove", function(e){ mx=(e.clientX/window.innerWidth-.5)*2; my=(e.clientY/window.innerHeight-.5)*2; }, {passive:true});
  window.addEventListener("touchmove", function(e){ var t=e.touches&&e.touches[0]; if(t){ mx=(t.clientX/window.innerWidth-.5)*2; my=(t.clientY/window.innerHeight-.5)*2; } }, {passive:true});

  try{ buildUI(); }catch(e){ console.error(e); }
  [700,2000,4000].forEach(function(ms){ setTimeout(function(){ try{ buildUI(); }catch(e){} }, ms); });
  [1500,3500,7000].forEach(function(ms){ setTimeout(syncDB, ms); });

  if(!RM) requestAnimationFrame(loop);
  console.log("%c🌃 RONIN ANIME BG v2 ready","color:#37bfff;font-weight:900");
}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", start);
else start();
})();
