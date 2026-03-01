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
        d="M 45 35 L 30 50 L 45 65"
        fill="none"
        stroke="#00FF00"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Right bracket > */}
      <path
        d="M 55 35 L 70 50 L 55 65"
        fill="none"
        stroke="#00FF00"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Forward slash / */}
      <path
        d="M 55 35 L 45 65"
        fill="none"
        stroke="#00FF00"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
};
