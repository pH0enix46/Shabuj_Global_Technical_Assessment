"use client";

import { University } from "../../_types/types";
import UniversityCard from "./UniversityCard";
import { Inbox } from "lucide-react";

export default function UniversityGrid({
  universities,
}: {
  universities: University[];
}) {
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
          Try modifying your filters to explore more opportunities.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 w-full fade-in">
      {universities.map((uni) => (
        <UniversityCard key={uni.id} university={uni} />
      ))}
    </div>
  );
}
