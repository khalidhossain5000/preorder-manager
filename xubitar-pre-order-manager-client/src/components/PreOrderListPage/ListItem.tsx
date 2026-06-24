"use client";
import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import useAxios from "@/hooks/useAxios";
import { toast } from "sonner";
import DeleteConfirmDialog from "./DeleteAlert";
import Link from "next/link";

export interface Preorder {
  id: number;
  name: string;
  products: number;
  preOrderWhen: string;
  startsAt: string;
  endsAt?: string;
  status: "ACTIVE" | "INACTIVE";
}

type ListItemProps = {
  preorder: Preorder;
  refetch: () => void;
};

const ListItem = ({ preorder, refetch }: ListItemProps) => {
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(false);

  // const [preorder.status, setpreorder.status] = useState(preorder.status);

  const handleToggleStatus = async () => {
 



    try {
      setLoading(true);

      const res = await axiosInstance.patch(
        `/api/preorder/update-status/${preorder.id}/status`,
      );

      if (res.data.success) {
        toast.success("Status updated successfully", {
          position: "top-center",
        });
        refetch()
      }
    } catch (error) {
      console.error(error);
      //set status if fail to update
    } finally {
      setLoading(false);
    }
  };

  //handle delete
  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.delete(
        `/api/preorder/delete/${preorder.id}`,
      );
      if (res.data.success) {
        toast.success("Pre Order Deleted Succesfully", {
          position: "top-center",
        });
        refetch();
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Delete failed", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <tr className="border-y border-[#dbdcdb] hover:bg-gray-50 transition-colors">
      {/* Checkbox */}
      <td className="py-3 pl-4 pr-2 w-10 ">
        <input
          type="checkbox"
          className="w-4 h-4 rounded border-gray-300 accent-text-text-primary cursor-pointer"
        />
      </td>

      {/* Name */}
      <td className="py-3 px-3 text-sm font-bold font-verdana text-text-primary min-w-40 ">
        {preorder.name} Multi Variant
      </td>

      {/* Products */}
      <td className="py-3 px-3 text-sm text-text-primary w-24 font-verdana ">
        {preorder.products}
      </td>

      {/* Preorder When */}
      <td className="py-3 px-3 text-sm text-text-primary min-w-40 font-inter">
        {preorder.preOrderWhen}
      </td>

      {/* Starts At */}
      <td className="py-3 px-3 text-[13px] font-medium text-text-primary min-w-45 font-inter">
        {new Date(preorder.startsAt)
          .toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
          .toUpperCase()}
      </td>

      {/* Ends At */}
      <td className="py-3 px-3 text-sm text-text-primary min-w-45 font-verdana ">
        {preorder.endsAt
          ? new Date(preorder.endsAt ?? "")
              .toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
              .toUpperCase()
          : "Not Available"}
      </td>

      {/* Status Toggle */}

      <td className="py-3 px-3 w-24">
        {loading ? (
          "Updating....."
        ) : (
          <div
            onClick={handleToggleStatus}
            className={`relative inline-flex h-6 w-[42px] shrink-0 cursor-pointer items-center rounded-lg p-[3px] transition-colors duration-200 ease-in-out ${
              preorder.status === "ACTIVE" ? "bg-neutral-900" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-[18px] w-3.5 rounded-[4px] bg-white shadow-sm transition-transform duration-200 ease-in-out ${
                preorder.status === "ACTIVE"
                  ? "translate-x-[22px]"
                  : "translate-x-0"
              }`}
            />
          </div>
        )}
      </td>
      {/* Actions */}

      <td className="py-3 pl-3 pr-4 w-24">
        <div className="flex items-center gap-2.5">
          {/* Edit Button */}
          <Link href={`/update-preorder/${preorder?.id}`}>
          <button className="group flex h-9 w-9 items-center justify-center rounded-[10px] border border-neutral-300/70 bg-gradient-to-b from-white to-neutral-50/60 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06),0_2px_4px_-1px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-200 hover:border-neutral-300 hover:shadow-[0_5px_8px_-1px_rgba(0,0,0,0.08),0_2px_5px_-1px_rgba(0,0,0,0.05)] active:scale-[0.98] cursor-pointer">
            <Pencil
              size={16}
              strokeWidth={1.5}
              className="text-neutral-700 transition-colors group-hover:text-neutral-900"
            />
          </button>
          </Link>

          {/* Delete Button */}

          <DeleteConfirmDialog onConfirm={handleDelete} loading={loading}>
            <button className="group flex h-9 w-9 items-center justify-center rounded-[10px] border border-neutral-300/70 bg-gradient-to-b from-white to-neutral-50/60 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06),0_2px_4px_-1px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-200 hover:border-red-200 hover:from-white hover:to-red-50/40 hover:shadow-[0_5px_8px_-1px_rgba(0,0,0,0.08)] active:scale-[0.98] cursor-pointer">
              <Trash2
                size={16}
                strokeWidth={1.5}
                className="text-neutral-700 transition-colors group-hover:text-red-600"
              />
            </button>
          </DeleteConfirmDialog>
        </div>
      </td>
    </tr>
  );
};

export default ListItem;
