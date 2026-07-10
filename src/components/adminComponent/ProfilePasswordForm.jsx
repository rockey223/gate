"use client";
import { updatePassword } from "@/serverActions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const passwordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ProfilePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(passwordSchema),
  });
  const onSubmit = async (data) => {
    console.log("data", data);

    const res = await updatePassword(data);
    console.log(res);
    if (res.status === 200) {
      reset();
    }
  };
  console.log(errors);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg border border-gray-200 p-6 mb-6"
      >
        <h2 className="font-semibold text-xl mb-4">Change Password</h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium mb-1"
            >
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              {...register("currentPassword")}
              placeholder="Enter current password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium mb-1"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                {...register("newPassword")}
                placeholder="Enter new password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm new password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 cursor-pointer border border-gray-300 rounded-md hover:bg-gray-50"
            // onClick={() => toast.success("Password updated successfully!")}
          >
            Update Password
          </button>
        </div>
      </form>
    </>
  );
};

export default ProfilePasswordForm;
