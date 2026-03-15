"use client";
import React, { useState } from "react";
import { CloudUpload, Router, X } from "lucide-react";
import {
  redirect,
  RedirectType,
  usePathname,
  useRouter,
} from "next/navigation";
import Link from "next/link";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createWhyChooseUs,
  updateWhyChooseUs,
} from "@/serverActions/whyChooseUs";

const whyChooseUsDataSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

const WhyChooseUsForm = ({ initialData, isEditMode = false }) => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(whyChooseUsDataSchema),
    defaultValues: initialData
      ? { ...initialData }
      : { title: "", description: "" },
  });

  const [file, setFile] = useState(initialData?.image || null);
  const [removedImage, setRemovedImage] = useState("");
  // console.log("ban", data.bannerImage);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const removeFile = () => {
    setRemovedImage(initialData?.image || "");
    setFile(null);
  };

  const onSubmit = async (formData) => {
    if (!file && !initialData?.image) {
      alert("Please select an image");
      return;
    }
    if (isEditMode) {
      // handle update logic here
      const response = await updateWhyChooseUs({
        id: initialData._id,
        ...formData,
        removedImage,
        image: file || null,
      });
      console.log("response", response);
    } else {
      // handle create logic here
      const response = await createWhyChooseUs({
        ...formData,
        image: file || null,
      });
      console.log("response", response);
    }
    router.push("/admin/homepage", { scroll: false });
    // redirect("/admin/homepage", RedirectType.push);
    // console.log("form data", formData);
    // console.log("file", file);
    // console.log("removed image", removedImage);
    // const response = await createWhyChooseUs({
    //   ...formData,
    //   image: file || null,
    // });
    // console.log("response", response);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50"
        // onClick={() => setIsAddWhyChooseUsOpen(false)}
      >
        <div
          className="bg-white rounded-lg p-6 w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Add Why Choose Us Item</h2>
              <p className="text-sm text-gray-600 mt-1">
                Add a reason why customers should choose you
              </p>
            </div>
            <Link
              href={pathname}
              scroll={false}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="size-5" />
            </Link>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div>
              <label
                htmlFor="newWhyChooseUsTitle"
                className="block text-sm font-medium mb-1"
              >
                Title
              </label>
              <input
                id="newWhyChooseUsTitle"
                type="text"
                {...register("title")}
                name="title"
                // value={whyChooseUsForm.title}
                // onChange={(e) =>
                //   setWhyChooseUsForm({
                //     ...whyChooseUsForm,
                //     title: e.target.value,
                //   })
                // }
                placeholder="Enter title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="newWhyChooseUsDescription"
                className="block text-sm font-medium mb-1"
              >
                Description
              </label>
              <textarea
                id="newWhyChooseUsDescription"
                {...register("description")}
                name="description"
                // value={whyChooseUsForm.description}
                // onChange={(e) =>
                //   setWhyChooseUsForm({
                //     ...whyChooseUsForm,
                //     description: e.target.value,
                //   })
                // }
                placeholder="Enter description"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            {file ? (
              <div className="h-80 border-dashed w-full border-black border-2 rounded-md flex items-center justify-center text-gray-500 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center  transition-opacity">
                  <button
                    onClick={removeFile}
                    className="mb-4 flex items-center gap-2 bg-red-400 text-white px-3 py-2 rounded-md cursor-pointer hover:bg-red-600 transition-colors"
                  >
                    <X className="size-4" />
                    Remove Image
                  </button>
                </div>
                <img
                  src={
                    initialData?.image && !removedImage
                      ? file
                      : URL.createObjectURL(file)
                  }
                  alt="Uploaded banner"
                />
              </div>
            ) : (
              <div className="h-80 border-dashed w-full border-black border-2 rounded-md flex items-center justify-center text-gray-500">
                <label
                  htmlFor="newWhyChooseUsImage"
                  className=" font-medium mb-1 flex items-center gap-2 cursor-pointer text-2xl w-full h-full text-center justify-center"
                >
                  <CloudUpload className="size-8" />
                  Image
                </label>
                <input
                  id="newWhyChooseUsImage"
                  type="file"
                  onChange={handleFileChange}
                  placeholder="upload banner image"
                  className="hidden w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            <div className="flex justify-end gap-3">
              <Link
                href={pathname}
                scroll={false}
                //   onClick={() => setIsAddWhyChooseUsOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                //   onClick={handleAddWhyChooseUs}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer disabled:bg-gray-400"
              >
                {isEditMode
                  ? isSubmitting
                    ? "Saving..."
                    : "Update Item"
                  : isSubmitting
                    ? "Saving..."
                    : "Add Item"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default WhyChooseUsForm;
