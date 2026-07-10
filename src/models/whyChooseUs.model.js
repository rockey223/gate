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
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const WhyChooseUs =
  models.WhyChooseUs || model("WhyChooseUs", whyChooseUsSchema);

export default WhyChooseUs;
