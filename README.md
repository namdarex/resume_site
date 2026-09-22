# Sadegh Hajizadeh — Personal Portfolio

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/EmailJS-8A2BE2?style=for-the-badge&logo=gmail&logoColor=white" alt="EmailJS" />
  <img src="https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white" alt="PWA" />
</p>

<p align="center">
  <strong>Bilingual (FA/EN) • Dark/Light • Glassmorphism • PWA • Zero Build Step</strong>
</p>

<p align="center">
  🔗 <strong><a href="https://namdarex.github.io/resume_site/">Live Demo</a></strong>
</p>

---

## Overview

A modern, fully responsive personal portfolio and resume website. Pure static **HTML / CSS / JavaScript** — no frameworks, no build tools, no backend. Open it and it just works.

Highlights include a bilingual Persian/English interface with RTL/LTR flipping, a dark/light theme, an animated aurora background with floating particles, glassmorphic cards with a mouse-following spotlight, a `Ctrl+K` command palette, and a smart contact form that delivers messages via both **EmailJS** and **Telegram**.

## Features

### Design & Experience

- 🌐 **Bilingual FA/EN** — one-click switching between Persian (RTL) and English (LTR), persisted in `localStorage`
- 🌗 **Dark & Light mode** — CSS-variable theming with smooth transitions, persisted in `localStorage`
- 🪟 **Glassmorphism** — frosted-glass cards, navbar, footer and form that blur the animated background
- 🔦 **Spotlight cards** — a soft glow follows the cursor across cards and buttons
- 🌌 **Animated background** — aurora gradients, drifting grid, floating particles and a film-grain overlay
- ⌨️ **Command palette (`Ctrl+K`)** — fuzzy action search: jump to sections, toggle theme/language, copy email
- 📊 **Scroll-driven UI** — top progress bar, scroll-filled experience timeline, reveal animations, animated skill bars and counters
- 🎠 **Tech marquee** — infinite scrolling strip of the stack

### Functionality

- 📧 **Smart contact form** — client-side validation, sends via EmailJS **and** opens a pre-filled Telegram chat, with toast feedback
- 📋 **Copy-email button** with one-click clipboard feedback
- 📲 **PWA** — installable on mobile/desktop with offline support (`manifest.webmanifest` + `sw.js`)
- 🔍 **SEO ready** — Open Graph / Twitter cards, canonical URL, theme-color and `Person` JSON-LD schema

### Engineering

- ⚡ **Zero dependencies at runtime** (except CDN fonts/icons and the EmailJS SDK)
- 🧩 **Modular vanilla JS** — small `init*` functions, IntersectionObserver instead of scroll listeners where it counts
- 📱 **Fully responsive** — mobile drawer menu, adaptive grids, touch-friendly targets
- ♿ **Reduced-motion support** — animations disabled when the OS requests it

## Project Structure

```text
resume_site
├── index.html            # Markup (FA default, EN toggle)
├── style.css             # Theme variables, glass, animations, responsive
├── main.js               # Language, theme, palette, form, effects
├── manifest.webmanifest  # PWA manifest
├── sw.js                 # Service worker (offline cache)
├── profile.jpg           # Avatar / OG image
├── favicon.png           # Favicon / PWA icon
└── 404.jpg               # Custom 404 artwork
```

## Getting Started

No build step. Pick one:

```bash
# 1. Clone
git clone https://github.com/namdarex/resume_site.git
cd resume_site

# 2a. Just open it
# → double-click index.html

# 2b. Or serve it (recommended — required for the service worker)
npx serve .
# or
python -m http.server 8000
```

> The service worker and PWA install prompt only work over `http(s)`, not `file://`.

## Configuration

### Contact form (EmailJS + Telegram)

At the top of `main.js`:

```js
const EMAILJS_CONFIG = {
  publicKey: 'YOUR_PUBLIC_KEY',
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  enabled: true
};
```

The Telegram deep link (`t.me/...`) is set in `main.js` and in the social links in `index.html` — replace it with your own username. For production, restrict the EmailJS public key to your domain in the EmailJS dashboard.

### Content & styling

| What | Where |
|---|---|
| Text (both languages) | `data-fa` / `data-en` attributes in `index.html` |
| Colors & glass | CSS custom properties at the top of `style.css` |
| New section | Add a `<section>`, a nav link, and the `reveal` class |
| PWA name/icons | `manifest.webmanifest` |

## Deployment (GitHub Pages)

1. Push to the `main` branch of your repo
2. **Settings → Pages → Deploy from a branch → `main` / `/ (root)`**
3. Your site goes live at `https://<username>.github.io/resume_site/`

## Browser Support

Evergreen Chrome, Edge, Firefox and Safari. `backdrop-filter` and `conic-gradient` gracefully degrade on older engines.

## Author

**Sadegh Hajizadeh** — Frontend Developer & UI Designer

- GitHub: [@namdarex](https://github.com/namdarex)
- Telegram: [@Namdarex](https://t.me/Namdarex)
