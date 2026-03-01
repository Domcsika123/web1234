export const AuraCodeLogo = ({ className = "w-10 h-10", glowEffect = false }) => {
  return (
    <svg 
      viewBox="0 0 100 115" 
      className={className}
      style={glowEffect ? { filter: 'drop-shadow(0 0 10px rgba(0,255,0,0.6))' } : {}}
    >
      {/* Hexagon outline - taller/vertical orientation */}
      <polygon
        points="50,3 95,28 95,87 50,112 5,87 5,28"
        fill="none"
        stroke="#00FF00"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      
      {/* Left bracket < */}
      <path
        d="M 40 40 L 22 57.5 L 40 75"
        fill="none"
        stroke="#00FF00"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Right bracket > */}
      <path
        d="M 60 40 L 78 57.5 L 60 75"
        fill="none"
        stroke="#00FF00"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Forward slash / in the middle */}
      <path
        d="M 56 30 L 44 85"
        fill="none"
        stroke="#00FF00"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
};
