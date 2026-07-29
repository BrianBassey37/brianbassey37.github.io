// ---------- Data: projects pulled from github.com/brianbassey37 ----------
const PROJECTS = [
  {
    name: "glucose_predictor_app",
    desc: "Machine learning app that predicts blood glucose levels from patient data, served through an interactive Streamlit interface.",
    lang: "Python",
    tags: ["data"],
    url: "https://github.com/brianbassey37/glucose_predictor_app"
  },
  {
    name: "SkyLearn",
    desc: "Lightweight learning management system built on the Django web framework.",
    lang: "Python / Django",
    tags: ["web"],
    url: "https://github.com/brianbassey37/SkyLearn"
  },
  {
    name: "AirBnB_clone_v3",
    desc: "Full RESTful API layer for an AirBnB clone, built with Flask and a custom storage engine.",
    lang: "Python / Flask",
    tags: ["web"],
    url: "https://github.com/brianbassey37/AirBnB_clone_v3"
  },
  {
    name: "AirBnB_clone",
    desc: "Console-driven AirBnB clone covering object-relational mapping, file storage, and core OOP design.",
    lang: "Python",
    tags: ["web"],
    url: "https://github.com/brianbassey37/AirBnB_clone"
  },
  {
    name: "simple_shell",
    desc: "A custom UNIX command-line shell written from scratch in C, handling built-ins, piping, and process control.",
    lang: "C",
    tags: ["systems"],
    url: "https://github.com/brianbassey37/simple_shell"
  },
  {
    name: "monty",
    desc: "A Monty bytecode interpreter implementing stack and queue-based instruction execution.",
    lang: "C",
    tags: ["systems"],
    url: "https://github.com/brianbassey37/monty"
  },
  {
    name: "binary_trees",
    desc: "Binary tree data structures and traversal algorithms implemented from first principles.",
    lang: "C",
    tags: ["algorithms"],
    url: "https://github.com/brianbassey37/binary_trees"
  },
  {
    name: "sorting_algorithms",
    desc: "Classic sorting algorithms implemented in C with a focus on Big O time and space complexity.",
    lang: "C",
    tags: ["algorithms"],
    url: "https://github.com/brianbassey37/sorting_algorithms"
  },
  {
    name: "RSA-Factoring-Challenge",
    desc: "A cryptography-focused challenge exploring RSA key factoring using Python and C.",
    lang: "Python / C",
    tags: ["algorithms"],
    url: "https://github.com/brianbassey37/RSA-Factoring-Challenge"
  },
  {
    name: "Fix_My_Code_Challenge",
    desc: "Debugging challenge fixing broken code across multiple languages — C, Python, and JavaScript.",
    lang: "JavaScript / C / Python",
    tags: ["algorithms"],
    url: "https://github.com/brianbassey37/Fix_My_Code_Challenge"
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

const ROLES = ["Data Analyst", "Software Engineer", "ML Enthusiast", "Problem Solver"];

// ---------- Render projects ----------
const grid = document.getElementById("projectsGrid");
grid.innerHTML = PROJECTS.map(p => `
  <article class="project-card" data-tags="${p.tags.join(' ')}">
    <div class="project-top">
      <span class="project-tag">${p.tags[0]}</span>
      <span class="project-lang"><span class="lang-dot"></span>${p.lang}</span>
    </div>
    <h3>${p.name}</h3>
    <p>${p.desc}</p>
    <div class="project-links">
      <a href="${p.url}" target="_blank" rel="noopener">View on GitHub →</a>
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

// ---------- Project filtering ----------
const filterBtns = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".project-card");
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      const tags = card.dataset.tags.split(" ");
      card.classList.toggle("hidden", filter !== "all" && !tags.includes(filter));
    });
  });
});

// ---------- Typing effect ----------
const typedEl = document.getElementById("typedRole");
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = ROLES[roleIndex];
  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % ROLES.length;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 85);
}
typeLoop();

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

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
