export default function FilterPattern() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <defs>
        <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        </pattern>
        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <rect width="80" height="80" fill="url(#smallGrid)" />
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      <path d="M400,100 L100,400 L400,700 L700,400 Z" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      <circle cx="400" cy="400" r="200" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2" />
      <path d="M200,200 L600,200 L600,600 L200,600 Z" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2" />
    </svg>
  )
}
