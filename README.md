# brianbassey37.github.io

Personal portfolio site for **Brian Bassey** — Data Analyst & Software Engineer based in Lagos, Nigeria.

**Live:** [brianbassey37.github.io](https://brianbassey37.github.io/)

A terminal/hacker-styled single-page portfolio: dark theme, monospace type, a boot-sequence terminal window, a matrix-rain background, live GitHub stats pulled straight from the GitHub API, and a git-log-styled career timeline.

## Features

- **Live terminal boot sequence** — hero types out `whoami` / `cat role.txt` / `git log` on load
- **Matrix rain + scanline background** — canvas-rendered, low-opacity, theme-consistent
- **Live GitHub Activity** — real contribution count, streak, and contribution graph via the GitHub stats APIs (not screenshots), with graceful fallback if a stat provider is briefly unavailable
- **Featured projects** — recent production work (healthcare, education, institutional systems, public-health data), each tagged by domain with GitHub's actual language colors; private repos are marked `🔒 private repo` with either a live site link or a pre-filled "ask me about it" email link
- **Git-log-styled journey section** — career history rendered as commit history
- **Fully responsive** — mobile nav, fluid type, single-column fallback layouts
- **No build step, no framework** — plain HTML/CSS/JS, deployable as static files

## Tech stack

| Layer     | Tech                                             |
|-----------|---------------------------------------------------|
| Markup    | Semantic HTML5                                    |
| Styling   | Plain CSS (custom properties, grid/flexbox, no framework) |
| Behavior  | Vanilla JavaScript (no build tools, no dependencies) |
| Fonts     | [JetBrains Mono](https://www.jetbrains.com/lp/mono/), [Inter](https://rsms.me/inter/) via Google Fonts |
| Hosting   | [GitHub Pages](https://pages.github.com/)          |
| Live data | [github-readme-stats](https://github.com/anuraghazra/github-readme-stats), [github-readme-streak-stats](https://github.com/DenverCoder1/github-readme-streak-stats), [ghchart](https://github.com/2016rshah/githubchart-api) |

## Project structure

```
.
├── index.html          # All page markup/sections
├── assets/
│   ├── style.css        # Design tokens, layout, components, animations
│   └── script.js        # Project/skill data, rendering, terminal + matrix-rain effects
└── README.md
```

## Running locally

No build step — just serve the directory:

```bash
git clone https://github.com/brianbassey37/brianbassey37.github.io.git
cd brianbassey37.github.io
python -m http.server 8000
# open http://localhost:8000
```

## Deployment

Pushes to `main` deploy automatically via GitHub Pages (source: `main` / root).

## Contact

- GitHub: [@brianbassey37](https://github.com/brianbassey37)
- Email: [brianbassey37@gmail.com](mailto:brianbassey37@gmail.com)
- Location: Lagos, Nigeria
