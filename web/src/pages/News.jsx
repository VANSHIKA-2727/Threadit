import { useState } from "react";
import { motion } from "framer-motion";
import { HiChatBubbleOvalLeft, HiShare } from "react-icons/hi2";
import PageTransition from "../components/layout/PageTransition";
import { formatNumber } from "../utils/Formatnumber";
import { textBody, textMuted } from "../utils/uiTheme";

const NEWS_ITEMS = [
  {
    id: 1,
    community: "r/technology",
    initial: "T",
    title: "Major chipmaker announces 2nm roadmap for consumer devices",
    url: "https://example.com/tech/chips-2nm",
    thumb: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=80",
    votes: 8420,
    comments: 612,
  },
  {
    id: 2,
    community: "r/science",
    initial: "S",
    title: "New study tracks ocean currents with unprecedented resolution",
    url: "https://example.com/science/oceans",
    thumb: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&q=80",
    votes: 3102,
    comments: 201,
  },
  {
    id: 3,
    community: "r/worldnews",
    initial: "W",
    title: "Leaders meet on climate framework ahead of summit",
    url: "https://example.com/news/climate",
    thumb: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=200&q=80",
    votes: 12004,
    comments: 1840,
  },
  {
    id: 4,
    community: "r/gaming",
    initial: "G",
    title: "Indie studio breaks concurrent player record on launch weekend",
    url: "https://example.com/gaming/indie-record",
    thumb: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&q=80",
    votes: 5601,
    comments: 903,
  },
  {
    id: 5,
    community: "r/business",
    initial: "B",
    title: "Markets digest earnings as volatility settles mid-week",
    url: "https://example.com/business/earnings",
    thumb: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&q=80",
    votes: 892,
    comments: 124,
  },
];

const listParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const rowVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

export default function News() {
  const [shared, setShared] = useState(null);

  return (
    <PageTransition>
      <div className="mx-auto w-full max-w-3xl">
        <h1 className={`mb-4 text-xl font-semibold ${textBody}`}>News</h1>

        <motion.div
          className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#1a1a1a]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-24px" }}
          variants={listParent}
        >
          {NEWS_ITEMS.map((item) => (
            <motion.article
              key={item.id}
              variants={rowVariant}
              whileHover={{ scale: 1.005 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="border-b border-gray-200 transition-colors duration-200 last:border-b-0 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.04]"
            >
              <div className="flex gap-3 px-3 py-3 sm:gap-4 sm:px-4 sm:py-4">
                <div className="flex min-w-0 flex-1 gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-bold text-orange-800 dark:bg-orange-900/40 dark:text-orange-200">
                    {item.initial}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className={`text-[15px] font-bold leading-snug sm:text-base ${textBody}`}>{item.title}</h2>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 block truncate text-xs text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {item.url}
                    </a>
                  </div>
                </div>
                <img
                  src={item.thumb}
                  alt=""
                  className="h-16 w-16 shrink-0 rounded-md object-cover sm:h-20 sm:w-20"
                />
              </div>
              <div className="flex flex-wrap items-center gap-4 px-3 pb-3 pl-[52px] sm:px-4 sm:pb-4 sm:pl-[60px]">
                <span className={`text-xs font-medium tabular-nums ${textMuted}`}>{formatNumber(item.votes)} votes</span>
                <span className={`inline-flex items-center gap-1 text-xs ${textMuted}`}>
                  <HiChatBubbleOvalLeft className="h-4 w-4" />
                  {formatNumber(item.comments)} comments
                </span>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    navigator.clipboard?.writeText(item.url);
                    setShared(item.id);
                    setTimeout(() => setShared(null), 2000);
                  }}
                  className={`inline-flex items-center gap-1 text-xs ${textMuted} hover:text-gray-900 dark:hover:text-gray-200`}
                >
                  <HiShare className="h-4 w-4" />
                  {shared === item.id ? "Copied" : "Share"}
                </motion.button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
}
