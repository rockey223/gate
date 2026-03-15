"use server";
import WhyChooseUs from "@/models/whyChooseUs.model";
import { cleanData } from "@/utils/cleandata";
import connectToDatabase from "@/utils/connectDb";
import { deleteImage, uploadImage } from "@/utils/handleImageOnline";
import { refresh } from "next/cache";

export async function createWhyChooseUs(data) {
  try {
    await connectToDatabase();
    const { title, description, image } = data;

    let imagePath = "";

    if (image instanceof File) {
      imagePath = await uploadImage(image);
      // imagePath = result.secure_url;
    }

    const newEntry = await WhyChooseUs.create({
      title,
      description,
      image: imagePath,
    });
    refresh();

    return {
      message: "Entry created successfully",
      status: 201,
      entry: cleanData(newEntry),
    };
  } catch (error) {
    console.log(error);
    return { message: "Creating entry failed", status: 500 };
  }
}

export async function getWhyChooseUsList() {
  try {
    await connectToDatabase();
    const list = await WhyChooseUs.find().sort({ createdAt: -1 });
    return cleanData(list);
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function updateWhyChooseUs(data) {
  try {
    await connectToDatabase();
    const { title, description, image, removedImage } = data;
    console.log("remove", removedImage);

    const entry = await WhyChooseUs.findById(data.id);
    console.log("entry", entry);
    if (!entry) {
      return {
        message: "Entry not found",
        status: 404,
      };
    }
    let imagePath = image;
    if (removedImage) {
      const deleteResult = await deleteImage(removedImage);
      console.log("deleted image", deleteResult);

      // Optionally handle image deletion here if needed
    }
    if (image instanceof File) {
      imagePath = await uploadImage(image);
    }

    const updatedEntry = await WhyChooseUs.findByIdAndUpdate(
      data.id,
      {
        title,
        description,
        image: imagePath,
      },
      { new: true },
    );
    refresh();
    return {
      message: "Entry updated successfully",
      status: 200,
      entry: cleanData(updatedEntry),
    };
  } catch (error) {
    console.log(error);
    return { message: "Updating entry failed", status: 500 };
  }
}

export async function deleteWhyChooseUs(id) {
  try {
    await connectToDatabase();
    const entry = await WhyChooseUs.findById(id);
    if (!entry) {
      return {
        message: "Entry not found",
        status: 404,
      };
    }
    if (entry.image) {
      const deleteResult = await deleteImage(entry.image);
      console.log("deleted image", deleteResult);
    }
    await WhyChooseUs.findByIdAndDelete(id);
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
