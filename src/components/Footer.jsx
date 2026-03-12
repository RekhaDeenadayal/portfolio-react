export default function Footer({ T }) {
  return (
    <footer style={{
      borderTop:`1px solid ${T.border}`, padding:"22px 48px",
      display:"flex", justifyContent:"space-between", alignItems:"center",
    }}>
      <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:300, color:T.fgDim, letterSpacing:"0.04em" }}>
        © 2025 Bhagya Rekha Deenadayal
      </span>
      <a href="https://github.com/RekhaDeenadayal" target="_blank" rel="noreferrer" style={{
        fontFamily:"'Cormorant Garamond',serif", fontSize:13, fontStyle:"italic",
        color:T.fgDim, textDecoration:"none", transition:"color .2s",
      }}
      onMouseEnter={e => e.target.style.color=T.accent}
      onMouseLeave={e => e.target.style.color=T.fgDim}
      >github.com/RekhaDeenadayal</a>
    </footer>
  );
}
