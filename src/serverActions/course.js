"use server";
import Course from "@/models/course.model";
import { cleanData } from "@/utils/cleandata";
import connectToDatabase from "@/utils/connectDb";
import { refresh } from "next/cache";
import { getUserId } from "./auth";

export async function addCourse(data) {
  try {
    await connectToDatabase();
    const courses = await Course.findOne({ slug: data.slug });
    const id = await getUserId();

    if (courses) {
      return {
        message: "adding course failed, slug already exits",
        status: 409,
      };
    }
    const newCourse = await Course.create({
      ...data,
      addedBy: id,
      updatedBy: id,
    });
    console.log(newCourse);

    return {
      message: "Course created successfully",
      status: 201,
      data: cleanData(newCourse),
    };
  } catch (error) {
    console.log(error);

    return { message: "adding course failed", status: 500 };
  }
}

export async function getAllCourses() {
  try {
    await connectToDatabase();
    const courses = await Course.find();
    return {
      message: "Courses fetched successfully",
      status: 200,
      data: cleanData(courses),
    };
  } catch (error) {
    return { message: "fetching courses failed", status: 500 };
  }
}

export async function getCourseBySlug(slug) {
  try {
    console.log("slug", slug);

    await connectToDatabase();
    const course = await Course.findOne({ slug: slug });

    return {
      message: "Course fetched successfully",
      status: 200,
      data: cleanData(course),
    };
  } catch (error) {
    console.log("error", error);

    return { message: "fetching course failed", status: 500 };
  }
}

export async function editCourse(slug, data) {
  try {
    await connectToDatabase();
    const course = await Course.findOne({ slug: slug });
    console.log("editing", course._id.toString());
    const id = await getUserId();

    if (!course) {
      return { message: "Course not found", status: 404 };
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      course._id.toString(),
      {
        ...data,
        updatedBy: id,
      },
      { returnDocument: "after" },
    );
    console.log("upodated", updatedCourse);

    return {
      message: "Course updated successfully",
      status: 200,
      data: cleanData(updatedCourse),
    };
  } catch (error) {
    console.log("error", error);

    return { message: "updating course failed", status: 500 };
  }
}

export async function deleteCourse(id) {
  try {
    await connectToDatabase();
    const entry = await Course.findById(id);
    if (!entry) {
      return {
        message: "Entry not found",
        status: 404,
      };
    }

    await Course.findByIdAndDelete(id);
    refresh();
    return {
      message: "Entry deleted successfully",
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return { message: "Deleting entry failed", status: 500 };
  }
}
