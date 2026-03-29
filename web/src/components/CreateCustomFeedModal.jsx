import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";

function ToggleRow({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <span className="text-sm text-foreground dark:text-zinc-200">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-11 shrink-0 rounded-full transition-colors duration-200 ${
          checked ? "bg-accent" : "bg-[#e8eaed] dark:bg-zinc-700"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export default function CreateCustomFeedModal({ open, onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [privateFeed, setPrivateFeed] = useState(false);
  const [showOnProfile, setShowOnProfile] = useState(true);

  const handleClose = () => {
    onClose();
    setName("");
    setDescription("");
    setPrivateFeed(false);
    setShowOnProfile(true);
  };

  const handleSubmit = () => {
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Create custom feed"
      titleId="custom-feed-title"
      footer={
        <>
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClose}
            className="rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-[#f5f5f5] dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Cancel
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-hover"
          >
            Submit
          </motion.button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label htmlFor="feed-name" className="text-sm font-medium text-foreground dark:text-zinc-200">
              Name
            </label>
            <span className="text-xs text-muted">
              {name.length}/50
            </span>
          </div>
          <input
            id="feed-name"
            value={name}
            maxLength={50}
            onChange={(e) => setName(e.target.value)}
            placeholder="Feed name"
            className="w-full rounded-lg border border-border bg-[#f5f3f0] px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/25 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label htmlFor="feed-desc" className="text-sm font-medium text-foreground dark:text-zinc-200">
              Description
            </label>
            <span className="text-xs text-muted">
              {description.length}/500
            </span>
          </div>
          <textarea
            id="feed-desc"
            value={description}
            maxLength={500}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description"
            rows={3}
            className="w-full resize-y rounded-lg border border-border bg-[#f5f3f0] px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/25 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />
        </div>

        <div className="border-t border-border pt-2 dark:border-zinc-700">
          <ToggleRow label="Make private" checked={privateFeed} onChange={setPrivateFeed} />
          <ToggleRow label="Show on profile" checked={showOnProfile} onChange={setShowOnProfile} />
        </div>
      </div>
    </Modal>
  );
}
