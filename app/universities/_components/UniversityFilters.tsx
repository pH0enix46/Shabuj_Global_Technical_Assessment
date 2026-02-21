// // //
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition, useState, useEffect } from "react";
import { Filter, Search } from "lucide-react";
import * as Slider from "@radix-ui/react-slider";

// Interactive Custom Slider Component - Clean, Native Feel, No Freezing
function InteractiveSlider({
  label,
  value,
  min,
  max,
  step,
  onValueCommit,
  formatLabel = (v) => v.toString(),
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onValueCommit: (val: number) => void;
  formatLabel?: (val: number) => string;
}) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className="space-y-4">
      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex justify-between">
        {label}
        <span className="text-primary font-bold tracking-wide">
          {formatLabel(localValue)}
        </span>
      </label>
      <div className="px-2 pb-2">
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5 group cursor-grab active:cursor-grabbing"
          value={[localValue]}
          min={min}
          max={max}
          step={step}
          onValueChange={(vals) => setLocalValue(vals[0])}
          onValueCommit={(vals) => onValueCommit(vals[0])}
        >
          <Slider.Track className="bg-gray-200 dark:bg-white/10 relative grow rounded-full h-2 overflow-hidden">
            <Slider.Range className="absolute bg-primary h-full transition-colors group-hover:bg-primary" />
          </Slider.Track>
          <Slider.Thumb
            className="block w-5 h-5 bg-white border-2 border-primary shadow rounded-full hover:bg-blue-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30 transition-transform active:scale-110"
            aria-label={label}
          />
        </Slider.Root>
      </div>
    </div>
  );
}

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
    <div className="bg-slate-50 dark:bg-slate-900/50 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-white/10 p-6 flex flex-col gap-6 sticky top-6 z-10 w-full md:w-80 shrink-0 self-start shadow-xs">
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
            className="text-sm text-rose-600 hover:text-rose-500 font-medium transition-colors cursor-pointer opacity-80"
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
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/80 transition-all font-medium"
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
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/80 transition-all font-medium"
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
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/80 transition-all font-medium"
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
            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/80 transition-all font-medium"
          >
            <option value="">Any Type</option>
            <option value="Urban">Urban</option>
            <option value="Suburban">Suburban</option>
            <option value="Rural">Rural</option>
          </select>
        </div>

        <InteractiveSlider
          label="Max Tuition Fee"
          min={10000}
          max={100000}
          step={1000}
          value={Number(searchParams.get("maxTuition") || 100000)}
          onValueCommit={(val) => handleFilter("maxTuition", val.toString())}
          formatLabel={(val) => `$${val}`}
        />

        <div className="space-y-1 mt-6">
          <InteractiveSlider
            label="Min IELTS Score"
            min={5.0}
            max={9.0}
            step={0.5}
            value={Number(searchParams.get("minIelts") || 5.0)}
            onValueCommit={(val) => handleFilter("minIelts", val.toString())}
            formatLabel={(val) => (val === 5.0 ? "Any" : val.toFixed(1))}
          />
          <p className="text-xs text-gray-500">
            Filters universities needing ≤ this score
          </p>
        </div>

        <div className="pt-4 mt-2 border-t border-gray-100 dark:border-white/10">
          <label
            className="group flex items-center gap-3 cursor-pointer w-fit"
            htmlFor="scholarships"
          >
            <div className="relative flex items-center justify-center w-6 h-6">
              <input
                type="checkbox"
                id="scholarships"
                checked={searchParams.get("hasScholarships") === "true"}
                onChange={(e) =>
                  handleFilter(
                    "hasScholarships",
                    e.target.checked ? "true" : "",
                  )
                }
                className="peer appearance-none w-6 h-6 border-2 border-gray-300 dark:border-white/20 rounded-full bg-white dark:bg-white/5 checked:bg-primary checked:border-primary hover:border-primary dark:hover:border-primary transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              />
              <svg
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute text-white w-3.5 h-3.5 scale-50 opacity-0 peer-checked:scale-100 peer-checked:opacity-100 transition-all duration-200 pointer-events-none"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="currentColor"
                />
              </svg>
            </div>
            <span className="text-sm font-bold text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors">
              Has Scholarships
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
