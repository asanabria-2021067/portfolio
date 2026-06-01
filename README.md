# Angel Sanabria — Developer Portfolio

Personal portfolio for Angel Sanabria, VMware Engineer Jr. & Full Stack Developer and Computer Science student at Universidad del Valle de Guatemala (UVG). Built with an IDE-inspired aesthetic: dark glassmorphism panels, a file-tree sidebar, and real-time data from the GitHub API.

**Live:** https://portfolio-taupe-eight-ne7xtliknm.vercel.app

---

## Features

- **Dark / Light mode** — system-aware with manual toggle
- **EN / ES i18n** — full bilingual support via a context-based locale provider; no external i18n library
- **IDE-style file tree navigation** — sidebar that mirrors VS Code's explorer panel
- **GitHub API integration** — server-side proxy route fetches repos, commit counts, stars, forks, and language tags with pagination and rate-limit handling
- **PDF viewer modal** — CV opens in an in-page modal without leaving the portfolio
- **GSAP animations** — entrance, hover, and scroll-triggered motion on all Bento cards
- **Mobile responsive** — bottom navigation bar replaces the sidebar on small screens, with a popover "More" menu for secondary routes

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS + custom CSS variables |
| Animations | Framer Motion, GSAP |
| Icons | Lucide React, Simple Icons CDN |
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
4. Select scopes: `read:user` and `public_repo`
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
│   ├── api/                # Route Handlers — GitHub API proxy with caching
│   ├── certifications/     # Certifications & diplomas page
│   ├── contact/            # Contact bento page
│   ├── projects/           # Repository grid with GitHub data
│   ├── stack/              # Tech stack breakdown
│   ├── globals.css         # Design tokens (colors, radius, spacing)
│   ├── layout.tsx          # Root layout, metadata, font loading
│   └── page.tsx            # Home — Bento grid entry point
├── components/             # Shared React components
│   ├── BentoCard.tsx       # Card container with GSAP hover effects
│   ├── FileTreeNav.tsx     # IDE-style sidebar navigation
│   ├── BottomNav.tsx       # Mobile bottom bar with popover
│   ├── FeaturedProject.tsx # UVGenius highlight card
│   ├── Hero.tsx            # Name, title, and metadata strip
│   └── PreferencesProvider.tsx  # Locale and theme context
├── lib/
│   └── github.ts           # GitHub fetch utilities and local overrides
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
