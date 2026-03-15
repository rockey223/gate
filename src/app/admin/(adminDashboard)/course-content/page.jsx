import DeleteModal from "@/components/adminComponent/DeleteModal";
import { deleteCourse, getAllCourses } from "@/serverActions/course";
import { Plus, Pencil, Trash2, BookOpen, X } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = async ({ searchParams }) => {
  const query = await searchParams;
  const { data } = await getAllCourses();

  return (
    <>
      <div className="p-8 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold mb-2">Course Content</h1>
          <p className="text-gray-600">
            Manage your course listings and details
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-xl">All Courses</h2>
              <p className="text-sm text-gray-600 mt-1">
                {data.length} course
                {data.length !== 1 ? "s" : ""} available
              </p>
            </div>
            <Link
              href="/admin/course-content/add"
              // onClick={openAddDialog}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="size-4" />
              Add Course
            </Link>
          </div>

          {data.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <BookOpen className="size-12 mx-auto mb-4 text-gray-400" />
              <p className="mb-4">No courses added yet</p>
              <Link
                href="/admin/course-content/add"
                // onClick={openAddDialog}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 inline-flex items-center gap-2"
              >
                <Plus className="size-4" />
                Add Your First Course
              </Link>
            </div>
          ) : (
            <div className="border rounded-lg overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 w-[250px]">
                      Course Title
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 w-[120px]">
                      Duration
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 w-[140px]">
                      Level
                    </th>

                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 w-[100px]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((course) => (
                    <tr key={course._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{course.title}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {course.shortDescription.length > 80
                          ? course.shortDescription.substring(0, 80) + "..."
                          : course.shortDescription}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {course.duration} years
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block  py-1 rounded text-xs font-medium `}
                        >
                          {course.level}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-1">
                          <Link
                            href={`/admin/course-content/edit?slug=${course.slug}`}
                            // onClick={() => openEditDialog(course)}
                            className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md"
                          >
                            <Pencil className="size-4" />
                          </Link>
                          <Link
                            href={`?delete=true&id=${course._id}`}
                            // onClick={() => setDeleteId(course.id)}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
                          >
                            <Trash2 className="size-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {query.delete === "true" && (
        <DeleteModal id={query.id} fn={deleteCourse} />
      )}
    </>
  );
};

export default page;
