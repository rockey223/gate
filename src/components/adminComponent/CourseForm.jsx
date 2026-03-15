"use client";
import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Trash2, X } from "lucide-react";
import { addCourse, editCourse } from "@/serverActions/course";
import { useRouter } from "next/navigation";

// Helper to create slug
const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

// Zod schema
const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  duration: z.string().min(1, "Duration is required"),
  studentsEnrolled: z.string().optional(),
  level: z.string().optional(),
  whyChooseThis: z
    .array(
      z.object({
        title: z.string().optional(),
        description: z.string().optional(),
      }),
    )
    .optional(),
  syllabus: z
    .array(
      z.object({
        title: z.string().optional(),
        course: z.array(z.string()).optional(),
      }),
    )
    .optional(),
  careerOportunities: z.array(z.string()).optional(),
  facilities: z.array(z.string()).optional(),
  admissionRequirements: z.array(z.string()).optional(),
});

export default function CourseForm({ initialData, isEdit }) {
  const router = useRouter();
  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: initialData
      ? { ...initialData }
      : {
          whyChooseThis: [],
          syllabus: [],
          careerOportunities: [],
        },
  });

  // whyChooseThis dynamic array
  const {
    fields: whyFields,
    append: appendWhy,
    remove: removeWhy,
  } = useFieldArray({
    control,
    name: "whyChooseThis",
  });

  // syllabus dynamic array
  const {
    fields: syllabusFields,
    append: addSyllabus,
    remove: removeSyllabus,
  } = useFieldArray({
    control,
    name: "syllabus",
  });
  // career
  const {
    fields: careerFields,
    append: addCareer,
    remove: removeCareer,
  } = useFieldArray({
    control,
    name: "careerOportunities",
  });

  // facilities
  const {
    fields: facilitiesFields,
    append: addFacilities,
    remove: removeFacilities,
  } = useFieldArray({
    control,
    name: "facilities",
  });

  // admission requirement
  const {
    fields: admissionFields,
    append: addAdmission,
    remove: removeAdmission,
  } = useFieldArray({
    control,
    name: "admissionRequirements",
  });

  const title = watch("title");

  // auto-generate slug from title
  useEffect(() => {
    if (title) setValue("slug", slugify(title));
  }, [title, setValue]);

  const onSubmit = async (data) => {
    try {
      let res;
      if (isEdit && initialData) {
        res = await editCourse(initialData.slug, data);
      } else {
        res = await addCourse(data);
      }
      if (res.status == 200 || res.status == 201) {
        router.push("/admin/course-content");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Title */}
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          {...register("title")}
          placeholder="Enter Course title"
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Slug */}
      <div>
        <label className="block mb-1 font-medium">Slug</label>
        <input
          {...register("slug")}
          placeholder="Slug..."
          readOnly
          className="w-full px-3 py-2 border rounded-md bg-gray-100"
        />
      </div>

      {/* Short Description */}
      <div>
        <label className="block mb-1 font-medium">Short Description</label>
        <textarea
          {...register("shortDescription")}
          placeholder="Short Description"
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.shortDescription && (
          <p className="text-red-500 text-sm">
            {errors.shortDescription.message}
          </p>
        )}
      </div>

      {/* Duration */}
      <div>
        <label className="block mb-1 font-medium">Duration</label>
        <input
          type="text"
          {...register("duration")}
          placeholder="Duration"
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.duration && (
          <p className="text-red-500 text-sm">{errors.duration.message}</p>
        )}
      </div>

      {/* Students Enrolled */}
      <div>
        <label className="block mb-1 font-medium">Students Enrolled</label>
        <input
          type="text"
          {...register("studentsEnrolled")}
          placeholder="Students Enrolled"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      {/* Level */}
      <div>
        <label className="block mb-1 font-medium">Level</label>
        <input
          {...register("level")}
          placeholder="Level (Bachelor, Masters)"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      {/* Why Choose This */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Why Choose This Course</h2>
          <button
            type="button"
            onClick={() => appendWhy({ title: "", description: "" })}
            className="px-3 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
          >
            Add
          </button>
        </div>
        {whyFields.map((field, index) => (
          <div
            key={field.id}
            className="border p-4 rounded-md relative space-y-2"
          >
            <input
              {...register(`whyChooseThis.${index}.title`)}
              placeholder="Title"
              className="w-full px-3 py-2 border rounded-md mt-5"
            />
            <textarea
              {...register(`whyChooseThis.${index}.description`)}
              placeholder="Description"
              className="w-full px-3 py-2 border rounded-md"
            />
            <button
              type="button"
              onClick={() => removeWhy(index)}
              className="absolute -top-2 -right-2 text-red-500 cursor-pointer"
            >
              <X />
            </button>
          </div>
        ))}
      </div>

      {/* Syllabus */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Syllabus</h2>
          <button
            type="button"
            onClick={() => addSyllabus({ title: "", course: [] })}
            className="px-3 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
          >
            Add
          </button>
        </div>
        {syllabusFields.map((section, index) => (
          <SyllabusSection
            key={section.id}
            control={control}
            register={register}
            sectionIndex={index}
            removeSyllabus={removeSyllabus}
          />
        ))}
      </div>

      {/* career */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Career Opportunities</h2>
          <button
            type="button"
            onClick={() => addCareer("")}
            className="px-3 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
          >
            Add
          </button>
        </div>
        {careerFields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-md relative flex gap-3 items-center"
          >
            <input
              {...register(`careerOportunities.${index}`)}
              placeholder="Title"
              className="w-full px-3 py-2 border rounded-md "
            />

            <button
              type="button"
              onClick={() => removeCareer(index)}
              className=" text-red-500 cursor-pointer flex justify-center items-center"
            >
              <Trash2 />
            </button>
          </div>
        ))}
      </div>
      {/* facilities */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Facilities</h2>
          <button
            type="button"
            onClick={() => addFacilities("")}
            className="px-3 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
          >
            Add
          </button>
        </div>
        {facilitiesFields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-md relative flex gap-3 items-center"
          >
            <input
              {...register(`facilities.${index}`)}
              placeholder="Facilities"
              className="w-full px-3 py-2 border rounded-md "
            />

            <button
              type="button"
              onClick={() => removeFacilities(index)}
              className=" text-red-500 cursor-pointer flex justify-center items-center"
            >
              <Trash2 />
            </button>
          </div>
        ))}
      </div>
      {/* admission requirement */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Admission Requirements</h2>
          <button
            type="button"
            onClick={() => addAdmission("")}
            className="px-3 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
          >
            Add
          </button>
        </div>
        {admissionFields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-md relative flex gap-3 items-center"
          >
            <input
              {...register(`admissionRequirements.${index}`)}
              placeholder="Facilities"
              className="w-full px-3 py-2 border rounded-md "
            />

            <button
              type="button"
              onClick={() => removeAdmission(index)}
              className=" text-red-500 cursor-pointer flex justify-center items-center"
            >
              <Trash2 />
            </button>
          </div>
        ))}
      </div>

      {/* Submit */}
      <div className="flex items-center mt-4 gap-4 justify-end">
        {!isDirty && <p className="text-gray-500">No changes made to save</p>}
        <button
          type="submit"
          disabled={!isDirty || isSubmitting}
          className="px-6 py-2 cursor-pointer bg-green-600 disabled:bg-gray-400 text-white rounded-md"
        >
          {isSubmitting ? "Saving..." : "Save Course"}
        </button>
      </div>
    </form>
  );
}

function SyllabusSection({ control, register, sectionIndex, removeSyllabus }) {
  const {
    fields: courseFields,
    append: addCourse,
    remove: removeCourse,
  } = useFieldArray({
    control,
    name: `syllabus.${sectionIndex}.course`,
  });

  return (
    <div className="border p-4 rounded-md space-y-2 relative">
      <input
        {...register(`syllabus.${sectionIndex}.title`)}
        placeholder="Semseter / year"
        className="w-full px-3 py-2 border rounded-md mt-4"
      />

      {courseFields.map((course, courseIndex) => (
        <div key={course.id} className="flex gap-2 items-center">
          <input
            {...register(`syllabus.${sectionIndex}.course.${courseIndex}`)}
            placeholder="Course Topic"
            className="flex-1 px-3 py-2 border rounded-md"
          />
          <button
            type="button"
            onClick={() => removeCourse(courseIndex)}
            className="text-red-500 cursor-pointer"
          >
            <Trash2 />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => addCourse("")}
        className="w-full border-dashed border-2 rounded-md py-2 text-blue-500 text-sm cursor-pointer"
      >
        + Add Course Topic
      </button>

      <button
        type="button"
        onClick={() => removeSyllabus(sectionIndex)}
        className="text-red-600 text-sm mt-1 absolute -top-3 -right-2 cursor-pointer"
      >
        <X />
      </button>
    </div>
  );
}
