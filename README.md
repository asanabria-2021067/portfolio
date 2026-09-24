# Angel Sanabria — Developer Portfolio

Personal portfolio for Angel Sanabria, VMware Engineer (VKS) & Full Stack Developer and Computer Science student at Universidad del Valle de Guatemala (UVG). Built with an IDE-inspired aesthetic: dark glassmorphism panels, a file-tree sidebar, and real-time data from the GitHub API.

**Live:** https://portfolio-taupe-eight-ne7xtliknm.vercel.app

---

## Features

- **VS Code–style workbench** — full-screen title bar with menus and command center, activity bar, resizable side bar, editor tabs, status bar and an empty-editor watermark
- **Explorer** — file tree with VS Code file icons (Iconify API); `.tsx` files open pages as tabs, PDFs and images open as editor tabs in a built-in viewer (pdf.js), source files open on GitHub, `README.md` / `package.json` print in the terminal
- **Search** — full-text search across every page (indexes the server-rendered HTML plus GitHub projects) with in-page highlighting, or search by file name
- **Source Control** — live GitHub contribution graph, streaks and most active public repos (GraphQL API), plus a "commit" box that emails Angel
- **Extensions** — installable extensions that change the workspace (saved in `localStorage`): Pixel Pets (up to 4: blob, cat, ghost, chick), Daylight / Aurora / Dusk Rose themes, Zen Mode, Minimap, Sparkle Cursor, Let It Snow, Confetti, Reading Time and Local Clock
- **Command palette & terminal** — `Ctrl+P` / `Ctrl+Shift+P` and an integrated terminal (`Ctrl+\``) with `help`, `ls`, `cat`, `contact`, `theme`, `ext install …`, `pet add cat`, `hire`
- **EN / ES i18n** — full bilingual support via a context-based locale provider; no external i18n library
- **GitHub API integration** — server-side proxy route fetches repos, commit counts, stars, forks, and language tags with pagination and rate-limit handling
- **PDF viewer modal** — CV opens in an in-page modal without leaving the portfolio
- **GSAP animations** — entrance, hover, and scroll-triggered motion on all Bento cards
- **Mobile responsive** — the activity bar becomes a bottom tab bar and the side bar opens as a drawer

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS + custom CSS variables |
| Animations | Framer Motion, GSAP |
| Icons | Iconify API (vscode-icons, logos, fluent-emoji) |
| PDF viewer | pdf.js (`pdfjs-dist`, worker served from `public/pdfjs`) |
| API proxy | Next.js Route Handlers (server-side) |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm, yarn, or pnpm

### Installation

```bash
git clone https://github.com/asanabria-2021067/my-portfolio.git
cd my-portfolio
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
GITHUB_TOKEN=your_personal_access_token
```

**How to generate a GitHub Personal Access Token (PAT):**

1. Go to **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. Click **Generate new token (classic)**
3. Set a descriptive name, e.g. `portfolio-api-read`
4. Select scopes: `read:user` and `repo` (private repos are only counted, never listed)
5. Click **Generate token** and copy the value immediately

Without a token the app still runs, but GitHub's unauthenticated rate limit (60 req/hr) may cause API calls to fail under repeated reloads.

### Run Locally

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── activity/           # Full GitHub contribution graph
│   ├── api/                # Route Handlers — GitHub projects + contributions proxy with caching
│   ├── certifications/     # Certifications & diplomas page
│   ├── contact/            # Contact bento page
│   ├── projects/           # Repository grid with GitHub data
│   ├── stack/              # Tech stack breakdown
│   ├── globals.css         # Design tokens (colors, radius, spacing)
│   ├── workbench.css       # VS Code–style shell, themes and panels
│   ├── layout.tsx          # Root layout, metadata, font loading
│   └── page.tsx            # Home — Bento grid entry point
├── components/             # Shared React components
│   ├── BentoCard.tsx       # Card container with GSAP hover effects
│   ├── workbench/          # IDE shell: activity bar, views, tabs, terminal, palette, extensions
│   ├── FeaturedProject.tsx # UVGenius highlight card
│   ├── Hero.tsx            # Name, title, and metadata strip
│   └── PreferencesProvider.tsx  # Locale and theme context
├── lib/
│   ├── contributions.ts    # GitHub GraphQL contribution calendar + stats
│   ├── github.ts           # GitHub fetch utilities and local overrides
│   └── workspace.ts        # Virtual file tree shown in the explorer
└── public/
    └── assets/             # Static images, CV PDF, logo SVG
```

---

## Deployment

The portfolio is deployed on **Vercel** with automatic deploys on push to `main`. No build configuration is required beyond adding `GITHUB_TOKEN` to the Vercel project's environment variables.

Live URL: https://portfolio-taupe-eight-ne7xtliknm.vercel.app

---

## License

MIT
