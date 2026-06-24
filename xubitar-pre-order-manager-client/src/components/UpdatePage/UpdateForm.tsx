"use client";

import React from "react";
import { useParams } from "next/navigation";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import GlobalSpinner from "../Loader/GlobalSpinner";
import EditFormFields from "./EditFormFields";


const UpdateForm = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();

  // Async data fetching using TanStack Query
  const { data: preorder, isLoading } = useQuery({
    queryKey: ["preorder", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/preorder/${id}`);
      return res.data.data; // Ensure your response payload maps exactly to res.data.data
    },
    enabled: !!id, // Query fires only if a valid ID exists in route parameters
  });

  // Render global loading spinner while asynchronously fetching campaign data
  if (isLoading) return <GlobalSpinner />;
  
  // Guard clause if data is undefined or API query fails
  if (!preorder) {
    return (
      <div className="text-center p-8 text-gray-500 font-medium">
        No preorder campaign data found.
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 flex justify-center font-sans">
      <div className="w-full max-w-5xl mx-auto">
        {/* Render child form only when data is fully loaded to prevent state-synchronization issues */}
        <EditFormFields preorder={preorder} id={id as string}  />
      </div>
    </div>
  );
};

export default UpdateForm;