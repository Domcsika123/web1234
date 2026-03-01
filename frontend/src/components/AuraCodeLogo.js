export const AuraCodeLogo = ({ className = "w-10 h-10", glowEffect = false }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      style={glowEffect ? { filter: 'drop-shadow(0 0 10px rgba(0,255,0,0.6))' } : {}}
    >
      {/* Hexagon outline */}
      <polygon
        points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5"
        fill="none"
        stroke="#00FF00"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      
      {/* Left bracket < */}
      <path
        d="M 38 32 L 22 50 L 38 68"
        fill="none"
        stroke="#00FF00"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Right bracket > */}
      <path
        d="M 62 32 L 78 50 L 62 68"
        fill="none"
        stroke="#00FF00"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Forward slash / */}
      <path
        d="M 58 32 L 42 68"
        fill="none"
        stroke="#00FF00"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
};
