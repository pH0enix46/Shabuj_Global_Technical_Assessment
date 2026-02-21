// // //
"use client";
import { useState } from "react";
import { University } from "../../_types/types";
import UniversityCard from "./UniversityCard";
import { Inbox } from "lucide-react";

export default function UniversityGrid({
  universities,
}: {
  universities: University[];
}) {
  const [visibleCount, setVisibleCount] = useState(9);

  if (!universities || universities.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-12 text-center border border-dashed border-gray-300 dark:border-gray-700 rounded-3xl mt-8">
        <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 text-gray-400">
          <Inbox className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          No Universities Found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
          Try modifying your filters to explore more opportunities
        </p>
      </div>
    );
  }

  const visibleUnis = universities.slice(0, visibleCount);

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 w-full fade-in">
        {visibleUnis.map((uni) => (
          <UniversityCard key={uni.id} university={uni} />
        ))}
      </div>

      {visibleCount < universities.length && (
        <div className="w-full flex justify-center py-4">
          <button
            onClick={() => setVisibleCount((prev) => prev + 9)}
            className="px-6 py-2.5 bg-slate-50 dark:bg-slate-900/60 border border-gray-200 dark:border-white/10 rounded-full font-semibold text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-900/40 transition-all shadow-xs cursor-pointer"
          >
            Load More Results
          </button>
        </div>
      )}
    </div>
  );
}
