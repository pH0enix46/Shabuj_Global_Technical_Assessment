"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { University } from "../_lib/types";
import { toast } from "sonner";

interface CompareContextType {
  selectedForCompare: University[];
  toggleCompare: (uni: University) => void;
  clearCompare: () => void;
  isCompareModalOpen: boolean;
  setCompareModalOpen: (open: boolean) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selectedForCompare, setSelectedForCompare] = useState<University[]>(
    [],
  );
  const [isCompareModalOpen, setCompareModalOpen] = useState(false);

  const toggleCompare = (uni: University) => {
    setSelectedForCompare((prev) => {
      const isSelected = prev.some((u) => u.id === uni.id);
      if (isSelected) {
        toast.info(`Removed ${uni.name} from comparison.`);
        const newSelection = prev.filter((u) => u.id !== uni.id);
        if (newSelection.length === 0) setCompareModalOpen(false);
        return newSelection;
      }

      if (prev.length >= 2) {
        toast.error("You can only compare up to 2 universities at a time.");
        return prev;
      }

      toast.success(`Added ${uni.name} to comparison!`);
      return [...prev, uni];
    });
  };

  const clearCompare = () => {
    setSelectedForCompare([]);
    setCompareModalOpen(false);
    toast.info("Comparison cleared.");
  };

  return (
    <CompareContext.Provider
      value={{
        selectedForCompare,
        toggleCompare,
        clearCompare,
        isCompareModalOpen,
        setCompareModalOpen,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
