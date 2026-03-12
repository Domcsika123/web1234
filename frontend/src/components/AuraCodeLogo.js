export const AuraCodeLogo = ({ className = "w-10 h-10", glowEffect = false }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={glowEffect ? { filter: 'drop-shadow(0 0 10px rgba(0,255,0,0.6))' } : {}}
    >
      <defs>
        <filter id="aura-neon" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#aura-neon)">
        {/* Hexagon outline */}
        <polygon
          points="50,6 84,25.5 84,64.5 50,84 16,64.5 16,25.5"
          fill="none"
          stroke="#00FF38"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />

        {/* Left bracket < */}
        <path
          d="M 41 35 L 29 45 L 41 55"
          fill="none"
          stroke="#00FF38"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right bracket > */}
        <path
          d="M 59 35 L 71 45 L 59 55"
          fill="none"
          stroke="#00FF38"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Slash / */}
        <path
          d="M 54 30 L 46 60"
          fill="none"
          stroke="#00FF38"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};
