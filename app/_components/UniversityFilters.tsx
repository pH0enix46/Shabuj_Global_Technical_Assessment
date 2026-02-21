"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Filter, Search } from "lucide-react";

export default function UniversityFilters({
  countries,
  locations,
}: {
  countries: string[];
  locations: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams],
  );

  const handleFilter = (key: string, value: string) => {
    startTransition(() => {
      router.push(`?${createQueryString(key, value)}`, { scroll: false });
    });
  };

  const handleClear = () => {
    startTransition(() => {
      router.push("/universities", { scroll: false });
    });
  };

  return (
    <div className="bg-white/70 dark:bg-[#111] backdrop-blur-md rounded-3xl border border-gray-200 dark:border-white/10 p-6 flex flex-col gap-6 sticky top-6 z-10 w-full md:w-80 shrink-0 self-start shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-500" /> Filters
          {isPending && (
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          )}
        </h2>
        {Array.from(searchParams.keys()).length > 0 && (
          <button
            onClick={handleClear}
            className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-5">
        {/* Search By Name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="e.g Harvard"
              defaultValue={searchParams.get("query")?.toString()}
              onChange={(e) => handleFilter("query", e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
            />
          </div>
        </div>

        {/* Dropdowns */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Country
          </label>
          <select
            value={searchParams.get("country")?.toString() || ""}
            onChange={(e) => handleFilter("country", e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
          >
            <option value="">All Countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Location
          </label>
          <select
            value={searchParams.get("location")?.toString() || ""}
            onChange={(e) => handleFilter("location", e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
          >
            <option value="">All Locations</option>
            {locations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Campus Type
          </label>
          <select
            value={searchParams.get("campusType")?.toString() || ""}
            onChange={(e) => handleFilter("campusType", e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
          >
            <option value="">Any Type</option>
            <option value="Urban">Urban</option>
            <option value="Suburban">Suburban</option>
            <option value="Rural">Rural</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex justify-between">
            Max Tuition Fee
            <span className="text-blue-500 font-bold">
              ${searchParams.get("maxTuition") || "100000"}
            </span>
          </label>
          <input
            type="range"
            min="10000"
            max="100000"
            step="1000"
            value={searchParams.get("maxTuition")?.toString() || "100000"}
            onChange={(e) => handleFilter("maxTuition", e.target.value)}
            className="w-full accent-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex justify-between">
            Min IELTS Score
            <span className="text-blue-500 font-bold">
              {searchParams.get("minIelts") || "Any"}
            </span>
          </label>
          <input
            type="range"
            min="5.0"
            max="9.0"
            step="0.5"
            value={searchParams.get("minIelts")?.toString() || "5.0"}
            onChange={(e) => handleFilter("minIelts", e.target.value)}
            className="w-full accent-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Filters universities needing ≤ this score
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="scholarships"
            checked={searchParams.get("hasScholarships") === "true"}
            onChange={(e) =>
              handleFilter("hasScholarships", e.target.checked ? "true" : "")
            }
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-white/10 dark:bg-white/5"
          />
          <label
            htmlFor="scholarships"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-0.5 cursor-pointer"
          >
            Has Scholarships
          </label>
        </div>
      </div>
    </div>
  );
}
