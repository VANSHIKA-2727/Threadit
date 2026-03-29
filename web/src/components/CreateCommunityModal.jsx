import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const TOPICS = [
  "Technology",
  "Gaming",
  "Sports",
  "Music",
  "Art & design",
  "Science",
  "Entertainment",
  "Lifestyle",
  "News",
  "Business",
  "Health & fitness",
  "Travel",
];

const PRIVACY_OPTIONS = [
  { key: "public", label: "Public", hint: "Anyone can view, post, and comment." },
  { key: "restricted", label: "Restricted", hint: "Anyone can view; only approved users can post." },
  { key: "private", label: "Private", hint: "Only members can view and participate." },
];

function StepDots({ step, total = 3 }) {
  return (
    <div className="flex justify-center gap-2 py-3" aria-hidden>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full transition-colors duration-200 ${
            i === step ? "bg-accent" : "bg-gray-300 dark:bg-gray-600"
          }`}
        />
      ))}
    </div>
  );
}

export default function CreateCommunityModal({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [topics, setTopics] = useState([]);
  const [privacy, setPrivacy] = useState("public");
  const [mature, setMature] = useState(false);
  const [communityName, setCommunityName] = useState("");
  const [description, setDescription] = useState("");

  const reset = useCallback(() => {
    setStep(0);
    setTopics([]);
    setPrivacy("public");
    setMature(false);
    setCommunityName("");
    setDescription("");
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      reset();
    };
  }, [open, onClose, reset]);

  const toggleTopic = (t) => {
    setTopics((prev) => {
      if (prev.includes(t)) return prev.filter((x) => x !== t);
      if (prev.length >= 2) return [prev[0], t];
      return [...prev, t];
    });
  };

  const canNextStep0 = topics.length >= 1 && topics.length <= 2;
  const canCreate = communityName.trim().length > 0;

  const handleCreate = () => {
    if (!canCreate) return;
    onClose();
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            key="cc-backdrop"
            type="button"
            aria-label="Close"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease }}
            className="fixed inset-0 z-[100] bg-black/40 dark:bg-black/50"
            onClick={onClose}
          />

          <motion.div
            key="cc-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`cc-step-${step}-title`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease }}
            className="fixed left-1/2 top-1/2 z-[101] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:shadow-black/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[min(90vh,720px)] overflow-y-auto">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -28 }}
                  transition={{ duration: 0.22, ease }}
                  className="px-5 pt-5 pb-2"
                >
                  {step === 0 && (
                    <>
                      <h2 id="cc-step-0-title" className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        What will your community be about?
                      </h2>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Choose 1–2 topics that fit best.
                      </p>
                      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
                        {TOPICS.map((t) => {
                          const selected = topics.includes(t);
                          return (
                            <button
                              key={t}
                              type="button"
                              onClick={() => toggleTopic(t)}
                              className={`rounded-full border px-3 py-2.5 text-left text-sm font-medium transition-colors duration-200 ${
                                selected
                                  ? "border-accent bg-accent-soft/40 text-gray-900 dark:bg-accent/15 dark:text-gray-100"
                                  : "border-gray-200 bg-white text-gray-800 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700/80"
                              }`}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <h2 id="cc-step-1-title" className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        What kind of community is this?
                      </h2>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        You can change this later in settings.
                      </p>
                      <div className="mt-5 space-y-2" role="radiogroup" aria-label="Community type">
                        {PRIVACY_OPTIONS.map((opt) => (
                          <label
                            key={opt.key}
                            className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-3 transition-colors duration-200 ${
                              privacy === opt.key
                                ? "border-accent/50 bg-accent-soft/25 dark:border-accent/40 dark:bg-accent/10"
                                : "border-gray-200 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
                            }`}
                          >
                            <input
                              type="radio"
                              name="cc-privacy"
                              checked={privacy === opt.key}
                              onChange={() => setPrivacy(opt.key)}
                              className="mt-1 text-accent"
                            />
                            <span>
                              <span className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                                {opt.label}
                              </span>
                              <span className="text-xs text-gray-600 dark:text-gray-400">{opt.hint}</span>
                            </span>
                          </label>
                        ))}
                      </div>
                      <div className="mt-5 flex items-center justify-between rounded-lg border border-gray-200 px-3 py-3 dark:border-gray-600">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Mature (18+)</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            For adult-oriented communities.
                          </p>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={mature}
                          onClick={() => setMature((m) => !m)}
                          className={`relative h-7 w-11 shrink-0 rounded-full transition-colors duration-200 ${
                            mature ? "bg-accent" : "bg-gray-200 dark:bg-gray-600"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 block h-6 w-6 rounded-full bg-white shadow transition-transform duration-200 ${
                              mature ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                      <div className="min-w-0 flex-1 space-y-4">
                        <h2 id="cc-step-2-title" className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          Tell us about your community
                        </h2>
                        <div>
                          <label htmlFor="cc-name" className="mb-1 block text-sm font-medium text-gray-900 dark:text-gray-100">
                            Community name
                          </label>
                          <input
                            id="cc-name"
                            value={communityName}
                            onChange={(e) => setCommunityName(e.target.value)}
                            placeholder="r/name"
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/25 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                          />
                        </div>
                        <div>
                          <label htmlFor="cc-desc" className="mb-1 block text-sm font-medium text-gray-900 dark:text-gray-100">
                            Description
                          </label>
                          <textarea
                            id="cc-desc"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="What should people know?"
                            rows={4}
                            className="w-full resize-y rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/25 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
                          />
                        </div>
                      </div>
                      <div className="w-full shrink-0 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-800 lg:max-w-[240px]">
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Preview
                        </p>
                        <p className="mt-2 font-semibold text-gray-900 dark:text-gray-100">
                          {communityName.trim() || "Community name"}
                        </p>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-4">
                          {description.trim() || "Your description will show here."}
                        </p>
                        <p className="mt-3 text-xs text-gray-500 dark:text-gray-500 capitalize">
                          {privacy}
                          {mature ? " · 18+" : ""}
                        </p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">{topics.join(" · ")}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <StepDots step={step} />

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 px-5 py-4 dark:border-gray-700">
              <div className="flex gap-2">
                {step === 0 ? (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep((s) => s - 1)}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                  >
                    Back
                  </motion.button>
                )}
              </div>
              <div className="flex gap-2">
                {step < 2 ? (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={step === 0 && !canNextStep0}
                    onClick={() => setStep((s) => s + 1)}
                    className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!canCreate}
                    onClick={handleCreate}
                    className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Create Community
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
