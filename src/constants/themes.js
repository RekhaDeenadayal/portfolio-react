// ── FONTS ─────────────────────────────────────────────────────────────────────
export const FONTS = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap";

if (!document.getElementById("rd-fonts")) {
  const l = document.createElement("link");
  l.id = "rd-fonts"; l.rel = "stylesheet";
  l.href = FONTS;
  document.head.appendChild(l);
}

// ── THEMES ────────────────────────────────────────────────────────────────────
export const DARK = {
  bg:"#0C0B09", bg1:"#141210",
  fg:"#EDE9E0", fgMid:"rgba(237,233,224,.45)", fgDim:"rgba(237,233,224,.18)",
  border:"rgba(237,233,224,.07)", borderMid:"rgba(237,233,224,.13)",
  accent:"#C49A3C", accentMid:"rgba(196,154,60,.08)", accentDim:"rgba(196,154,60,.05)",
  navBg:"rgba(12,11,9,.95)",
};

export const LIGHT = {
  bg:"#F9F6F0", bg1:"#F0EBE2",
  fg:"#100F0C", fgMid:"rgba(16,15,12,.45)", fgDim:"rgba(16,15,12,.18)",
  border:"rgba(16,15,12,.07)", borderMid:"rgba(16,15,12,.13)",
  accent:"#8B6014", accentMid:"rgba(139,96,20,.08)", accentDim:"rgba(139,96,20,.05)",
  navBg:"rgba(249,246,240,.95)",
};
