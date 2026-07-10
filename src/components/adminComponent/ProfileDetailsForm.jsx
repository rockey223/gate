"use client";
import { updateUser } from "@/serverActions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const userSchema = z.object({
  name: z.string().min(3, "name isrequired"),
  email: z.email("Enter valid email"),
  phone: z
    .string()
    .min(10, "Enter correct phone number")
    .max(10, "Enter correct phone number"),
  address: z.string(),
});

const ProfileDetailsForm = ({ user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: user
      ? { ...user }
      : {
          name: "",
          email: "",
          phone: "",
          address: "",
        },
    resolver: zodResolver(userSchema),
  });

  const handleSave = async (data) => {
    const res = await updateUser(data);
    // toast.success("Profile updated successfully!");
  };

  const handleAvatarChange = () => {
    // toast.info("Avatar upload coming soon!");
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              readOnly
              disabled
              placeholder="Enter your email"
              className=" disabled:text-gray-600 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder="Enter your phone number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium mb-1"
            >
              Location
            </label>
            <input
              id="location"
              type="text"
              {...register("address")}
              placeholder="Enter your location"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 cursor-pointer border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            disabled={!isDirty || isSubmitting}
            className="px-4 py-2 cursor-pointer disabled:bg-gray-500 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            type="submit"
          >
            <Save className="size-4" />
            Save Changes
          </button>
        </div>
        {!isDirty && (
          <p className="text-right text-gray-500 text-sm">No changes to save</p>
        )}
      </form>
    </>
  );
};

export default ProfileDetailsForm;
