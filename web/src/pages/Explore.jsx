import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import PageTransition from "../components/layout/PageTransition";
import CommunityCard from "../components/explore/CommunityCard";
import { EXPLORE_CHIPS, EXPLORE_SECTIONS, filterCommunitiesByChip } from "../data/exploreData";

const INITIAL_VISIBLE = 3;

export default function Explore() {
  const [activeChip, setActiveChip] = useState("all");
  const [expanded, setExpanded] = useState(() => ({}));
  const [joined, setJoined] = useState(() => new Set());

  const sectionsWithItems = useMemo(() => {
    return EXPLORE_SECTIONS.map((section) => ({
      ...section,
      items: filterCommunitiesByChip(section.items, activeChip),
    })).filter((s) => s.items.length > 0);
  }, [activeChip]);

  const toggleExpanded = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleJoin = (name) => {
    setJoined((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <PageTransition>
      <div className="-mx-4 -mt-6 min-h-full bg-[#f2eee9] pb-12 dark:bg-[#0f0f0f] md:-mx-6">
        <div className="mx-auto w-full max-w-6xl px-4 py-8">
          <motion.header
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Explore Communities</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Discover spaces that match your interests — from memes to gardening.
            </p>
          </motion.header>

          <div className="-mx-1 mb-10 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max min-w-full gap-2 px-1">
              {EXPLORE_CHIPS.map((chip) => {
                const active = activeChip === chip.id;
                return (
                  <motion.button
                    key={chip.id}
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveChip(chip.id)}
                    className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                      active
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-[#2a2a2a] dark:text-gray-200 dark:hover:bg-[#333]"
                    }`}
                  >
                    {chip.label}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="space-y-12">
            {sectionsWithItems.map((section, sIdx) => {
              const isOpen = expanded[section.id];
              const visibleItems = isOpen ? section.items : section.items.slice(0, INITIAL_VISIBLE);
              const hasMore = section.items.length > INITIAL_VISIBLE;

              return (
                <motion.section
                  key={section.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: sIdx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="min-w-0"
                >
                  <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">{section.title}</h2>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleItems.map((item, i) => (
                      <CommunityCard
                        key={`${section.id}-${item.name}`}
                        community={item}
                        index={i}
                        joined={joined.has(item.name)}
                        onJoinToggle={toggleJoin}
                      />
                    ))}
                  </div>

                  {hasMore && (
                    <div className="mt-6 flex justify-center">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleExpanded(section.id)}
                        className="rounded-full border border-gray-200 bg-white/80 px-6 py-2 text-sm font-medium text-gray-600 shadow-sm transition-colors duration-200 hover:border-gray-300 hover:bg-white hover:text-gray-900 dark:border-gray-700 dark:bg-[#1a1a1a] dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-[#222]"
                      >
                        {isOpen ? "Show less" : "Show more"}
                      </motion.button>
                    </div>
                  )}
                </motion.section>
              );
            })}
          </div>

          {sectionsWithItems.length === 0 && (
            <p className="py-16 text-center text-sm text-gray-500 dark:text-gray-400">
              No communities match this filter. Try &quot;All&quot; or another category.
            </p>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
