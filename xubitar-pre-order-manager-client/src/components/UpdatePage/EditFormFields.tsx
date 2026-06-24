"use client";

import React, { useState, useRef } from "react";
import { ChevronLeft, Calendar, ChevronDown } from "lucide-react";
import Link from "next/link";
import { FormRow } from "../CreatePreOrderPage/CreatePreOrderForm/FormRow";
import { toast } from "sonner";
import Loading from "@/components/Loader/Loading";
import useAxios from "@/hooks/useAxios";
import { useRouter } from "next/navigation";

const formatDateTimeLocal = (isoString?: string) => {
  if (!isoString) return "";
  return new Date(isoString).toISOString().slice(0, 16);
};

// Define TypeScript interfaces for proper type safety
interface PreorderData {
  id: string;
  name: string;
  products: number;
  preOrderWhen: string;
  status: string;
  startsAt: string;
  endsAt: string | null;
}

interface EditFormFieldsProps {
  preorder: PreorderData;
  id: string;

}

const EditFormFields = ({ preorder, id  }: EditFormFieldsProps) => {
  const [isActive, setIsActive] = useState(preorder?.status === "ACTIVE");
  const [updating, setUpdating] = useState(false);
  const axiosInstance = useAxios();

  const startsAtRef = useRef<HTMLInputElement>(null);
  const endsAtRef = useRef<HTMLInputElement>(null);
const router=useRouter()
  // Submit handler to patch updated campaign data
  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const status = isActive ? "ACTIVE" : "INACTIVE";

    const startsAt = new Date(data.startsAt as string);
    const endsAt = data.endsAt ? new Date(data.endsAt as string) : null;

    // Validation: End date cannot be prior to start date
    if (endsAt && endsAt <= startsAt) {
      toast.warning("End date must be greater than start date",{
        position:"top-left"
      });
      return;
    }

    // Format final payload structure
    const updatedData = {
      ...data,
      products: Number(data.products),
      status,
    };

    try {
      setUpdating(true);
      // Make HTTP PATCH request to update preorder details
      const res = await axiosInstance.put(
        `/api/preorder/update-preorder/${id}`,
        updatedData,
      );
      console.log(res, "this is res");
      if (res.data.success) {
        
        toast.success("Pre Order Updated Successfully", {
          position: "top-center",
        });
        router.push('/')
      }
    } catch (error) {
      console.error("Error while updating pre order:", error);
      toast.error("Something went wrong while updating pre order");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <form onSubmit={handleUpdateSubmit}>
      {/* Top Navigation / Action Bar */}
      <div className="flex justify-between items-center mb-6">
        <Link href={"/"}>
          <button
            type="button"
            className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 shadow-sm transition-colors cursor-pointer"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back
          </button>
        </Link>
        <div className="flex gap-3">
          <Link href={"/"}>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 shadow-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </Link>

          <button
            type="submit"
            className="px-4 py-1.5 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-black shadow-sm transition-colors cursor-pointer flex items-center justify-center min-w-[120px]"
            disabled={updating}
          >
            {updating ? <Loading /> : "Save changes"}
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        {/* Card Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Update Preorder Details
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Modify the values for this preorder campaign.
          </p>
        </div>

        {/* Card Body - Form Fields */}
        <div className="px-6">
          {/* Campaign Name Input */}
          <FormRow
            title="Name"
            required
            description="A label to recognize this preorder by."
          >
            <input
              type="text"
              required
              name="name"
              defaultValue={preorder?.name || ""}
              className="w-full max-w-xl px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-gray-900"
            />
          </FormRow>

          {/* Product Counts Input */}
          <FormRow
            title="Products"
            description="Number of products covered by this preorder."
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="number"
                  required
                  name="products"
                  defaultValue={preorder?.products || 0}
                  className="w-24 pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-gray-900"
                />
                {/* Custom Number Input Spinners Decorator */}
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

          {/* Preorder Condition Select */}
          <FormRow
            title="Preorder when"
            description="When customers are allowed to preorder."
          >
            <div className="relative w-full max-w-xl">
              <select
                name="preOrderWhen"
                required
                defaultValue={preorder?.preOrderWhen || "REGARDLESS_OF_STOCK"}
                className="w-full px-3 py-2 pr-10 text-sm border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-gray-900 bg-white"
              >
                <option value="REGARDLESS_OF_STOCK">regardless-of-stock</option>
                <option value="OUT_OF_STOCK">out-of-stock</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </FormRow>

          {/* Campaign Starts At Input */}
          <FormRow
            title="Starts at"
            description="When the preorder window opens."
          >
            <div className="relative w-full max-w-xl">
              <input
                ref={startsAtRef}
                name="startsAt"
                type="datetime-local"
                min={new Date().toISOString().slice(0, 16)}
                defaultValue={formatDateTimeLocal(preorder?.startsAt)}
                required
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

          {/* Campaign Ends At Input */}
          <FormRow title="Ends at" description="Leave empty for no end date.">
            <div className="relative w-full max-w-xl">
              <input
                ref={endsAtRef}
                name="endsAt"
                type="datetime-local"
                min={new Date().toISOString().slice(0, 16)}
                defaultValue={formatDateTimeLocal(
                  preorder?.endsAt ?? undefined,
                )}
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

          {/* Preorder Status Custom Toggle */}
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
                  className={`inline-block h-[18px] w-3.5 rounded-[4px] bg-white shadow-sm transition-transform duration-200 ease-in-out ${
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

        {/* Card Footer Actions */}
        <div className="p-4 sm:px-6 py-4 bg-gray-50/50 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl">
          <Link href={"/"}>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 shadow-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-black shadow-sm transition-colors flex items-center justify-center min-w-[120px]"
            disabled={updating}
          >
            {updating ? <Loading /> : "Save changes"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditFormFields;
