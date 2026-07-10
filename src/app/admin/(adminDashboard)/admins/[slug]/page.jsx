import AdminForm from "@/components/adminComponent/AdminForm";
import { getUserDetailById, getUserSession } from "@/serverActions/auth";
import { getCourseBySlug } from "@/serverActions/course";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params, searchParams }) => {
  const param = await params;
  const search = await searchParams;
  const user = await getUserSession();
  const isSuperAdmin = user.role == "superAdmin";

  if (param.slug !== "add" && param.slug !== "edit") {
    return notFound();
  }
  let data = {};
  if (param.slug === "edit") {
    data = await getUserDetailById(search.slug);
  }

  return (
    <>
      <div className="p-8 max-w-7xl">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex gap-4 items-center">
            <Link href={"/admin/admins"}>
              <ArrowLeft />
            </Link>
            <h2 className="capitalize">{param.slug} Course Content</h2>
          </div>

          <div className="mt-4">
            <AdminForm
              initialData={data}
              isEdit={param.slug === "edit"}
              isSuperAdmin={isSuperAdmin}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

// const
