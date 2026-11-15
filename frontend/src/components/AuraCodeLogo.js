// AuraCode brand assets — the actual supplied artwork, used as-is (no redraw).
// Lockup = hexagon mark + "AuraCode" wordmark together, cropped from the
// "Auracode ocean korall feliratos logo.png" source (teal bg blends into
// theme-dark sections, so it's used in the navbar and footer).
export const AuraCodeLockup = ({ className = 'h-10 w-auto' }) => (
  <img
    src={`${process.env.PUBLIC_URL}/brand/auracode-wordmark.png`}
    alt="AuraCode"
    className={className}
    style={{ objectFit: 'contain', width: 'auto' }}
  />
);

// Mark-only icon (no text), cropped from "Auracode ocean korall felirat nelkuli logo.png".
export const AuraCodeMark = ({ className = 'h-10 w-auto' }) => (
  <img
    src={`${process.env.PUBLIC_URL}/brand/auracode-icon.png`}
    alt="AuraCode"
    className={className}
    style={{ objectFit: 'contain', width: 'auto' }}
  />
);
