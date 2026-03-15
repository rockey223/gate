import CourseForm from "@/components/adminComponent/CourseForm";
import { getCourseBySlug } from "@/serverActions/course";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params, searchParams }) => {
  const param = await params;
  const search = await searchParams;

  if (param.slug !== "add" && param.slug !== "edit") {
    return notFound();
  }
  let data = {};
  if (param.slug === "edit") {
    data = await getCourseBySlug(search.slug);
  }

  return (
    <>
      <div className="p-8 max-w-7xl">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex gap-4 items-center">
            <Link href={"/admin/course-content"}>
              <ArrowLeft />
            </Link>
            <h2 className="capitalize">
              {param.slug}{" "}
              Course Content
            </h2>
          </div>

          <div className="mt-4">
            <CourseForm
              initialData={data.data}
              isEdit={param.slug === "edit"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

// const
