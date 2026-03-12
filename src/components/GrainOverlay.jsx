export default function GrainOverlay() {
  return (
    <div style={{
      position:"fixed", inset:0, zIndex:1, pointerEvents:"none",
      backgroundImage:`url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='300' height='300' filter='url(%23n)' opacity='0.04'/></svg>")`,
      opacity:0.5,
    }}/>
  );
}
