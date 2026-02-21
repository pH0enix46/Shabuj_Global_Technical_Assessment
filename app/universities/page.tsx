import { getUniversities, getFilterOptions } from "../_lib/actions";
import { UniversitySearchParams } from "../_lib/validations";
import UniversityGrid from "../_components/UniversityGrid";
import UniversityFilters from "../_components/UniversityFilters";
import { GraduationCap } from "lucide-react";

export const revalidate = 0; // Ensures it's dynamically rendered due to searchParams

export default async function UniversitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const unresolvedParams = await searchParams;

  // Transform standard search params into validation shape
  const query = unresolvedParams;

  // Fetch Server Data
  const [dataPayload, filterOptions] = await Promise.all([
    getUniversities(query as Partial<UniversitySearchParams>),
    getFilterOptions(),
  ]);

  const { data: universities, count } = dataPayload;

  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-black">
      {/* Premium Hero Section */}
      <section className="relative pt-32 pb-20 px-6 xl:px-0 bg-white dark:bg-[#111] overflow-hidden border-b border-gray-100 dark:border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6 ring-1 ring-blue-500/20">
            <GraduationCap className="w-4 h-4" /> Global Education
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white">
            Find Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Perfect University
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Discover and compare thousands of world-class universities tailored
            to your specific academic, location, and financial preferences.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-6 xl:px-0 py-12 flex flex-col md:flex-row gap-8 items-start relative pb-32">
        {/* Filters Sidebar */}
        <UniversityFilters
          countries={filterOptions.countries}
          locations={filterOptions.locations}
        />

        {/* Results Grid */}
        <div className="flex-1 w-full min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Search Results
            </h2>
            <div className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
              {count} {count === 1 ? "University" : "Universities"}
            </div>
          </div>
          <UniversityGrid universities={universities} />
        </div>
      </section>
    </main>
  );
}
