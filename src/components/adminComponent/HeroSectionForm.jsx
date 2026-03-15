"use client";
import { Plus, Pencil, Trash2, Save, X, CloudUpload } from "lucide-react";
import { useState } from "react";
import { updateHeroSection } from "@/serverActions/heroSection";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const heroSectionDataSchema = z.object({
  heroTitle: z.string().min(1, "Hero title is required"),
  heroSubtitle: z.string().min(1, "Hero subtitle is required"),
});

const HeroSectionForm = ({ data }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(heroSectionDataSchema),
    defaultValues: {
      heroTitle: data?.heroTitle || "",
      heroSubtitle: data?.heroSubtitle || "",
    },
  });

  const [file, setFile] = useState(data?.bannerImage || null);
  const [removedImage, setRemovedImage] = useState("");
  // console.log("ban", data.bannerImage);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const removeFile = () => {
    setRemovedImage(data?.bannerImage || "");
    setFile(null);
  };
  const onSubmit = async (formData) => {
    if (!file && !data?.bannerImage) {
      alert("Please select a banner image");
      return;
    }

    const response = await updateHeroSection({
      id: data?._id,
      heroTitle: formData.heroTitle,
      heroSubtitle: formData.heroSubtitle,
      removedImage,
      bannerImage: file || null,
    });
    console.log("response", response);

    if (response.status === 200 || response.status === 201) {
      console.log(response);
      
      setFile(response?.heroSection?.bannerImage);
      setRemovedImage("");
      router.push("/admin/homepage");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="heroTitle" className="block text-sm font-medium mb-1">
          Hero Title
        </label>
        <input
          id="heroTitle"
          type="text"
          {...register("heroTitle")}
          name="heroTitle"
          placeholder="Enter hero title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.heroTitle && (
          <p className="text-red-500 text-sm mt-1">
            {errors.heroTitle.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="heroSubtitle"
          className="block text-sm font-medium mb-1"
        >
          Hero Subtitle
        </label>
        <input
          id="heroSubtitle"
          type="text"
          {...register("heroSubtitle")}
          name="heroSubtitle"
          placeholder="Enter hero subtitle"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.heroSubtitle && (
          <p className="text-red-500 text-sm mt-1">
            {errors.heroSubtitle.message}
          </p>
        )}
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
              data?.bannerImage && !removedImage
                ? file
                : URL.createObjectURL(file)
            }
            alt="Uploaded banner"
          />
        </div>
      ) : (
        <div className="h-80 border-dashed w-full border-black border-2 rounded-md flex items-center justify-center text-gray-500">
          <label
            htmlFor="bannerImage"
            className=" font-medium mb-1 flex items-center gap-2 cursor-pointer text-2xl w-full h-full text-center justify-center"
          >
            <CloudUpload className="size-8" />
            Banner Image
          </label>
          <input
            id="bannerImage"
            type="file"
            onChange={handleFileChange}
            placeholder="upload banner image"
            className="hidden w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      <div className="flex justify-end items-center gap-3 pt-2 ">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 flex items-center gap-2 cursor-pointer"
        >
          <Save className="size-4" />
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default HeroSectionForm;
