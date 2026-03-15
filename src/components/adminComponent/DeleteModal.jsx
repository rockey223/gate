"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const DeleteModal = ({ id, fn }) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
        onClick={() => router.push(pathname)}
      >
        <div
          className="bg-white rounded-lg p-6 w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-semibold mb-2">Are you sure?</h2>
          <p className="text-gray-600 mb-6">
            This will permanently delete this item. This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => router.push(pathname)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                const response = await fn(id);
                if (response.status === 200) {
                  //   alert("Item deleted successfully");
                  router.push(pathname, { scroll: false });
                }
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
