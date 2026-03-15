"use server";

import User from "@/models/user.model";
import connectToDatabase from "@/utils/connectDb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { cleanData } from "@/utils/cleandata";

export async function createAdmin(request) {
  try {
    await connectToDatabase();
    const data = await request.json();


    const { name, email, password } = data;
    if (!name || !email || !password) {
      return { message: "All fields are required", status: 400 };
    }

    const user = await User.findOne({ email });
    if (user) {
      return { message: "User already exists", status: 400 };
    }
    const hashedPassword = await bcrypt.hash(password, 14);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return { message: "Admin created successfully", status: 201, user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      } };
    
  } catch (error) {
    return { message: "Creating admin failed", status: 500 };
  }
}

export async function loginAdmin(data) {
  try {
    await connectToDatabase();
 
    const { email, password } = data;
    if (!email || !password) {
      return {
        message: "Email and password are required",
        status: 400,
      };
    }
    const user = await User.findOne({ email });
    if (!user) {
      return {
        message: "User not found",
        status: 404,
      };
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);


    if (!isPasswordValid) {
      return {
        message: "Invalid password",
        status: 401,
      };
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    const cookiestore = await cookies();
    cookiestore.set("adminToken", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });
    return {
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      status: 200,
    };
  } catch (error) {
    console.error("Database connection error:", error);
    return {
      message: "Database connection failed",
      status: 500,
    };
  }
}

export async function logoutAdmin() {
  const cookiestore = await cookies();
  cookiestore.delete("adminToken", { path: "/" });
  return { message: "Logout successful", status: 200 };
}

export async function getUserSession(){
    const cookiestore = await cookies();
    const token = cookiestore.get("adminToken")?.value;
    if (!token) {
      return null;
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
}

export async function getUserDetail() {
  const cookiestore = await cookies();
  const token = cookiestore.get("adminToken")?.value;
    if (!token) {
        return null;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password").lean();
        
        
        return cleanData(user);
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
}