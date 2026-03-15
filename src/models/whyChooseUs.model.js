import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const whyChooseUsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const WhyChooseUs =
  models.WhyChooseUs || model("WhyChooseUs", whyChooseUsSchema);

export default WhyChooseUs;
