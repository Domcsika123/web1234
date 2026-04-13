export const AuraCodeLogo = ({ className = "h-10 w-10", glowEffect = false }) => {
  return (
    <img
      src={process.env.PUBLIC_URL + "/AuraCode_logo_elenkebb_hatter_nelkuli.png"}
      alt="AuraCode logo"
      className={className}
      style={{
        objectFit: 'contain',
        width: 'auto',
        ...(glowEffect ? { filter: 'drop-shadow(0 0 10px rgba(0,255,0,0.6))' } : {}),
      }}
    />
  );
};
