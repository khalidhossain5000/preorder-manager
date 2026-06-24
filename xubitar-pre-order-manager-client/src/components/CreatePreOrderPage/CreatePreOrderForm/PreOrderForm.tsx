"use client";

import React, { useState, useRef } from "react";
import { ChevronLeft, Calendar, ChevronDown } from "lucide-react";
import { FormRow } from "./FormRow";
import Link from "next/link";
import useAxios from "@/hooks/useAxios";
import { toast } from "sonner";
import Loading from "@/components/Loader/Loading";

const PreOrderForm = () => {
  const [isActive, setIsActive] = useState(true);
  const [creating, setCreating] = useState(false);
  const axiosInstance = useAxios();
  // References to trigger the calendar pickers programmatically
  const startsAtRef = useRef<HTMLInputElement>(null);
  const endsAtRef = useRef<HTMLInputElement>(null);

  //for submit handler

  const handlePreOrderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData);
    const status = isActive ? "ACTIVE" : "INACTIVE";

    const startsAt = new Date(data.startsAt as string);
    const endsAt = new Date(data.endsAt as string);

    if (data.endsAt && endsAt <= startsAt) {
      alert("End date must be greater than start date");
      return;
    }

    const preOrderData = {
      ...data,
      products: Number(data.products),
      status,
    };

    console.log(preOrderData, "pre order data");

    //api call to save the data

    try {
      setCreating(true);
      const res = await axiosInstance.post(
        "/api/preorder/create",
        preOrderData,
      );

      console.log(res, "this is res");
      if (res.data.success) {
        toast.success("Pre Order Created Successfully", {
          position: "top-center",
        });
        setCreating(false);
      }
    } catch (error) {
      console.log(error, "while creating pre order");
      toast.error("Something went wrong while creating pre order");
      setCreating(false);
    }
  };
  return (
    <div className="min-h-screen p-4 md:p-8 flex justify-center font-sans">
      <div className="w-full max-w-5xl mx-auto">
        <form onSubmit={handlePreOrderSubmit}>
          {/* Top Navigation / Action Bar */}
          <div className="flex justify-between items-center mb-6">
            <Link href={"/"}>
              <button className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 shadow-sm transition-colors cursor-pointer">
                <ChevronLeft size={16} className="mr-1" />
                Back
              </button>
            </Link>
            <div className="flex gap-3">
              <Link href={"/"}>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 shadow-sm transition-colors cursor-pointer">
                  Cancel
                </button>
              </Link>

              <button
                type="submit"
                className="px-4 py-1.5 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-black shadow-sm transition-colors cursor-pointer"
              >
                {creating ? <Loading /> : "    Save changes"}
              </button>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            {/* Card Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Preorder details
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                These values appear in the preorders list.
              </p>
            </div>

            {/* Card Body - Form Fields */}

            <div className="px-6">
              {/* Name */}
              <FormRow
                title="Name"
                required
                description="A label to recognize this preorder by."
              >
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue="Multi variant 3"
                  className="w-full max-w-xl px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-gray-900"
                />
              </FormRow>

              {/* Products */}
              <FormRow
                title="Products"
                description="Number of products covered by this preorder."
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      name="products"
                      required
                      defaultValue={0}
                      className="w-24 pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-gray-900"
                    />
                    {/* Custom Number Input Spinners Placeholder */}
                    <div className="absolute right-0 top-0 h-full w-6 border-l border-gray-200 bg-gray-50 rounded-r-md flex flex-col pointer-events-none">
                      <div className="h-1/2 border-b border-gray-200 flex items-center justify-center">
                        <ChevronDown
                          size={9}
                          className="rotate-180 text-gray-500"
                        />
                      </div>
                      <div className="h-1/2 flex items-center justify-center">
                        <ChevronDown size={9} className="text-gray-500" />
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">product(s)</span>
                </div>
              </FormRow>

              {/* Preorder When */}
              <FormRow
                title="Preorder when"
                description="When customers are allowed to preorder."
              >
                <div className="relative w-full max-w-xl">
                  <select
                    name="preorderWhen"
                    className="w-full px-3 py-2 pr-10 text-sm border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-gray-900 bg-white"
                  >
                    <option value="REGARDLESS_OF_STOCK">
                      regardless-of-stock
                    </option>
                    <option value="OUT_OF_STOCK">out-of-stock</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-400" />
                  </div>
                </div>
              </FormRow>

              {/* Starts At */}
              <FormRow
                title="Starts at"
                description="When the preorder window opens."
              >
                <div className="relative w-full max-w-xl">
                  <input
                    ref={startsAtRef}
                    name="startsAt"
                    type="datetime-local"
                    defaultValue="2026-9-15T20:24"
                    required
                    min={new Date().toISOString().slice(0, 16)}
                    onClick={(e) => e.currentTarget.showPicker?.()}
                    className="w-full px-3 py-2 pr-10 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-gray-900 [color-scheme:light] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:opacity-0 cursor-pointer"
                  />
                  <div
                    onClick={() => startsAtRef.current?.showPicker?.()}
                    className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
                  >
                    <Calendar size={16} className="text-gray-500" />
                  </div>
                </div>
              </FormRow>

              {/* Ends At */}
              <FormRow
                title="Ends at"
                description="Leave empty for no end date."
              >
                <div className="relative w-full max-w-xl">
                  <input
                    ref={endsAtRef}
                    name="endsAt"
                    type="datetime-local"
                    min={new Date().toISOString().slice(0, 16)}
                    onClick={(e) => e.currentTarget.showPicker?.()}
                    className="w-full px-3 py-2 pr-10 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-gray-900 [color-scheme:light] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:opacity-0 cursor-pointer"
                  />
                  <div
                    onClick={() => endsAtRef.current?.showPicker?.()}
                    className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
                  >
                    <Calendar size={16} className="text-gray-500" />
                  </div>
                </div>
              </FormRow>

              {/* Status (Toggle) */}
              <FormRow
                title="Status"
                description="Active preorders are visible to customers."
                noBorder
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsActive(!isActive)}
                    className={`relative inline-flex h-6 w-[45px] shrink-0 cursor-pointer items-center rounded-lg transition-colors duration-200 ease-in-out ${
                      isActive ? "bg-gray-900" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-[18px] w-3.5 rounded-[4px] bg-white shadow-sm transition-transform duration-200  ease-in-out ${
                        isActive ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span className="text-sm text-gray-600">
                    {isActive ? "Active" : "InActive"}
                  </span>
                </div>
              </FormRow>
            </div>

            {/* Card Footer */}
            <div className="p-4 sm:px-6 py-4 bg-gray-50/50 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl">
              <Link href={"/"}>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 shadow-sm transition-colors cursor-pointer">
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-black shadow-sm transition-colors"
              >
                {creating ? <Loading /> : "    Save changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreOrderForm;
