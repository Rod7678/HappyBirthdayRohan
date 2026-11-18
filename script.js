(function () {
  const canvas = document.getElementById("fxCanvas");
  const ctx = canvas.getContext("2d");
  let W = (canvas.width = window.innerWidth);
  let H = (canvas.height = window.innerHeight);
  const confetti = [];
  const colors = [
    getComputedStyle(document.documentElement)
      .getPropertyValue("--accent1")
      .trim() || "#ff6fcf",
    getComputedStyle(document.documentElement)
      .getPropertyValue("--accent2")
      .trim() || "#8a60ff",
    "#ffd166",
    "#ff9a9e",
  ];

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }
  function makePiece() {
    return {
      x: rand(0, W),
      y: rand(-H, 0),
      vx: rand(-1, 1),
      vy: rand(2, 6),
      size: Math.floor(rand(6, 14)),
      rot: rand(0, Math.PI * 2),
      vr: rand(-0.1, 0.1),
      color: colors[Math.floor(rand(0, colors.length))],
    };
  }
  for (let i = 0; i < 45; i++) confetti.push(makePiece());

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);

  function update() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < confetti.length; i++) {
      const p = confetti[i];
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.vy += 0.03;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
      if (p.y > H + 20) {
        confetti[i] = makePiece();
        confetti[i].y = -20;
      }
    }
    requestAnimationFrame(update);
  }
  update();
})();
(function () {
  const colors = [
    "rgba(255,111,207,0.95)",
    "rgba(138,96,255,0.95)",
    "rgba(255,209,102,0.95)",
  ];
  const root = document.body;
  const count = 8;
  for (let i = 0; i < count; i++) {
    const b = document.createElement("div");
    b.className = "balloon";
    const size = 60 + Math.random() * 80;
    b.style.width = size + "px";
    b.style.height = size * 1.2 + "px";
    b.style.left = Math.random() * 100 + "vw";
    b.style.bottom = -Math.random() * 200 - 80 + "px";
    b.style.background = colors[i % colors.length];
    b.style.opacity = 0.95;
    b.style.zIndex = 10 + i;
    root.appendChild(b);
    animateBalloon(b);
  }
  function animateBalloon(el) {
    const delay = Math.random() * 4;
    const duration = 16 + Math.random() * 18;
    const startLeft = parseFloat(el.style.left);
    el.animate(
      [
        { transform: `translateY(0)`, left: startLeft + "vw", opacity: 0.95 },
        {
          transform: `translateY(-110vh)`,
          left: startLeft + (Math.random() * 12 - 6) + "vw",
          opacity: 0.6,
        },
      ],
      { duration: duration * 1000, iterations: Infinity, delay: delay * 1000 },
    );
  }
})();
(function () {
  document.querySelectorAll(".faq-item").forEach(function (item) {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    const icon = q.querySelector(".faq-icon");
    q.addEventListener("click", function () {
      const isOpen = a.classList.contains("open");
      if (isOpen) {
        a.style.maxHeight = "0px";
        a.classList.remove("open");
        icon.textContent = "+";
      } else {
        a.style.maxHeight = a.scrollHeight + 20 + "px";
        a.classList.add("open");
        icon.textContent = "−";
      }
    });
  });
})();

const roasts = [
  "Rohan is proof that software updates don't fix everything.",
  "You're not getting older. You're just increasing in file size.",
  "Your Wi-Fi has more connection than your brain. Happy birthday!",
  "If confidence were intelligence, you'd be a genius.",
  "You're the human version of a 1% battery warning.",
  "Another year older and still asking, 'What's the plan?'",
  "You're not a limited edition. The factory just stopped checking quality.",
  "Your future is bright. Please wear sunglasses. Also use common sense.",
];
const roastText = document.getElementById("roastText");
document.getElementById("roastBtn").addEventListener("click", () => {
  let next = roasts[Math.floor(Math.random() * roasts.length)];
  if (next === roastText.textContent)
    next = roasts[(roasts.indexOf(next) + 1) % roasts.length];
  roastText.animate(
    [
      { opacity: 0, transform: "translateY(10px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    { duration: 350 },
  );
  roastText.textContent = next;
  burst(75);
});
const toast = document.getElementById("toast");
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}
document.getElementById("copyRoast").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(roastText.textContent);
    showToast("Roast copied. Emotional damage delivered. 😎");
  } catch (e) {
    showToast("Select the roast and copy it manually!");
  }
});
document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("roasts").scrollIntoView({ behavior: "smooth" });
  burst(120);
});
document.getElementById("blowBtn").addEventListener("click", () => {
  const c = document.getElementById("candles"),
    hint = document.getElementById("cakeHint"),
    btn = document.getElementById("blowBtn");
  if (!c.classList.contains("out")) {
    c.classList.add("out");
    hint.textContent = "STATUS: CANDLES OUT. WISH SUBMITTED TO THE UNIVERSE.";
    btn.textContent = "Relight the candles 🔥";
    burst(180);
    playChime();
  } else {
    c.classList.remove("out");
    hint.textContent = "STATUS: CANDLES LIT. MAKE IT COUNT.";
    btn.textContent = "Blow out the candles 💨";
  }
});
document.getElementById("revealBtn").addEventListener("click", () => {
  document.getElementById("hiddenMessage").classList.toggle("show");
  document.getElementById("revealBtn").textContent = document
    .getElementById("hiddenMessage")
    .classList.contains("show")
    ? "Message unlocked ❤️"
    : "Unlock the top-secret message 🔐";
  if (document.getElementById("hiddenMessage").classList.contains("show"))
    burst(150);
});
document.getElementById("shareBtn").addEventListener("click", async () => {
  const data = {
    title: "Rohan's Birthday Surprise 🎂",
    text: "Someone made you a birthday website. Open your surprise, Rohan!",
    url: location.href,
  };
  if (navigator.share) {
    try {
      await navigator.share(data);
    } catch (e) {}
  } else {
    try {
      await navigator.clipboard.writeText(location.href);
      showToast("Website link copied!");
    } catch (e) {
      showToast("Copy the website URL from your browser!");
    }
  }
});
// Lightweight original synthesized chime; no external music or audio files.
function playChime() {
  try {
    const ctx = new (window.AudioContext || window.AudioContext)();
    [523.25, 659.25, 783.99].forEach((f, i) => {
      const o = ctx.createOscillator(),
        g = ctx.createGain();
      o.frequency.value = f;
      o.type = "sine";
      g.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.12);
      g.gain.exponentialRampToValueAtTime(
        0.12,
        ctx.currentTime + i * 0.12 + 0.03,
      );
      g.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + i * 0.12 + 0.45,
      );
      o.connect(g);
      g.connect(ctx.destination);
      o.start(ctx.currentTime + i * 0.12);
      o.stop(ctx.currentTime + i * 0.12 + 0.5);
    });
  } catch (e) {}
}
// Canvas confetti
const canvas = document.getElementById("confetti"),
  ctx = canvas.getContext("2d");
let pieces = [];
function resize() {
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}
addEventListener("resize", resize);
resize();
function burst(count = 100) {
  const colors = ["#ff4fa3", "#ffe66d", "#6cf4e8", "#ffffff", "#a98bff"];
  for (let i = 0; i < count; i++)
    pieces.push({
      x: innerWidth / 2 + (Math.random() - 0.5) * 160,
      y: innerHeight * 0.45,
      vx: (Math.random() - 0.5) * 10,
      vy: -Math.random() * 10 - 3,
      size: Math.random() * 7 + 3,
      rot: Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 100 + Math.random() * 50,
    });
}
function tick() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  pieces = pieces.filter((p) => p.life-- > 0 && p.y < innerHeight + 30);
  for (const p of pieces) {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.16;
    p.rot += 0.1;
    p.vx *= 0.995;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
    ctx.restore();
  }
  requestAnimationFrame(tick);
}
tick();
setTimeout(() => burst(110), 650);
