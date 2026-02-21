"use client";

import { University } from "@prisma/client";
import { motion } from "motion/react";
import {
  MapPin,
  Trophy,
  GraduationCap,
  DollarSign,
  CheckCircle,
  Plus,
  Minus,
} from "lucide-react";
import { useCompare } from "../_context/CompareContext";

export default function UniversityCard({
  university,
  index,
}: {
  university: University;
  index: number;
}) {
  const { selectedForCompare, toggleCompare } = useCompare();

  const isSelected = selectedForCompare.some((u) => u.id === university.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className={`relative group bg-white/70 dark:bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border transition-all ${
        isSelected
          ? "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
          : "border-gray-200 dark:border-white/10 shadow-sm hover:shadow-xl"
      }`}
    >
      {/* Top Graphic Section */}
      <div className="h-32 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 relative p-6 flex flex-col justify-end">
        <div className="absolute top-4 right-4 bg-white/80 dark:bg-black/40 backdrop-blur text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 border border-white/20">
          <Trophy className="w-3 h-3 text-amber-500" />#{university.ranking}{" "}
          World
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight drop-shadow-sm">
          {university.name}
        </h3>
      </div>

      {/* Content Body */}
      <div className="p-6 flex flex-col gap-4">
        {/* Core details grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
            <span className="truncate" title={university.location}>
              {university.location}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <DollarSign className="w-4 h-4 text-green-500 shrink-0" />
            <span>${university.tuitionFee.toLocaleString()}/yr</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <GraduationCap className="w-4 h-4 text-purple-500 shrink-0" />
            <span>{university.campusType}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <CheckCircle className="w-4 h-4 text-teal-500 shrink-0" />
            <span>{university.acceptanceRate}% Accept</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-2 pt-4 border-t border-gray-100 dark:border-white/10 flex items-center justify-between">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
            IELTS: {university.minIeltsScore}+ / Est.{" "}
            {university.establishedYear}
          </div>

          <button
            onClick={() => toggleCompare(university)}
            disabled={!isSelected && selectedForCompare.length >= 2}
            className={`flex items-center justify-center p-2 rounded-full transition-colors ${
              isSelected
                ? "bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-400 dark:hover:bg-blue-900"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/20"
            } ${!isSelected && selectedForCompare.length >= 2 ? "opacity-50 cursor-not-allowed" : ""}`}
            title={isSelected ? "Remove from Compare" : "Add to Compare"}
          >
            {isSelected ? (
              <Minus className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
