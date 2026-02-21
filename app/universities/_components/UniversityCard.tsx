// // //
"use client";
import {
  MapPin,
  Trophy,
  GraduationCap,
  DollarSign,
  CheckCircle,
  Plus,
  Minus,
} from "lucide-react";

import { University } from "@/_types/types";
import { useCompare } from "@/_context/CompareContext";

export default function UniversityCard({
  university,
}: {
  university: University;
}) {
  const { selectedForCompare, toggleCompare } = useCompare();

  const isSelected = selectedForCompare.some((u) => u.id === university.id);

  return (
    <div
      className={`relative group bg-slate-50 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl overflow-hidden border transition-all duration-300 ${
        isSelected
          ? "border-primary/60 shadow"
          : "border-gray-200 dark:border-white/10 shadow-xs hover:-translate-y-1"
      }`}
    >
      {/* Top Section */}
      <div className="h-32 bg-slate-200/60 border-b border-b-slate-200 dark:bg-slate-900 dark:border-b-slate-800 relative p-6 flex flex-col justify-end gap-1.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 w-fit">
          <Trophy className="w-4 h-4" />#{university.ranking} World
        </div>
        <h3 className="text-xl font-bold text-foreground line-clamp-2 leading-tight">
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
            className={`flex items-center justify-center p-2 rounded-full transition-colors cursor-pointer ${
              isSelected
                ? "bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-400 dark:hover:bg-blue-900"
                : "bg-slate-200 text-gray-600 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:text-gray-300 dark:hover:bg-slate-800/60"
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
    </div>
  );
}
