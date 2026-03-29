import { useState } from "react";
import PageTransition from "../components/layout/PageTransition";

export default function ManageCommunities() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("all");

  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-xl flex-col items-center px-2 py-4">
        <h1 className="text-center text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Manage communities
        </h1>

        <div className="mt-6 w-full">
          <label htmlFor="comm-search" className="sr-only">
            Search communities
          </label>
          <input
            id="comm-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your communities"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/25 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        <div className="mt-4 flex w-full gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1 dark:border-gray-600 dark:bg-gray-800">
          {[
            { key: "all", label: "All Communities" },
            { key: "favorites", label: "Favorites" },
          ].map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                tab === key
                  ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-gray-100"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-16 w-full text-center">
          {query.trim() ? (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No communities match &quot;{query.trim()}&quot;. Try another search.
            </p>
          ) : (
            <>
              <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                Looks like you haven&apos;t found your people yet.
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Join communities from the feed or search, and they&apos;ll show up here. You can also start your own
                from the sidebar.
              </p>
            </>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
