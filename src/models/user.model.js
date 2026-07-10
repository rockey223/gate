import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { Schema, model, models } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["superAdmin", "admin", "instructor", "student"],
      default: "admin",
    },
  },
  { timestamps: true },
);


const User = models.User || model("User", userSchema);

export default User;
