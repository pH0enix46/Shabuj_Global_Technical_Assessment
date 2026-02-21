// // //
export default function Loading() {
  return (
    <main className="min-h-screen bg-transparent">
      {/* Skeleton Hero Section */}
      <section className="relative pt-32 pb-20 px-6 xl:px-0 bg-background overflow-hidden border-b border-gray-200 dark:border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/50 dark:bg-blue-900/10 text-blue-600/50 dark:text-blue-400/50 text-sm font-semibold mb-6 ring-1 ring-blue-500/10 w-40 h-7 animate-pulse"></div>

          <div className="h-16 md:h-20 w-3/4 max-w-2xl bg-gray-200 dark:bg-white/10 rounded-2xl mb-6 animate-pulse"></div>

          <div className="space-y-3 w-full max-w-2xl flex flex-col items-center">
            <div className="h-5 w-full bg-gray-200 dark:bg-white/10 rounded-lg animate-pulse"></div>
            <div className="h-5 w-4/5 bg-gray-200 dark:bg-white/10 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-6 xl:px-0 py-12 flex flex-col md:flex-row gap-8 items-start relative pb-32">
        {/* Skeleton Filters Sidebar */}
        <div className="bg-white/70 dark:bg-[#111] backdrop-blur-md rounded-3xl border border-gray-200 dark:border-white/10 p-6 flex flex-col gap-6 w-full md:w-80 shrink-0 self-start shadow-sm">
          <div className="flex items-center justify-between">
            <div className="h-6 w-24 bg-gray-200 dark:bg-white/10 rounded-lg animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-200 dark:bg-white/10 rounded-lg animate-pulse"></div>
          </div>

          <div className="space-y-6 mt-4">
            {/* Mock Inputs */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-1/3 bg-gray-200 dark:bg-white/10 rounded-md animate-pulse"></div>
                <div className="h-10 w-full bg-gray-100 dark:bg-white/5 rounded-xl animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Skeleton Results Grid */}
        <div className="flex-1 w-full min-w-0">
          <div className="flex items-center justify-between mb-4 mt-1">
            <div className="h-8 w-40 bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse"></div>
            <div className="h-7 w-24 bg-gray-200 dark:bg-white/10 rounded-full animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 w-full">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="relative bg-white/70 dark:bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm"
              >
                {/* Top Graphic Section Skeleton */}
                <div className="h-32 bg-gray-100 dark:bg-white/5 relative p-6 flex flex-col justify-end animate-pulse">
                  <div className="absolute top-4 right-4 h-6 w-20 bg-white/50 dark:bg-black/20 rounded-full"></div>
                  <div className="h-6 w-3/4 bg-gray-200 dark:bg-white/10 rounded-lg mt-auto"></div>
                </div>

                {/* Content Body Skeleton */}
                <div className="p-6 flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-4 w-full bg-gray-200 dark:bg-white/10 rounded-md animate-pulse"></div>
                    <div className="h-4 w-4/5 bg-gray-200 dark:bg-white/10 rounded-md animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-gray-200 dark:bg-white/10 rounded-md animate-pulse"></div>
                    <div className="h-4 w-full bg-gray-200 dark:bg-white/10 rounded-md animate-pulse"></div>
                  </div>

                  <div className="mt-2 pt-4 border-t border-gray-100 dark:border-white/10 flex items-center justify-between">
                    <div className="h-3 w-32 bg-gray-200 dark:bg-white/10 rounded-md animate-pulse"></div>
                    <div className="h-8 w-8 bg-gray-200 dark:bg-white/10 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
