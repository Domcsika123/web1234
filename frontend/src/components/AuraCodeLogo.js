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
      
      {/* Left bracket < (two lines) */}
      <path
        d="M 35 40 L 20 57.5 L 35 75"
        fill="none"
        stroke="#00FF00"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 45 40 L 30 57.5 L 45 75"
        fill="none"
        stroke="#00FF00"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Right bracket > (two lines) */}
      <path
        d="M 65 40 L 80 57.5 L 65 75"
        fill="none"
        stroke="#00FF00"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 55 40 L 70 57.5 L 55 75"
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
