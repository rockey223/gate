import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug:{
        type:String,
        required: true
    },
    shortDescription: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    studentsEnrolled: {
      type: String,
    },
    level: {
      type: String,
    },
    whyChooseThis: [
      {
        title: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
    syllabus: [
      {
        title: {
          type: String,
        },
        course: [{ type: String }],
      },
    ],
    careerOportunities: [
      {
        type: String,
      },
    ],
    facilities: [{ type: String }],
    admissionRequirements: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);
const Course = models.Course || model("Course", courseSchema);
export default Course;
