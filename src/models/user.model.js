
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
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["superAdmin", "admin", "instructor", "student"],
      default: "student",
    },
  },
  { timestamps: true },
);

// userSchema.pre("save", async function () {
//     console.log("pre save running");
    
//   if (!this.isModified("password")) {
//     return 
//   }
//   return this.password = bcrypt.hashSync(this.password, 14);
  
// });

// userSchema.methods.encryptPassword = async function (password) {
//   console.log("aaa", password);
//   return this.password = bcrypt.hashSync(password, 14);
//   console.log(this.password);
// };
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };
const User = models.User || model("User", userSchema);

export default User;
