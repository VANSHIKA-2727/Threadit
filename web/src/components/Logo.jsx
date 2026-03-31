/**
 * Threadit wordmark: abstract T from a flowing stem + wave crossbar (threads / flow).
 * Stroke-only; no text. Stem uses currentColor; crossbar uses accent orange.
 */
export default function Logo({ className = "", size = 36, accent = "#e85d3f" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      focusable="false"
    >
      {/* Stem — smooth vertical flow */}
      <path
        d="M 20 34 C 20 27 20 22 20 16"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Crossbar — wave / thread */}
      <path
        d="M 8 16 Q 20 9 32 16"
        stroke={accent}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
