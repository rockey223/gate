"use client";
import { createAdmin, editAdmin } from "@/serverActions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
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
  role: z.string(),
  password: z.string(),
});

const AdminForm = ({ initialData, isEdit, isSuperAdmin }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: initialData
      ? { ...initialData }
      : {
          name: "",
          email: "",
          phone: "",
          address: "",
        },
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data) => {
    try {
      let res;
      if (isEdit && initialData) {
        res = await editAdmin(initialData._id, data);
      } else {
        res = await createAdmin(data);
      }

      if (res.status == 200 || res.status == 201) {
        router.push("/admin/admins");
      }
      if (res.status >= 400) {
        console.log("error",res);
       
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
        <div>
          <label
            htmlFor="newUserName"
            className="block text-sm font-medium mb-1"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="newUserName"
            type="text"
            {...register("name")}
            // value={userForm.name}
            // onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
            placeholder="Enter full name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="newUserEmail"
            className="block text-sm font-medium mb-1"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="newUserEmail"
            type="email"
            {...register("email")}
            disabled={isEdit}
            // value={userForm.email}
            // onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
            placeholder="Enter email address"
            className="w-full px-3 disabled:text-gray-500 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="newUserPhone"
            className="block text-sm font-medium mb-1"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="newUserPhone"
            type="text"
            {...register("phone")}
            // value={userForm.phone}
            // onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
            placeholder="Enter phone number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="newUserRole"
            className="block text-sm font-medium mb-1"
          >
            Role <span className="text-red-500">*</span>
          </label>
          <select
            id="newUserRole"
            {...register("role")}
            // value={userForm.role}
            // onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select role</option>
            {isSuperAdmin && <option value="superAdmin">Super Admin</option>}
            <option value="admin">Admin</option>
            <option value="instructor">Instructor</option>
            <option value="student">Student</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label
            htmlFor="newUserAddress"
            className="block text-sm font-medium mb-1"
          >
            Address
          </label>
          <input
            id="newUserAddress"
            type="text"
            {...register("address")}
            // value={userForm.address}
            // onChange={(e) => setUserForm({ ...userForm, address: e.target.value })}
            placeholder="Enter address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="md:col-span-2">
          <label
            htmlFor="newUserPassword"
            className="block text-sm font-medium mb-1"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <input
            id="newUserPassword"
            type="password"
            {...register("password")}
            // value={userForm.password}
            // onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
            placeholder="Enter password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={() => router.push("/admin/admins")}
          className="px-4 py-2 cursor-pointer border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          // onClick={handleAddUser}
          className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {isEdit ? "Edit User" : "Add User"}
        </button>
      </div>
    </form>
  );
};

export default AdminForm;
