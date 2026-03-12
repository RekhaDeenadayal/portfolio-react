# Rekha Deenadayal — Portfolio

A personal portfolio website built with React and Three.js, featuring WebGL 3D backgrounds, scroll-driven animations, smooth scroll, and interactive sections.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React (JSX) | UI components |
| Three.js | WebGL 3D background + 3D flythrough |
| Lenis | Smooth scroll |
| Vite | Build tool |

---

## Features

- **Intro animation** — typewriter effect → gold sweep line → curtain lift
- **3D WebGL background** — low-poly icosahedrons with scroll rotation and mouse parallax
- **Multi-layer parallax Hero** — 3 depth layers responding to scroll
- **Sticky horizontal Projects carousel** — scroll-driven, progress dots
- **Sticky Skills section** — scroll through 6 categories with magnetic skill tags (3D tilt + cursor glow)
- **Interests flythrough** — click Continue to trigger a warp-speed Three.js camera flythrough with portal rings, speed streaks, and dynamic FOV
- **3D Reveal animations** — `rotateX` perspective entrance on scroll
- **Dark / Light theme** toggle
- **Custom cursor** — mix-blend-mode difference
- **Scroll progress bar** — 2px gold bar at the top

---

## Project Structure

```
src/
  constants/
    themes.js           # DARK / LIGHT theme objects + Google Fonts injection
    data.js             # PROJECTS, EXPERIENCE, SKILLS, COFFEE_IMGS
  components/
    GrainOverlay.jsx    # SVG grain texture overlay
    ThreeBackground.jsx # WebGL low-poly 3D scene (Three.js)
    Cursor.jsx          # Custom cursor with blend mode
    Intro.jsx           # Loading screen animation
    FitText.jsx         # Typography that fills container width
    Reveal.jsx          # 3D scroll-entrance wrapper
    ScrollProgress.jsx  # Fixed gold progress bar
    Nav.jsx             # Sticky nav with active underline
    Hero.jsx            # Parallax landing section
    Projects.jsx        # Sticky horizontal scroll carousel
    Experience.jsx      # Timeline / work history
    Skills.jsx          # Sticky scroll + magnetic cards
    Interests.jsx       # Ask → 3D flythrough → reveal
    Contact.jsx         # Links with hover rows
    Footer.jsx          # Bottom bar
  Portfolio.jsx         # Root App component
  main.jsx              # Entry point
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## Design Tokens

Fonts: **Cormorant Garamond** (serif, headings) + **DM Sans** (sans-serif, body)

Accent color: `#c9a96e` (gold)

Both dark and light themes are defined in `src/constants/themes.js`.

---

## Deployment

The `dist/` folder produced by `npm run build` can be deployed to any static host (Vercel, Netlify, GitHub Pages).
