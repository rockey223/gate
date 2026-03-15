"use client";
import React from "react";
import z from "zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateContactPage } from "@/serverActions/contactPage";
import { isDirty } from "zod/v3";
const contactPageSchema = z.object({
  email: z.email("Enter valid email"),
  phoneNumber: z
    .string()
    .min(10, "Enter correct phone number")
    .max(10, "Enter correct phone number"),
  address: z.string().min(3, "Enter address"),
  facebookUrl: z.url("Enter valid URL").or(z.literal("")),
  linkedInUrl: z.url("Enter valid URL").or(z.literal("")),
  twitterUrl: z.url("Enter valid URL").or(z.literal("")),
  tiktokUrl: z.url("Enter valid URL").or(z.literal("")),
  instagramUrl: z.url("Enter valid URL").or(z.literal("")),
});
const CotactPageContentForm = ({ initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(contactPageSchema),
    defaultValues: initialData
      ? { ...initialData }
      : {
          email: "",
          phoneNumber: "",
          address: "",
          facebookUrl: "",
          linkedInUrl: "",
          twitterUrl: "",
          tiktokUrl: "",
          instagramUrl: "",
        },
  });

  const onSubmit = async (data) => {
    const result = await updateContactPage(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold text-xl mb-4">Contact Information</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              name="email"
              //   value={formData.email}
              //   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              {...register("phoneNumber")}
              name="phoneNumber"
              //   value={formData.phone}
              //   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter phone number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">
              Address
            </label>
            <input
              id="address"
              type="text"
              {...register("address")}
              name="address"
              //   value={formData.address}
              //   onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Enter physical address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold text-xl mb-4">Social Media Links</h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="facebook"
              className="block text-sm font-medium mb-1"
            >
              Facebook URL
            </label>
            <input
              id="facebook"
              type="url"
              {...register("facebookUrl")}
              name="facebookUrl"
              //   value={formData.socialMedia.facebook}
              //   onChange={(e) =>
              //     setFormData({
              //       ...formData,
              //       socialMedia: { ...formData.socialMedia, facebook: e.target.value },
              //     })
              //   }
              placeholder="https://facebook.com/yourpage"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="twitter" className="block text-sm font-medium mb-1">
              Twitter/X URL
            </label>
            <input
              id="twitter"
              type="url"
              {...register("twitterUrl")}
              name="twitterUrl"
              //   value={formData.socialMedia.twitter}
              //   onChange={(e) =>
              //     setFormData({
              //       ...formData,
              //       socialMedia: { ...formData.socialMedia, twitter: e.target.value },
              //     })
              //   }
              placeholder="https://twitter.com/yourhandle"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="linkedin"
              className="block text-sm font-medium mb-1"
            >
              LinkedIn URL
            </label>
            <input
              id="linkedin"
              type="url"
              {...register("linkedInUrl")}
              name="linkedInUrl"
              //   value={formData.socialMedia.linkedin}
              //   onChange={(e) =>
              //     setFormData({
              //       ...formData,
              //       socialMedia: { ...formData.socialMedia, linkedin: e.target.value },
              //     })
              //   }
              placeholder="https://linkedin.com/company/yourcompany"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="tiktok" className="block text-sm font-medium mb-1">
              Tiktok URL
            </label>
            <input
              id="tiktok"
              type="url"
              {...register("tiktokUrl")}
              name="tiktokUrl"
              //   value={formData.socialMedia.linkedin}
              //   onChange={(e) =>
              //     setFormData({
              //       ...formData,
              //       socialMedia: { ...formData.socialMedia, linkedin: e.target.value },
              //     })
              //   }
              placeholder="https://linkedin.com/company/yourcompany"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="instagram"
              className="block text-sm font-medium mb-1"
            >
              Instagram URL
            </label>
            <input
              id="Instagram"
              type="url"
              {...register("instagramUrl")}
              name="instagramUrl"
              //   value={formData.socialMedia.linkedin}
              //   onChange={(e) =>
              //     setFormData({
              //       ...formData,
              //       socialMedia: { ...formData.socialMedia, linkedin: e.target.value },
              //     })
              //   }
              placeholder="https://linkedin.com/company/yourcompany"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 items-center">
        {/* <button
          //   onClick={() => setFormData(contactData)}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Reset Changes
        </button> */}
        {!isDirty && <p className="text-gray-500">No changes to save</p>}
        <button
          type="submit"
          //   onClick={handleSave}
          disabled={isSubmitting || !isDirty}
          className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-md disabled:bg-gray-400 hover:bg-blue-700 flex items-center gap-2"
        >
          <Save className="size-4" />
          {isSubmitting ? "saving" : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default CotactPageContentForm;
