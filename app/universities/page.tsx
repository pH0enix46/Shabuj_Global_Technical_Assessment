// // //
import { UniversitySearchParams } from "../_lib/validators/validations";
import UniversityGrid from "./_components/UniversityGrid";
import UniversityFilters from "./_components/UniversityFilters";
import { GraduationCap, Loader2 } from "lucide-react";
import { getFilterOptions, getUniversities } from "@/_server/data/data";
import CompareModal from "./_components/CompareModal";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search & Compare Global Universities | Shabuj Global Education",
  description:
    "Explore, filter, and dynamically compare thousands of world-class universities. Find the perfect match for your study abroad journey based on tuition, IELTS scores, location, and scholarships.",
  keywords: [
    "University Search",
    "Compare Universities",
    "Study Abroad Degrees",
    "University Tuition Fees",
    "IELTS Requirements",
    "International Scholarships",
  ],
  openGraph: {
    title: "Find & Compare Global Universities | Shabuj Global Education",
    description:
      "Explore, filter, and dynamically compare thousands of world-class universities. Find the perfect match for your study abroad journey.",
    url: "https://shabujglobal.com/universities",
    images: [{ url: "/shabuj-global.png" }],
  },
};

export default async function UniversitiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const query = await searchParams;

  // Only statically fetch the filter options here so page wrapper renders instantly
  const filterOptions = await getFilterOptions();

  // DEV TEST: Fake 1 minute delay so you can perfectly test the loading.tsx UI!
  // await new Promise((resolve) => setTimeout(resolve, 60000));

  return (
    <main className="min-h-screen bg-transparent">
      {/* Premium Hero Section */}
      <section className="relative pt-32 pb-20 px-6 xl:px-0 bg-background overflow-hidden border-b border-gray-200 dark:border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-primary text-sm font-semibold mb-6 ring-1 ring-blue-500/20">
            <GraduationCap className="w-4 h-4" /> Global Education
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white">
            Find Your{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-sky-600 to-indigo-700 dark:from-sky-500 dark:to-indigo-700">
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
      <section className="max-w-8xl mx-auto px-6 xl:px-16 py-12 flex flex-col md:flex-row gap-8 items-start relative pb-32">
        {/* Filters Sidebar */}
        <UniversityFilters
          countries={filterOptions.countries}
          locations={filterOptions.locations}
        />

        {/* Results Grid Wrapper */}
        <div className="flex-1 w-full min-w-0">
          <Suspense key={JSON.stringify(query)} fallback={<GridSkeleton />}>
            <GridResultsFetcher query={query} />
          </Suspense>
        </div>
      </section>

      {/* Compare Modal */}
      <CompareModal />
    </main>
  );
}

// Extracted Data Fetcher Component to Enable Granular Loading Skeletons
async function GridResultsFetcher({
  query,
}: {
  query: { [key: string]: string | undefined };
}) {
  const { data: universities, count } = await getUniversities(
    query as Partial<UniversitySearchParams>,
  );

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Search Results
        </h2>
        <div className="bg-sky-50 text-primary dark:bg-blue-900/20 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-bold border border-primary/30">
          {count} {count === 1 ? "University" : "Universities"}
        </div>
      </div>
      <UniversityGrid universities={universities} />
    </>
  );
}

// Beautiful Loading Placeholder
function GridSkeleton() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="h-8 w-40 bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse" />
        <div className="h-6 w-24 bg-gray-200 dark:bg-white/10 rounded-full animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-72 bg-gray-100 dark:bg-white/5 rounded-2xl animate-pulse border border-gray-200 dark:border-white/10"
          >
            <div className="h-32 bg-gray-200 dark:bg-white/10 rounded-t-2xl w-full" />
            <div className="p-6 space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-3/4" />
              <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/2" />
              <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-full" />
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center mt-12 mb-6">
        <div className="flex items-center gap-2 text-primary font-bold animate-pulse">
          <Loader2 className="w-5 h-5 animate-spin" /> Fetching Results...
        </div>
      </div>
    </div>
  );
}
