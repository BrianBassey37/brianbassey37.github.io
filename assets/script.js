// ---------- GitHub's actual language colors ----------
const LANG_COLORS = {
  "Python": "#3572A5",
  "JavaScript": "#f1e05a",
  "C": "#555555",
  "Jupyter Notebook": "#DA5B0B",
  "HTML": "#e34c26",
  "Shell": "#89e051",
  "Django": "#0C4B33",
  "Flask": "#3572A5"
};
function langColor(lang) {
  const first = lang.split(" / ")[0].trim();
  return LANG_COLORS[first] || "#39ff88";
}

// ---------- Data: 4 strongest, fully-owned (non-fork) repos from github.com/brianbassey37 ----------
const PROJECTS = [
  {
    name: "glucose_predictor_app",
    desc: "Machine learning app that predicts blood glucose levels from patient data, served through an interactive Streamlit interface.",
    lang: "Python",
    tags: ["data"],
    url: "https://github.com/brianbassey37/glucose_predictor_app"
  },
  {
    name: "AirBnB_clone",
    desc: "Console-driven AirBnB clone covering object-relational mapping, file storage, and core OOP design.",
    lang: "Python",
    tags: ["web"],
    url: "https://github.com/brianbassey37/AirBnB_clone"
  },
  {
    name: "binary_trees",
    desc: "Binary tree data structures and traversal algorithms implemented from first principles in C.",
    lang: "C",
    tags: ["systems"],
    url: "https://github.com/brianbassey37/binary_trees"
  },
  {
    name: "RSA-Factoring-Challenge",
    desc: "A cryptography-focused challenge exploring RSA key factoring using Python and C.",
    lang: "Python / C",
    tags: ["algorithms"],
    url: "https://github.com/brianbassey37/RSA-Factoring-Challenge"
  }
];

const SKILLS = [
  { name: "Python", icon: "🐍", cat: "Language" },
  { name: "SQL", icon: "🗄️", cat: "Data" },
  { name: "C", icon: "⚙️", cat: "Language" },
  { name: "JavaScript", icon: "🟨", cat: "Language" },
  { name: "Django", icon: "🎯", cat: "Framework" },
  { name: "Flask", icon: "🌶️", cat: "Framework" },
  { name: "Streamlit", icon: "📊", cat: "Data App" },
  { name: "Machine Learning", icon: "🤖", cat: "Data" },
  { name: "Pandas", icon: "🐼", cat: "Data" },
  { name: "Git &amp; GitHub", icon: "🔧", cat: "Tooling" },
  { name: "Unix / Shell", icon: "💻", cat: "Systems" },
  { name: "Data Structures", icon: "🧩", cat: "Fundamentals" }
];

// ---------- Render projects ----------
const grid = document.getElementById("projectsGrid");
grid.innerHTML = PROJECTS.map(p => `
  <article class="project-card" data-tags="${p.tags.join(' ')}">
    <div class="project-top">
      <span class="project-tag">${p.tags[0]}</span>
      <span class="project-lang"><span class="lang-dot" style="background:${langColor(p.lang)}"></span>${p.lang}</span>
    </div>
    <h3>${p.name}</h3>
    <p>${p.desc}</p>
    <div class="project-links">
      <a href="${p.url}" target="_blank" rel="noopener">view-source →</a>
    </div>
  </article>
`).join("");

// ---------- Render skills ----------
document.getElementById("skillsGrid").innerHTML = SKILLS.map(s => `
  <div class="skill-chip">
    <div class="icon">${s.icon}</div>
    <div class="name">${s.name}</div>
    <div class="cat">${s.cat}</div>
  </div>
`).join("");

// ---------- Terminal boot sequence ----------
const TERMINAL_SCRIPT = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "brian-bassey — data analyst / software engineer" },
  { type: "cmd", text: "cat role.txt" },
  { type: "out", text: "Turning raw data into decisions, and ideas into shipped code." },
  { type: "cmd", text: "git log -1 --format='%an builds %s'" },
  { type: "out", text: "brian builds things that don't break in prod." }
];

const termEl = document.getElementById("terminalBody");

function typeText(el, text, speed) {
  return new Promise(resolve => {
    let i = 0;
    (function tick() {
      el.textContent = text.slice(0, i);
      i++;
      if (i <= text.length) {
        setTimeout(tick, speed);
      } else {
        resolve();
      }
    })();
  });
}

async function runTerminal() {
  if (!termEl) return;
  for (const line of TERMINAL_SCRIPT) {
    const row = document.createElement("span");
    row.className = "t-line";
    termEl.appendChild(row);

    if (line.type === "cmd") {
      const prompt = document.createElement("span");
      prompt.className = "t-prompt";
      prompt.textContent = "brian@dev ";
      const path = document.createElement("span");
      path.className = "t-path";
      path.textContent = "~/portfolio $ ";
      const cmd = document.createElement("span");
      row.appendChild(prompt);
      row.appendChild(path);
      row.appendChild(cmd);
      await typeText(cmd, line.text, 38);
      await new Promise(r => setTimeout(r, 250));
    } else {
      row.classList.add("t-out");
      await typeText(row, line.text, 12);
      await new Promise(r => setTimeout(r, 350));
    }
  }
  const cursor = document.createElement("span");
  cursor.className = "term-cursor";
  termEl.appendChild(cursor);
}
runTerminal();

// ---------- Matrix rain background ----------
(function matrixRain() {
  const canvas = document.getElementById("matrixRain");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const glyphs = "01{}<>/;=[]()#$%_+-*.";
  let cols, drops, fontSize = 16;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / fontSize);
    drops = new Array(cols).fill(0).map(() => Math.random() * -100);
  }
  resize();
  window.addEventListener("resize", resize, { passive: true });

  function draw() {
    ctx.fillStyle = "rgba(6,10,15,0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#39ff88";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < cols; i++) {
      const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
      ctx.fillText(glyph, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(draw, 55);
})();

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ---------- Nav: scroll shadow + active link ----------
const navWrap = document.querySelector(".nav-wrap");
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  navWrap.classList.toggle("scrolled", window.scrollY > 20);

  let current = sections[0]?.id;
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}, { passive: true });

// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById("navToggle");
const navLinksList = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinksList.classList.toggle("open");
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", open);
});
navLinksList.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    navLinksList.classList.remove("open");
    navToggle.classList.remove("open");
  });
});

// ---------- Cursor glow ----------
const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", (e) => {
  glow.style.setProperty("--x", `${e.clientX}px`);
  glow.style.setProperty("--y", `${e.clientY}px`);
}, { passive: true });

// ---------- Graceful fallback for GitHub stat images (public stat APIs occasionally 503) ----------
document.querySelectorAll("#activityGrid .activity-card").forEach(img => {
  img.addEventListener("error", () => {
    img.classList.add("broken");
    img.nextElementSibling?.classList.add("show");
  }, { once: true });
});

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Console easter egg for visiting devs ----------
console.log(
  "%c> whoami\n%cbrian-bassey — data analyst & software engineer\n\n%c> curious enough to open devtools?\n%clet's talk: brianbassey37@gmail.com · github.com/brianbassey37",
  "color:#39ff88; font-family:monospace; font-size:13px;",
  "color:#e8f0ea; font-family:monospace; font-size:13px;",
  "color:#fbbf24; font-family:monospace; font-size:12px;",
  "color:#93a5ab; font-family:monospace; font-size:12px;"
);
