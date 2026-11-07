import { asset } from './primitives';

// Mark is the original hexagon logo, recoloured to the brand green (#00FF85).
const MARK_RATIO = 210 / 256;

export function Logo({ size = 36, wordmark = true, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src={asset('/brand/auracode-mark.webp')}
        alt=""
        width={Math.round(size * MARK_RATIO)}
        height={size}
        className="logo-mark"
        decoding="async"
      />
      {wordmark && (
        <span className="logo-word">
          Aura<span className="text-volt">Code</span>
        </span>
      )}
    </span>
  );
}
