import { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import {
  HeroFloatingCluster,
  ConversationPreviewDemo,
  CommunityGridDemo,
  InteractionClusterDemo,
  ProductShowcaseFrame,
  FeatureRow,
  FeatureThreadListMock,
  FeatureCommunitiesStripMock,
  FeatureInboxMock,
  GlowBlob,
} from "../components/landing/LandingVisuals";

const heroEase = [0.22, 1, 0.36, 1];

const heroTransition = { duration: 0.55, ease: heroEase };

const sectionStaggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.06 },
  },
};

const sectionStaggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: heroEase },
  },
};

const primaryBtnHover = {
  scale: 1.05,
  boxShadow: "0 0 36px rgba(232,93,63,0.35)",
  transition: { duration: 0.3, ease: heroEase },
};

const ghostBtnHover = {
  scale: 1.05,
  boxShadow: "0 0 24px rgba(255,255,255,0.08)",
  transition: { duration: 0.3, ease: heroEase },
};

const glassCardHover = {
  y: -5,
  scale: 1.03,
  boxShadow:
    "0 0 0 1px rgba(255,255,255,0.1), 0 20px 48px -12px rgba(0,0,0,0.45), 0 0 48px rgba(232,93,63,0.12)",
  transition: { duration: 0.3, ease: heroEase },
};

function AnimatedGridBackground({ reduced }) {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(ellipse_85%_55%_at_50%_-15%,rgba(255,255,255,0.05),transparent_52%)]"
        aria-hidden
      />
      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
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
    </>
  );
}

function CursorGlow({ reduced }) {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  const onMove = useCallback((e) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    if (reduced) return;
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [onMove, reduced]);

  if (reduced) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[2] overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e85d3f]/[0.06] blur-[100px] will-change-transform"
        style={{ left: pos.x, top: pos.y }}
      />
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  const heroTextY = useTransform(scrollY, (v) => {
    if (reduced) return 0;
    const t = Math.min(1, Math.max(0, v / 480));
    return t * 32;
  });

  const heroCardsY = useTransform(scrollY, (v) => {
    if (reduced) return 0;
    const t = Math.min(1, Math.max(0, v / 480));
    return t * 68;
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-br from-[#0b0f19] via-[#0f172a] to-[#020617] text-white transition-all duration-300 ease-out">
      <AnimatedGridBackground reduced={reduced} />
      <CursorGlow reduced={reduced} />

      <div
        className="pointer-events-none absolute -left-[20%] top-[-10%] z-0 h-[min(520px,50vh)] w-[min(520px,90vw)] rounded-full bg-[#1e293b]/40 opacity-70 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[-20%] right-[-10%] z-0 h-[min(480px,45vh)] w-[min(480px,85vw)] rounded-full bg-[#e85d3f]/[0.07] opacity-90 blur-[120px]"
        aria-hidden
      />

      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: heroEase }}
        className={`sticky top-0 z-50 mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 transition-all duration-300 ease-out md:px-6 md:py-8 ${
          scrolled
            ? "border-b border-white/10 bg-[#0b0f19]/55 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0b0f19]/40"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.05, rotate: -2 }}
            transition={{ duration: 0.28, ease: heroEase }}
            className="inline-flex"
          >
            <Logo size={36} className="text-white" />
          </motion.div>
          <span className="text-lg font-semibold tracking-[0.02em] text-white">Threadit</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.button
            type="button"
            onClick={() => navigate("/login")}
            whileHover={ghostBtnHover}
            whileTap={{ scale: 0.98 }}
            className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-all duration-300 ease-out hover:text-white sm:px-4"
          >
            Log in
          </motion.button>
          <motion.button
            type="button"
            onClick={() => navigate("/register")}
            whileHover={ghostBtnHover}
            whileTap={{ scale: 0.98 }}
            className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 ease-out hover:bg-white/10 sm:px-4"
          >
            Register
          </motion.button>
        </div>
      </motion.nav>

      <main className="relative z-10 flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pb-20 pt-6 md:px-6 md:pb-24 md:pt-10">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <motion.div style={{ y: heroTextY }} className="will-change-transform">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={heroTransition}
                className="text-center lg:text-left"
              >
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl dark:text-white">
                  The calmer home for community discussion
                </h1>
                <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg lg:mx-0 md:mt-8">
                  Threadit is a light, editorial space for threads and replies—built for focus, not feeds that shout.
                </p>
                <div className="mt-9 md:mt-10">
                  <motion.button
                    type="button"
                    onClick={() => navigate("/register")}
                    whileHover={primaryBtnHover}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center rounded-xl bg-[#e85d3f] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_rgba(232,93,63,0.15)] transition-all duration-300 ease-out hover:bg-[#d14f34]"
                  >
                    Get started
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
            <HeroFloatingCluster parallaxY={heroCardsY} reducedMotion={reduced} />
          </div>
        </section>

        {/* Feature visuals */}
        <div className="mx-auto max-w-6xl space-y-20 px-4 pb-24 md:space-y-28 md:px-6 md:pb-32">
          <FeatureRow
            title="Threads that stay readable"
            body="Vote, reply, and nest comments without losing context—built for long-form discussion, not endless scrolling."
            reverse={false}
          >
            <FeatureThreadListMock />
          </FeatureRow>

          <FeatureRow
            title="Communities you can browse calmly"
            body="Explore spaces by interest, see member counts, and join when it feels right—no noisy defaults."
            reverse
          >
            <FeatureCommunitiesStripMock />
          </FeatureRow>

          <FeatureRow
            title="Signals that respect your attention"
            body="Mentions, digests, and quiet inbox—so you stay informed without turning every ping into a fire drill."
            reverse={false}
          >
            <FeatureInboxMock />
          </FeatureRow>
        </div>

        {/* Conversation preview */}
        <div className="relative mx-auto max-w-6xl px-4 pb-24 md:px-6 md:pb-32">
          <GlowBlob className="left-1/2 top-0 h-56 w-[min(100%,420px)] -translate-x-1/2 bg-[#e85d3f]/12" />
          <motion.section
            variants={sectionStaggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            <motion.div variants={sectionStaggerItem} className="text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Conversation, structured</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-400 sm:text-base">
                Nested replies read like the product—clear hierarchy, real names, and room for nuance.
              </p>
            </motion.div>
            <motion.div variants={sectionStaggerItem} className="mx-auto mt-12 max-w-2xl">
              <motion.div whileHover={glassCardHover} className="relative">
                <ConversationPreviewDemo />
              </motion.div>
            </motion.div>
          </motion.section>
        </div>

        {/* Community grid */}
        <div className="relative mx-auto max-w-6xl px-4 pb-24 md:px-6 md:pb-32">
          <GlowBlob className="right-0 top-1/2 h-64 w-64 -translate-y-1/2 bg-indigo-500/10" />
          <motion.section
            variants={sectionStaggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            <motion.div variants={sectionStaggerItem} className="text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Explore spaces</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400 sm:text-base">
                A calm grid of communities—highlighted picks feel editorial, not algorithmic.
              </p>
            </motion.div>
            <motion.div variants={sectionStaggerItem} className="mx-auto mt-12 flex justify-center">
              <CommunityGridDemo />
            </motion.div>
          </motion.section>
        </div>

        {/* Interaction cluster */}
        <div className="relative mx-auto max-w-6xl px-4 pb-24 md:px-6 md:pb-32">
          <GlowBlob className="left-0 top-0 h-48 w-48 bg-violet-500/10" />
          <motion.section
            variants={sectionStaggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            <motion.div variants={sectionStaggerItem} className="text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Create, chat, stay in the loop</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400 sm:text-base">
                Compose posts, slide into quick chats, and scan notifications—layered like the real app.
              </p>
            </motion.div>
            <motion.div variants={sectionStaggerItem} className="mx-auto mt-8 max-w-lg">
              <InteractionClusterDemo />
            </motion.div>
          </motion.section>
        </div>

        {/* Full product showcase */}
        <div className="relative mx-auto max-w-6xl px-4 pb-28 md:px-6 md:pb-36">
          <motion.section
            variants={sectionStaggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            <motion.div variants={sectionStaggerItem} className="text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">The full experience</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400 sm:text-base">
                A focused shell—navigation, feed, and hierarchy—without leaving the landing page.
              </p>
            </motion.div>
            <motion.div variants={sectionStaggerItem} className="relative mx-auto mt-12">
              <GlowBlob className="left-1/2 top-1/2 h-[min(100%,360px)] w-[min(100%,520px)] -translate-x-1/2 -translate-y-1/2 bg-[#e85d3f]/10" />
              <motion.div whileHover={glassCardHover} className="relative">
                <ProductShowcaseFrame />
              </motion.div>
            </motion.div>
            <motion.div variants={sectionStaggerItem} className="mt-14 text-center">
              <motion.button
                type="button"
                onClick={() => navigate("/register")}
                whileHover={primaryBtnHover}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center rounded-xl bg-[#e85d3f] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_rgba(232,93,63,0.15)] transition-all duration-300 ease-out hover:bg-[#d14f34]"
              >
                Get started
              </motion.button>
            </motion.div>
          </motion.section>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/10 py-10 transition-all duration-300 ease-out md:py-12">
        <p className="text-center text-sm text-zinc-500">© {year} Threadit. All rights reserved.</p>
      </footer>
    </div>
  );
}
