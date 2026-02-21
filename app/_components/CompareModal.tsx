"use client";

import { useCompare } from "../_context/CompareContext";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  CheckCircle,
  Scale,
  DollarSign,
  MapPin,
  Trophy,
  Target,
} from "lucide-react";

export default function CompareModal() {
  const {
    selectedForCompare,
    toggleCompare,
    clearCompare,
    isCompareModalOpen,
    setCompareModalOpen,
  } = useCompare();

  if (selectedForCompare.length === 0) return null;

  return (
    <>
      {/* Floating Action Button / Dock */}
      <AnimatePresence>
        {!isCompareModalOpen && selectedForCompare.length > 0 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
          >
            <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-2xl rounded-full p-2 flex items-center gap-4">
              <div className="flex -space-x-3 pl-2">
                {selectedForCompare.map((uni, i) => (
                  <div
                    key={uni.id}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm ring-2 ring-white dark:ring-black ${i === 0 ? "bg-blue-500" : "bg-indigo-500"}`}
                  >
                    {uni.name.charAt(0)}
                  </div>
                ))}
              </div>
              <div className="text-sm font-medium pr-2 text-gray-800 dark:text-gray-200 hidden sm:block">
                {selectedForCompare.length}/2 Selected
              </div>

              <div className="w-px h-6 bg-gray-300 dark:bg-gray-700" />

              <button
                onClick={() => setCompareModalOpen(true)}
                disabled={selectedForCompare.length < 2}
                className="flex items-center gap-2 bg-blue-600 disabled:bg-blue-600/50 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors disabled:cursor-not-allowed"
              >
                <Scale className="w-4 h-4" />
                Compare
              </button>

              <button
                onClick={clearCompare}
                className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full text-gray-500 dark:text-gray-400 transition-colors"
                title="Clear Compare"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actual Compare Modal */}
      <AnimatePresence>
        {isCompareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCompareModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between sticky top-0 bg-white/50 dark:bg-black/50 backdrop-blur-xl z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Compare Universities</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Side-by-side analysis
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setCompareModalOpen(false)}
                  className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
                <div className="grid grid-cols-2 gap-6 relative">
                  {/* Decorative divider */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 dark:bg-white/10 -translate-x-1/2 hidden md:block" />

                  {selectedForCompare.map((uni) => (
                    <div key={uni.id} className="flex flex-col gap-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                            {uni.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                            <MapPin className="w-4 h-4" />
                            {uni.location}, {uni.country}
                          </div>
                        </div>
                        <button
                          onClick={() => toggleCompare(uni)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <section className="bg-gray-50 p-4 rounded-xl dark:bg-white/5 border border-gray-100 dark:border-white/5">
                          <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
                            <Target className="w-4 h-4" /> Rankings & Stats
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-500">World Rank</span>
                              <span className="font-semibold px-2 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 rounded-md">
                                #{uni.ranking}
                              </span>
                            </div>
                            <div className="w-full h-px bg-gray-200 dark:bg-white/10" />
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-500">Established</span>
                              <span className="font-semibold">
                                {uni.establishedYear}
                              </span>
                            </div>
                            <div className="w-full h-px bg-gray-200 dark:bg-white/10" />
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-500">
                                Acceptance Rate
                              </span>
                              <span className="font-semibold">
                                {uni.acceptanceRate}%
                              </span>
                            </div>
                          </div>
                        </section>

                        <section className="bg-blue-50/50 p-4 rounded-xl dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
                          <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
                            <DollarSign className="w-4 h-4" /> Financials
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-600 dark:text-gray-400">
                                Tuition Fee
                              </span>
                              <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400">
                                ${uni.tuitionFee.toLocaleString()}
                                <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-1">
                                  /yr
                                </span>
                              </span>
                            </div>
                            <div className="w-full h-px bg-blue-100 dark:bg-blue-900/30" />
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-600 dark:text-gray-400">
                                Scholarships
                              </span>
                              {uni.hasScholarships ? (
                                <div className="flex items-center gap-1 text-teal-600 dark:text-teal-400 font-medium">
                                  <CheckCircle className="w-4 h-4" /> Available
                                </div>
                              ) : (
                                <span className="text-gray-400">
                                  Not Available
                                </span>
                              )}
                            </div>
                          </div>
                        </section>

                        <section className="p-4 rounded-xl border border-gray-200 dark:border-white/10">
                          <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
                            <Trophy className="w-4 h-4" /> Academics
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-500">Campus Type</span>
                              <span className="font-medium">
                                {uni.campusType}
                              </span>
                            </div>
                            <div className="w-full h-px bg-gray-200 dark:bg-white/10" />
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-500">Min. IELTS</span>
                              <span className="font-bold">
                                {uni.minIeltsScore}
                              </span>
                            </div>
                            <div className="w-full h-px bg-gray-200 dark:bg-white/10" />
                            <div className="flex flex-col gap-2 text-sm pt-1">
                              <span className="text-gray-500">
                                Programs Offered
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {uni.courseTypes.map((c: string) => (
                                  <span
                                    key={c}
                                    className="text-xs font-medium bg-gray-100 dark:bg-white/10 px-2 py-1 rounded"
                                  >
                                    {c}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
