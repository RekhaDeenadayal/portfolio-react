// ── FONTS ─────────────────────────────────────────────────────────────────────
export const FONTS = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap";

if (!document.getElementById("rd-fonts")) {
  const l = document.createElement("link");
  l.id = "rd-fonts"; l.rel = "stylesheet";
  l.href = FONTS;
  document.head.appendChild(l);
}

// ── THEME — dark warm brown, off-white text, beige accent ────────────────────
export const THEME = {
  bg:"#1A1410", bg1:"#241C14",
  fg:"#FAF6EE", fgMid:"rgba(250,246,238,.60)", fgDim:"rgba(250,246,238,.30)",
  border:"rgba(242,232,213,.09)", borderMid:"rgba(242,232,213,.15)",
  accent:"#C9A87A", accentMid:"rgba(201,168,122,.09)", accentDim:"rgba(201,168,122,.05)",
  navBg:"rgba(26,20,16,.96)",
  accentHover:"#B8935F",
};

// aliases kept for any remaining imports
export const WARM = THEME;
export const FOREST = THEME;
export const LIGHT = THEME;
export const DARK = THEME;
