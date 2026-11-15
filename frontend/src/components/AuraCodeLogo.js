// Single-colour brand mark: `on-dark` (text-on-dark) for primary sections,
// `on-light` (primary) for light sections. No glow, per the brand rules.
export const AuraCodeLogo = ({ className = "h-10 w-10", variant = "on-dark" }) => {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/brand/auracode-mark-${variant}.png`}
      alt="AuraCode logo"
      className={className}
      style={{ objectFit: 'contain', width: 'auto' }}
    />
  );
};
