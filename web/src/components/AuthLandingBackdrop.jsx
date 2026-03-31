import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

/**
 * Visual continuity with the landing page: gradient, blobs, soft grid.
 * Intended behind auth forms + dark overlay.
 */
export default function AuthLandingBackdrop() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b0f19] via-[#0f172a] to-[#020617]" />
      <div className="absolute -left-[20%] top-[-10%] h-[min(520px,50vh)] w-[min(520px,90vw)] rounded-full bg-[#1e293b]/40 opacity-70 blur-[100px]" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[min(480px,45vh)] w-[min(480px,85vw)] rounded-full bg-[#e85d3f]/[0.07] opacity-90 blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-15%,rgba(255,255,255,0.05),transparent_52%)]" />
      <motion.div
        className="absolute h-[140%] w-[140%] -left-[20%] -top-[20%]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)",
          backgroundSize: "40px 40px",
        }}
        animate={reduced ? undefined : { x: [0, 40], y: [0, 40] }}
        transition={
          reduced
            ? undefined
            : {
                duration: 72,
                repeat: Infinity,
                ease: "linear",
              }
        }
      />
    </div>
  );
}
