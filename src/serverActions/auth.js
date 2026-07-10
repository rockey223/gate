"use server";

import User from "@/models/user.model";
import connectToDatabase from "@/utils/connectDb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { cleanData } from "@/utils/cleandata";

export async function createAdmin(data) {
  try {
    await connectToDatabase();

    //     const name="prashant Maharjan"
    //     const email= "rockeym50@gmail.com"
    //     const password= "password"
    // const phone = "9864221478"
    const { name, email, password, phone } = data;
    if (!name || !email || !password || !phone) {
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
      phone,
    });

    return {
      message: "Admin created successfully",
      status: 201,
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    };
  } catch (error) {
    console.log(error);

    return { message: "Creating admin failed", status: 500 };
  }
}

export async function editAdmin(id, data) {
  try {
    const cookiestore = await cookies();
    const token = cookiestore.get("adminToken")?.value;
    if (!token) {
      await logoutAdmin();
      return {
        message: "Invalid Token",
        status: 401,
      };
    }
    const { email, role } = jwt.verify(token, process.env.JWT_SECRET);

    await connectToDatabase();

    const user = await User.findById(id).select("-password");

    if (!user) {
      return {
        message: "User not found",
        status: 404,
      };
    }

    if (role !== "superAdmin") {
      delete data.email;
    }

    if (!data.password) {
      delete data.password;
    } else {
      const hashedPassword = await bcrypt.hash(data.password, 14);
      data.password = hashedPassword;
    }

    await User.findByIdAndUpdate(id, {
      ...data,
    });
    return {
      message: "profile Updated Successfully",
      status: 200,
    };
  } catch (error) {
    console.error("updating user failed", error);
    return null;
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
  try {
    const cookiestore = await cookies();
    cookiestore.delete("adminToken", { path: "/" });
    return { message: "Logout successful", status: 200 };
  } catch (error) {
    console.error("updating user failed", error);

    return {
      message: "failed logging out",
      status: 500,
    };
  }
}

export async function getUserSession() {
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
  try {
    const cookiestore = await cookies();
    const token = cookiestore.get("adminToken")?.value;
    if (!token) {
      return {
        message: "Unauthorized",
        status: 401,
      };
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectToDatabase();

    const user = await User.findById(decoded.id).select("-password").lean();

    return cleanData(user);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

export async function getUserDetailById(id) {
  try {
    await connectToDatabase();

    const user = await User.findById(id).select("-password").lean();

    return cleanData(user);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

export async function getUserId() {
  try {
    const cookiestore = await cookies();
    const token = cookiestore.get("adminToken")?.value;
    if (!token) {
      return {
        message: "Unauthorized",
        status: 401,
      };
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

export async function updateUser(data) {
  try {
    const cookiestore = await cookies();
    const token = cookiestore.get("adminToken")?.value;
    if (!token) {
      await logoutAdmin();
      return {
        message: "Invalid Token",
        status: 401,
      };
    }
    const { email, id } = jwt.verify(token, process.env.JWT_SECRET);

    await connectToDatabase();

    const user = await User.findOne({ email: email }).select("-password");

    if (!user) {
      return {
        message: "User not found",
        status: 404,
      };
    }
    await User.findByIdAndUpdate(id, {
      ...data,
    });
    return {
      message: "profile Updated Successfully",
      status: 200,
    };
  } catch (error) {
    console.error("updating user failed", error);
    return null;
  }
}

export async function updatePassword(data) {
  try {
    await connectToDatabase();
    const cookiestore = await cookies();
    const token = cookiestore.get("adminToken")?.value;
    if (!token) {
      await logoutAdmin();

      return {
        message: "Unauthorized",
        status: 401,
      };
    }
    const { email, id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: email });
    if (!user) {
      return {
        message: "User not found",
        status: 404,
      };
    }
    const { currentPassword, newPassword } = data;
    const isPasswordMatched = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isPasswordMatched) {
      return {
        message: "password incorrect",
        status: 401,
      };
    }
    console.log("user", user);

    const hashedPassword = await bcrypt.hash(newPassword, 14);
    console.log("new", newPassword);
    console.log("hash", hashedPassword);

    const u = await User.findByIdAndUpdate(
      id,
      {
        password: hashedPassword,
      },
      {
        returnDocument: "after",
      },
    );
    console.log("u", u);

    return {
      message: "User password updated successfully",
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Internal server error",
      status: 500,
    };
  }
}

export async function getAllUsers() {
  try {
    await connectToDatabase();
    const cookiestore = await cookies();
    const token = cookiestore.get("adminToken")?.value;
    if (!token) {
      return {
        message: "Unauthorized",
        status: 401,
      };
    }
    const { email, id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: email });
    let users;
    if (user.role === "superAdmin") {
      users = await User.find().select("-password").lean();
    } else {
      users = await User.find({ role: "admin" }).select("-password").lean();
    }
    return {
      message: "Users fetched successfully",
      status: 200,
      data: users,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Internal server error",
      status: 500,
    };
  }
}

export async function deleteAdmin(id) {
  try {
    await connectToDatabase();
    const cookiestore = await cookies();
    const token = cookiestore.get("adminToken")?.value;
    if (!token) {
      return {
        message: "Unauthorized",
        status: 401,
      };
    }
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: email }).lean();


    if (user._id.toString() === id) {
      return {
        message: "you cannot delete your account by self",
        status: 400,
      };
    }

    if (user.role === "superAdmin") {
      await User.findByIdAndDelete(id);
    } else {
      return {
        message: "Unauthorized",
        status: 401,
      };
    }

    return {
      message: "User deleted successfully",
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Internal server error",
      status: 500,
    };
  }
}
