import { motion, useReducedMotion } from "framer-motion";
import { Bell, MessageCircle } from "lucide-react";
import { HiSparkles } from "react-icons/hi2";

const landingEase = [0.22, 1, 0.36, 1];

const glassBase =
  "rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_40px_rgba(232,93,63,0.1)] backdrop-blur-lg transition-all duration-300 ease-out";

const landingStaggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.06 },
  },
};

const landingStaggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: landingEase },
  },
};

const cardHover = {
  y: -5,
  scale: 1.03,
  boxShadow:
    "0 0 0 1px rgba(255,255,255,0.1), 0 20px 48px -12px rgba(0,0,0,0.45), 0 0 48px rgba(232,93,63,0.12)",
  transition: { duration: 0.3, ease: landingEase },
};

export function GlowBlob({ className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-[80px] ${className}`}
      aria-hidden
    />
  );
}

export function GlassPanel({ children, className = "" }) {
  return <div className={`${glassBase} ${className}`}>{children}</div>;
}

export function VoteCol({ n = "142" }) {
  return (
    <div className="flex flex-col items-center gap-0.5 text-[10px] font-semibold text-zinc-500">
      <span className="leading-none text-zinc-400">▲</span>
      <span className="text-zinc-300">{n}</span>
    </div>
  );
}

export function HeroPostCard({ className = "" }) {
  return (
    <GlassPanel className={`p-3 text-left ${className}`}>
      <div className="flex gap-2.5">
        <VoteCol />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[11px] text-zinc-500">
            <span className="h-6 w-6 shrink-0 rounded-full bg-[#e85d3f]/20 text-center text-[10px] font-semibold leading-6 text-[#e85d3f]">
              A
            </span>
            <span className="truncate">u/alex · r/design</span>
          </div>
          <p className="mt-1.5 text-[13px] font-semibold leading-snug text-white">
            Typography systems that scale with your product
          </p>
          <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-zinc-500">
            We moved from ad-hoc styles to tokens—here’s what changed in our handoff…
          </p>
        </div>
      </div>
    </GlassPanel>
  );
}

export function HeroCommentThread({ className = "" }) {
  return (
    <GlassPanel className={`p-3 text-left ${className}`}>
      <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Thread</p>
      <div className="mt-2 space-y-2 border-l border-white/10 pl-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-zinc-400">
            <span className="font-medium text-zinc-200">u/morgan</span>
            <span>· 2h</span>
          </div>
          <p className="mt-0.5 text-[12px] leading-relaxed text-zinc-300">
            This is exactly the workflow we needed—nested replies stay readable.
          </p>
        </div>
        <div className="ml-3 border-l border-white/10 pl-3">
          <div className="flex items-center gap-2 text-[11px] text-zinc-400">
            <span className="font-medium text-zinc-200">u/jules</span>
            <span>· 1h</span>
          </div>
          <p className="mt-0.5 text-[12px] leading-relaxed text-zinc-400">
            Same. The collapse on mobile is chef’s kiss.
          </p>
          <div className="mt-2 ml-2 border-l border-[#e85d3f]/30 pl-3">
            <div className="flex items-center gap-2 text-[11px] text-zinc-400">
              <span className="font-medium text-zinc-200">u/alex</span>
              <span>· 24m</span>
            </div>
            <p className="mt-0.5 text-[11px] text-zinc-500">Glad it’s working for your team too.</p>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}

export function HeroChatPopup({ className = "" }) {
  return (
    <GlassPanel className={`overflow-hidden ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 bg-black/20 px-3 py-2">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-white">
          <MessageCircle className="h-3.5 w-3.5 text-[#e85d3f]" strokeWidth={2} />
          Messages
        </div>
        <span className="text-[10px] text-emerald-400/90">Online</span>
      </div>
      <div className="space-y-2 p-3">
        <div className="rounded-lg rounded-tl-sm bg-white/10 px-2.5 py-1.5 text-[11px] text-zinc-200">
          Can you review the thread before publish?
        </div>
        <div className="ml-6 rounded-lg rounded-tr-sm bg-[#e85d3f]/25 px-2.5 py-1.5 text-[11px] text-zinc-100">
          On it—will leave notes inline.
        </div>
      </div>
    </GlassPanel>
  );
}

const HERO_FLOAT = [
  {
    duration: 6.5,
    delay: 0,
    className:
      "absolute right-0 top-0 z-30 w-[min(100%,280px)] sm:w-[300px]",
    baseRotate: -4,
    badge: "Trending",
    badgeClass: "-right-1 -top-2",
  },
  {
    duration: 7.2,
    delay: 0.35,
    className: "absolute left-0 top-[38%] z-20 w-[min(100%,260px)] sm:left-2 sm:w-[280px]",
    baseRotate: 3,
    badge: "New",
    badgeClass: "-left-1 -top-2",
  },
  {
    duration: 7.8,
    delay: 0.7,
    className: "absolute bottom-0 right-2 z-40 w-[min(100%,220px)]",
    baseRotate: -2,
    badge: "Live",
    badgeClass: "-right-0.5 bottom-10",
  },
];

export function FloatingBadge({ label, className = "" }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      className={`pointer-events-none absolute z-10 rounded-full border border-white/15 bg-black/30 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-zinc-100 shadow-sm backdrop-blur-md ${className}`}
      animate={
        reduced
          ? undefined
          : {
              scale: [1, 1.05, 1],
              opacity: [0.82, 1, 0.82],
            }
      }
      transition={{
        duration: 5.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {label}
    </motion.span>
  );
}

function HeroFloatCard({ duration, delay, className, baseRotate, badge, badgeClass, children, reduced }) {
  return (
    <motion.div
      className={`${className} relative`}
      style={reduced ? { rotate: baseRotate } : undefined}
      animate={
        reduced
          ? undefined
          : {
              y: [0, -10, 0],
              rotate: [baseRotate - 1, baseRotate + 1, baseRotate - 1],
            }
      }
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <FloatingBadge label={badge} className={badgeClass} />
      {children}
    </motion.div>
  );
}

export function HeroFloatingCluster({ parallaxY, reducedMotion }) {
  const prefersReduced = useReducedMotion();
  const reduced = reducedMotion ?? prefersReduced;
  return (
    <motion.div
      style={parallaxY ? { y: parallaxY } : undefined}
      className="relative mx-auto mt-14 h-[min(420px,52vh)] w-full max-w-[340px] sm:h-[400px] lg:mt-0 lg:max-w-none lg:translate-x-2"
    >
      <HeroFloatCard {...HERO_FLOAT[0]} reduced={reduced}>
        <HeroPostCard />
      </HeroFloatCard>
      <HeroFloatCard {...HERO_FLOAT[1]} reduced={reduced}>
        <HeroCommentThread />
      </HeroFloatCard>
      <HeroFloatCard {...HERO_FLOAT[2]} reduced={reduced}>
        <HeroChatPopup />
      </HeroFloatCard>
    </motion.div>
  );
}

export function ConversationPreviewDemo() {
  return (
    <GlassPanel className="max-w-2xl p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <p className="text-xs font-medium text-zinc-500">Post</p>
          <h3 className="mt-1 text-sm font-semibold text-white sm:text-base">
            Shipping calmer notifications without the noise
          </h3>
        </div>
        <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-zinc-400">
          r/product
        </span>
      </div>
      <ul className="mt-4 space-y-0">
        <li className="border-l-2 border-white/15 pl-4">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="font-semibold text-zinc-200">u/sasha</span>
            <span>· 3h</span>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-zinc-300">
            We grouped by thread and batched digests—open rates went up without more sends.
          </p>
          <div className="mt-3 ml-1 border-l-2 border-white/10 pl-4">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="font-semibold text-zinc-200">u/devon</span>
              <span>· 2h</span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-zinc-400">
              Did you keep push for @mentions only?
            </p>
            <div className="mt-3 border-l-2 border-[#e85d3f]/35 pl-4">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span className="font-semibold text-zinc-200">u/sasha</span>
                <span>· 1h</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                Yes—everything else is in the daily summary. Replies still notify in real time.
              </p>
            </div>
          </div>
        </li>
        <li className="mt-6 border-l-2 border-white/10 pl-4">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span className="font-semibold text-zinc-200">u/rijul</span>
            <span>· 45m</span>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-zinc-400">
            Love it. Would kill for a mute keyword on mobile too.
          </p>
        </li>
      </ul>
    </GlassPanel>
  );
}

function MiniCommunity({ emoji, name, members, highlight }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: highlight ? 1.04 : 1.03 }}
      transition={{ duration: 0.3, ease: landingEase }}
      className={`flex flex-col rounded-xl border p-3 text-left transition-all duration-300 ease-out ${
        highlight
          ? "scale-[1.06] border-[#e85d3f]/40 bg-white/[0.08] shadow-[0_0_40px_rgba(232,93,63,0.12)] backdrop-blur-lg"
          : "border-white/10 bg-white/[0.05] shadow-[0_0_40px_rgba(232,93,63,0.08)] backdrop-blur-lg"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">{emoji}</span>
        <div className="min-w-0">
          <p className={`truncate text-xs font-semibold ${highlight ? "text-white" : "text-zinc-200"}`}>
            {name}
          </p>
          <p className="text-[10px] text-zinc-500">{members} members</p>
        </div>
      </div>
      <p className="mt-2 line-clamp-2 text-[10px] leading-relaxed text-zinc-500">
        {highlight ? "Trending today—thoughtful threads, zero doomscroll." : "Quiet corner for deep work."}
      </p>
    </motion.div>
  );
}

const GRID = [
  { emoji: "◆", name: "r/startup", members: "12.4k", highlight: false },
  { emoji: "◇", name: "r/dev", members: "48k", highlight: false },
  { emoji: "✦", name: "r/design", members: "22k", highlight: false },
  { emoji: "◎", name: "r/product", members: "9.2k", highlight: true },
  { emoji: "○", name: "r/ux", members: "31k", highlight: false },
  { emoji: "□", name: "r/ask", members: "6k", highlight: false },
  { emoji: "△", name: "r/meta", members: "3.1k", highlight: false },
  { emoji: "▽", name: "r/oss", members: "18k", highlight: false },
  { emoji: "☆", name: "r/ship", members: "4.4k", highlight: false },
];

export function CommunityGridDemo() {
  return (
    <div className="grid max-w-lg grid-cols-3 gap-2 sm:gap-3">
      {GRID.map((c) => (
        <MiniCommunity key={c.name} emoji={c.emoji} name={c.name} members={c.members} highlight={c.highlight} />
      ))}
    </div>
  );
}

export function FeatureThreadListMock() {
  const rows = [
    { v: "128", t: "Design critique: onboarding flows", s: "r/design · u/nova" },
    { v: "94", t: "How we run async standups", s: "r/product · u/eli" },
    { v: "56", t: "Open source stack for 2026", s: "r/dev · u/kai" },
  ];
  return (
    <GlassPanel className="divide-y divide-white/10 p-0">
      {rows.map((r) => (
        <div key={r.t} className="flex gap-3 p-3">
          <VoteCol n={r.v} />
          <div className="min-w-0">
            <p className="text-[12px] font-semibold leading-snug text-white">{r.t}</p>
            <p className="mt-0.5 text-[10px] text-zinc-500">{r.s}</p>
          </div>
        </div>
      ))}
    </GlassPanel>
  );
}

export function FeatureCommunitiesStripMock() {
  const items = [
    { e: "✦", n: "r/design", m: "22k" },
    { e: "◎", n: "r/product", m: "9.2k" },
    { e: "◇", n: "r/dev", m: "48k" },
  ];
  return (
    <GlassPanel className="p-3">
      <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-zinc-500">Explore</p>
      <div className="grid grid-cols-3 gap-2">
        {items.map((x) => (
          <div
            key={x.n}
            className="rounded-lg border border-white/10 bg-black/20 px-2 py-2 text-center"
          >
            <span className="text-sm">{x.e}</span>
            <p className="mt-1 truncate text-[10px] font-semibold text-zinc-200">{x.n}</p>
            <p className="text-[9px] text-zinc-500">{x.m}</p>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}

export function FeatureInboxMock() {
  const items = [
    { t: "Mentioned in “Roadmap Q2”", time: "Now", dot: true },
    { t: "Your post was saved 20×", time: "2h", dot: false },
    { t: "Weekly digest — communities", time: "Yesterday", dot: false },
  ];
  return (
    <GlassPanel className="p-0">
      <div className="border-b border-white/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
        Inbox
      </div>
      <ul>
        {items.map((it) => (
          <li key={it.t} className="flex items-start gap-2 border-b border-white/5 px-3 py-2.5 last:border-0">
            <span
              className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${it.dot ? "bg-[#e85d3f]" : "bg-zinc-600"}`}
            />
            <div className="min-w-0">
              <p className="text-[11px] text-zinc-200">{it.t}</p>
              <p className="text-[10px] text-zinc-500">{it.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </GlassPanel>
  );
}

export function PostComposerMock({ className = "" }) {
  return (
    <GlassPanel className={`p-3 ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e85d3f]/25 text-[10px] font-bold text-[#e85d3f]">
          Y
        </div>
        <span className="text-[11px] font-medium text-zinc-300">New post</span>
      </div>
      <p className="mt-2 text-[11px] text-zinc-500">Title</p>
      <div className="mt-1 rounded-lg border border-white/10 bg-black/20 px-2 py-1.5 text-[12px] text-zinc-400">
        Weekly changelog — week 12
      </div>
      <p className="mt-2 text-[11px] text-zinc-500">Body</p>
      <div className="mt-1 h-14 rounded-lg border border-dashed border-white/15 bg-black/15 px-2 py-1.5 text-[11px] text-zinc-500">
        Write something worth reading…
      </div>
      <div className="mt-3 flex justify-end">
        <span className="rounded-lg bg-[#e85d3f] px-3 py-1 text-[11px] font-semibold text-white">Post</span>
      </div>
    </GlassPanel>
  );
}

export function ChatBubbleMock({ className = "" }) {
  return (
    <GlassPanel className={`w-[200px] overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/10 px-2.5 py-1.5">
        <MessageCircle className="h-3 w-3 text-[#e85d3f]" />
        <span className="text-[10px] font-semibold text-white">Team</span>
      </div>
      <div className="space-y-1.5 p-2">
        <div className="rounded-md bg-white/10 px-2 py-1 text-[10px] text-zinc-200">LGTM on copy</div>
        <div className="ml-4 rounded-md bg-[#e85d3f]/20 px-2 py-1 text-[10px] text-zinc-100">Shipping 🚀</div>
      </div>
    </GlassPanel>
  );
}

export function NotificationDropdownMock({ className = "" }) {
  return (
    <GlassPanel className={`w-[220px] overflow-hidden ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <span className="text-[11px] font-semibold text-white">Notifications</span>
        <Bell className="h-3.5 w-3.5 text-zinc-500" />
      </div>
      <ul className="max-h-[120px] divide-y divide-white/5 overflow-hidden text-left">
        <li className="px-3 py-2">
          <p className="text-[10px] text-zinc-200">Reply on your thread</p>
          <p className="text-[9px] text-zinc-500">2m ago</p>
        </li>
        <li className="px-3 py-2">
          <p className="text-[10px] text-zinc-300">Weekly digest ready</p>
          <p className="text-[9px] text-zinc-500">1h ago</p>
        </li>
      </ul>
    </GlassPanel>
  );
}

export function InteractionClusterDemo() {
  return (
    <div className="relative mx-auto h-[280px] w-full max-w-md sm:h-[260px]">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 top-4 z-10 w-[min(100%,240px)] rotate-[-2deg]"
      >
        <PostComposerMock />
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className="absolute right-0 top-0 z-20 w-[min(100%,200px)] rotate-[3deg]"
      >
        <NotificationDropdownMock />
      </motion.div>
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute bottom-2 left-1/2 z-30 w-[min(100%,200px)] -translate-x-1/2 rotate-[-1deg]"
      >
        <ChatBubbleMock />
      </motion.div>
    </div>
  );
}

export function ProductShowcaseFrame() {
  return (
    <div className="mx-auto w-full max-w-4xl rounded-xl border border-white/10 bg-[#0b0f19]/80 shadow-[0_0_40px_rgba(232,93,63,0.1),0_25px_50px_-12px_rgba(0,0,0,0.55)] backdrop-blur-lg transition-all duration-300 ease-out">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="mx-auto flex max-w-md flex-1 items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-1 text-[10px] text-zinc-500">
          <span className="text-zinc-600">🔒</span>
          threadit.app/home
        </div>
      </div>
      <div className="flex min-h-[280px] gap-0 sm:min-h-[320px]">
        <aside className="hidden w-36 shrink-0 border-r border-white/10 bg-black/20 p-2 sm:block">
          <div className="mb-3 flex items-center gap-2 px-1">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e85d3f]">
              <HiSparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-[10px] font-semibold text-white">Threadit</span>
          </div>
          {["Home", "Popular", "Explore"].map((t) => (
            <div
              key={t}
              className={`mb-1 rounded-md px-2 py-1.5 text-[10px] ${
                t === "Home" ? "bg-white/10 font-medium text-white" : "text-zinc-500"
              }`}
            >
              {t}
            </div>
          ))}
        </aside>
        <div className="min-w-0 flex-1 p-3 sm:p-4">
          <div className="mb-3 h-7 rounded-lg border border-white/10 bg-black/25" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex gap-2 rounded-lg border border-white/10 bg-white/[0.04] p-2.5"
              >
                <div className="flex flex-col items-center text-[9px] text-zinc-500">
                  <span>▲</span>
                  <span className="text-zinc-300">{48 + i * 17}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="h-2 w-24 rounded bg-white/10" />
                  <div className="mt-1.5 h-1.5 w-full max-w-[90%] rounded bg-white/5" />
                  <div className="mt-1 h-1.5 w-2/3 rounded bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeatureRow({ title, body, reverse, children }) {
  return (
    <motion.div
      variants={landingStaggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
    >
      <motion.div variants={landingStaggerItem} className={reverse ? "lg:order-2" : ""}>
        <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">{body}</p>
      </motion.div>
      <motion.div variants={landingStaggerItem} className={`relative ${reverse ? "lg:order-1" : ""}`}>
        <GlowBlob className="right-0 top-1/2 h-48 w-48 -translate-y-1/2 bg-[#e85d3f]/15" />
        <GlowBlob className="bottom-0 left-0 h-40 w-40 bg-sky-500/10" />
        <motion.div whileHover={cardHover} className="relative">
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
