"use client";

import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

// import types from shared file (IMPORTANT)
import type { SortField, SortDirection } from "./PreOrderTypes";

type FilterOptionsProps = {
  selectedSort: SortField;
  selectedDirection: SortDirection;
  onSortChange: (value: SortField) => void;
  onDirectionChange: (value: SortDirection) => void;
};

const sortOptions: { label: string; value: SortField }[] = [
  { label: "Name", value: "name" },
  { label: "Created At", value: "createdAt" },
  { label: "Starts At", value: "startsAt" },
  { label: "Ends At", value: "endsAt" },
];

const FilterOptions = ({
  selectedSort,
  selectedDirection,
  onSortChange,
  onDirectionChange,
}: FilterOptionsProps) => {
  return (
    <div className="w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 font-sans">
      {/* Sort By */}
      <div className="text-gray-500 text-sm font-medium mb-3">
        Sort by
      </div>

      <div className="space-y-2.5 mb-3">
        {sortOptions.map((option) => (
          <div
            key={option.value}
            className="flex items-center gap-3 cursor-pointer py-0.5 px-1"
            onClick={() => onSortChange(option.value)}
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <div
                className={`w-5 h-5 rounded-full border transition-colors ${
                  selectedSort === option.value
                    ? "border-black"
                    : "border-gray-300"
                }`}
              />
              {selectedSort === option.value && (
                <div className="absolute w-2.5 h-2.5 bg-black rounded-full" />
              )}
            </div>

            <span
              className={`text-sm font-medium ${
                selectedSort === option.value
                  ? "text-black"
                  : "text-gray-700"
              }`}
            >
              {option.label}
            </span>
          </div>
        ))}
      </div>

      <div className="h-px bg-gray-200 mb-3" />

      {/* Direction */}
      <div className="space-y-1">
        <div
          className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg ${
            selectedDirection === "asc" ? "bg-gray-200" : ""
          }`}
          onClick={() => onDirectionChange("asc")}
        >
          <ArrowUp className="w-4 h-4" />
          <span className="text-sm font-semibold">Ascending</span>
        </div>

        <div
          className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg ${
            selectedDirection === "desc" ? "bg-gray-200" : ""
          }`}
          onClick={() => onDirectionChange("desc")}
        >
          <ArrowDown className="w-4 h-4" />
          <span className="text-sm font-semibold">Descending</span>
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;