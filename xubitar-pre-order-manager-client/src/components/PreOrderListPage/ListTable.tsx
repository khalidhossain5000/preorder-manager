"use client";

import React, { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import ListItem, { Preorder } from "./ListItem";
import Link from "next/link";
import { SortDirection, SortField, Tab, tabs } from "./PreOrderTypes";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import FilterOptions from "./FilterOptions";
import useAxios from "@/hooks/useAxios";
import GlobalSpinner from "../Loader/GlobalSpinner";
import EmptyMessage from "../PreOrderEmptyMessage/EmptyMessage";

type PreorderListResponse = {
  data: Preorder[];
  meta: {
    totalPages: number;
    total: number;
  };
};

const ListTable = () => {
  const axiosInstance = useAxios();

  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [selectedSort, setSelectedSort] = useState<SortField>("createdAt");
  const [selectedDirection, setSelectedDirection] =
    useState<SortDirection>("desc");

  const [page, setPage] = useState(1);
  const limit = 8;

  const {
    data: preorderResponse,
    isLoading,
    refetch,
    isPlaceholderData,
  } = useQuery({
    queryKey: [
      "preorders",
      {
        page,
        limit,
        sortBy: selectedSort,
        sortOrder: selectedDirection,
         filter: activeTab === "All" ? undefined : activeTab,
      },
    ],
    queryFn: async (): Promise<PreorderListResponse> => {
      const res = await axiosInstance.get("/api/preorder", {
        params: {
          page,
          limit,
          sortBy: selectedSort,
          sortOrder: selectedDirection,
        filter: activeTab === "All" ? undefined : activeTab,
        },
      });

      return res.data.data;
    },
    placeholderData: keepPreviousData,
  });

  const preorders = preorderResponse?.data ?? [];
  const totalPages = preorderResponse?.meta.totalPages ?? 1;
  const total = preorderResponse?.meta.total ?? 0;

  if (isLoading && !preorderResponse) return <GlobalSpinner />;

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#efefef] p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mb-5">
        <h1 className="font-verdana text-xl md:text-2xl font-bold text-text-primary tracking-tight">
          Preorders
        </h1>
        <Link href="/create-preorder">
          <button className="px-5.5 py-2 rounded-[999px] bg-[#2f2f2f] border-2 border-[#111] text-white text-sm font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_2px_0_#000] cursor-pointer hover:bg-[#3a3a3a] transition-colors">
            Create Preorder
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-xl overflow-hidden py-4 border-2 border-[#e7e7e7] shadow-sm shadow-slate-40">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`cursor-pointer font-inter px-6 py-2 text-sm text-text-primary font-bold ${
                  activeTab === tab ? "rounded-[10px] bg-[#ebebeb]" : ""
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <button className="p-1.5 rounded-md text-text-primary hover:bg-gray-100 transition-colors border border-[#1111112e]">
                <ArrowUpDown size={16} strokeWidth={2} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <FilterOptions
                selectedSort={selectedSort}
                selectedDirection={selectedDirection}
                onSortChange={(value) => {
                  setSelectedSort(value);
                  setPage(1);
                }}
                onDirectionChange={(value) => {
                  setSelectedDirection(value);
                  setPage(1);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {preorders.length === 0 ? (
          <EmptyMessage />
        ) : (
          <div className="overflow-x-auto py-4 mx-1">
            <table className="w-full text-left">
              <thead>
                <tr className="border-y border-[#dbdcdb] bg-[#f7f7f7]">
                  <th className="font-verdana py-3 pl-4 pr-2 w-10 border-b border-[#dbdcdb]">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-red-600 accent-black cursor-pointer"
                    />
                  </th>
                  <th className="py-3 px-3 text-sm font-semibold text-[#5f5f5f] tracking-wide">
                    Name
                  </th>
                  <th className="py-3 px-3 text-sm font-semibold text-[#5f5f5f] tracking-wide w-24">
                    Products
                  </th>
                  <th className="py-3 px-3 text-sm font-semibold text-[#5f5f5f] tracking-wide">
                    Preorder when
                  </th>
                  <th className="py-3 px-3 text-sm font-semibold text-[#5f5f5f] tracking-wide">
                    Starts at
                  </th>
                  <th className="py-3 px-3 text-sm font-semibold text-[#5f5f5f] tracking-wide">
                    Ends at
                  </th>
                  <th className="py-3 px-3 text-sm font-semibold text-[#5f5f5f] tracking-wide w-24">
                    Status
                  </th>
                  <th className="py-3 pl-3 pr-4 text-sm font-semibold text-[#5f5f5f] tracking-wide w-24">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {preorders.map((preorder) => (
                  <ListItem key={preorder.id} preorder={preorder} refetch={refetch}/>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="bg-[#f7f7f7] flex items-center justify-center gap-4 py-3 border-t border-[#dbdcdb]">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="p-1 rounded-md text-text-primary cursor-pointer hover:text-gray-700 hover:bg-gray-100 transition-colors disabled:text-gray-400"
          >
            <ChevronLeft size={16} strokeWidth={4} />
          </button>

          <span className="text-sm font-medium text-gray-700">
            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)}{" "}
            from {total}
          </span>

          <button
            onClick={handleNext}
            disabled={page === totalPages || isPlaceholderData}
            className="p-1 rounded-md text-text-primary hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer disabled:text-gray-400"
          >
            <ChevronRight size={16} strokeWidth={4} />
          </button>
        </div>

       
      </div>
    </div>
  );
};

export default ListTable;
