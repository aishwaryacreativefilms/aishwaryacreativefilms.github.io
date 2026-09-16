// Aishwarya Creative Films — hero particle field: golden bokeh orbs + drifting
// film dust on a 2D canvas. Fails silently if canvas is unavailable.
(function () {
  "use strict";
  var canvas = document.getElementById("film-dust");
  if (!canvas) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ctx;
  try { ctx = canvas.getContext("2d"); } catch (err) { canvas.style.display = "none"; return; }
  if (!ctx) { canvas.style.display = "none"; return; }

  var W = 0, H = 0, dpr = 1;
  var particles = [];
  var mx = 0, my = 0, tx = 0, ty = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth || canvas.parentElement.clientWidth || window.innerWidth;
    H = canvas.clientHeight || canvas.parentElement.clientHeight || 600;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function gold() {
    var r = Math.random();
    if (r < 0.3) return "247,201,75";
    if (r < 0.55) return "255,233,144";
    return "185,171,147";
  }

  function seed() {
    particles = [];
    var small = Math.min(window.innerWidth, window.innerHeight) < 640;
    var count = small ? 55 : 110;
    for (var i = 0; i < count; i++) {
      var bokeh = Math.random() < 0.18;
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: bokeh ? 14 + Math.random() * 34 : 0.6 + Math.random() * 2.2,
        c: gold(),
        a: bokeh ? 0.05 + Math.random() * 0.07 : 0.25 + Math.random() * 0.5,
        vx: (Math.random() - 0.5) * (bokeh ? 0.08 : 0.22),
        vy: -(0.05 + Math.random() * (bokeh ? 0.12 : 0.3)),
        ph: Math.random() * Math.PI * 2,
        sp: 0.004 + Math.random() * 0.01,
        depth: 0.3 + Math.random() * 0.7
      });
    }
  }

  window.addEventListener("pointermove", function (e) {
    mx = e.clientX / window.innerWidth - 0.5;
    my = e.clientY / window.innerHeight - 0.5;
  }, { passive: true });

  window.addEventListener("resize", function () { resize(); seed(); }, { passive: true });

  var running = true;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) { running = entries[0].isIntersecting; }).observe(canvas);
  }

  function frame() {
    requestAnimationFrame(frame);
    if (!running || document.hidden) return;

    tx += (mx - tx) * 0.03;
    ty += (my - ty) * 0.03;

    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      if (!reduceMotion) {
        p.x += p.vx; p.y += p.vy; p.ph += p.sp;
        if (p.y < -60) { p.y = H + 60; p.x = Math.random() * W; }
        if (p.x < -60) p.x = W + 60; else if (p.x > W + 60) p.x = -60;
      }
      var tw = 0.65 + Math.sin(p.ph) * 0.35;
      var ox = p.depth > 0.7 ? tx * 26 * p.depth : 0;
      var oy = p.depth > 0.7 ? ty * 18 * p.depth : 0;
      ctx.beginPath();
      ctx.arc(p.x + ox, p.y + oy, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + p.c + "," + (p.a * tw).toFixed(3) + ")";
      ctx.fill();
    }
  }

  resize();
  seed();
  frame();
})();
