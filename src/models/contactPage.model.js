import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const contactPageSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    facebookUrl: {
      type: String,
    },
    linkedInUrl: {
      type: String,
    },
    twitterUrl: {
      type: String,
    },
    tiktokUrl: {
      type: String,
    },
    instagramUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const ContactPage =
  models.ContactPage || model("ContactPage", contactPageSchema);

export default ContactPage;