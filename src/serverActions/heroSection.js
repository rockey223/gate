"use server";

import HeroSection from "@/models/heroSection.model";
import { cleanData } from "@/utils/cleandata";
import connectToDatabase from "@/utils/connectDb";
import { deleteImage, uploadImage } from "@/utils/handleImageOnline";

export async function createHeroSection(data) {
  try {
    await connectToDatabase();
    const { heroTitle, heroSubtitle, bannerImage } = data;

    let bannerImagePath = "";

    // Convert browser File -> ArrayBuffer -> Node Buffer
    if (bannerImage instanceof File) {
      console.log("hello cloud");

      const result = await uploadImage(bannerImage);
      bannerImagePath = result;
    }

    const newHeroSection = await HeroSection.create({
      heroTitle,
      heroSubtitle,
      bannerImage: bannerImagePath,
    });
    return {
      message: "Hero section created successfully",
      status: 201,
      heroSection: cleanData(newHeroSection),
    };
  } catch (error) {
    console.log(error);
    return { message: "Creating hero section failed", status: 500 };
  }
}

export async function updateHeroSection(data) {
  try {
    await connectToDatabase();
    console.log("back data", data);

    const { heroTitle, heroSubtitle, bannerImage, removedImage } = data;
    const heroSection = await HeroSection.findById(data.id);
    if (!heroSection) {
      const result = await createHeroSection(data);
      return result;
    }

    let bannerImagePath = bannerImage;
    if (removedImage) {
      // Remove old image if exists
      const deleteResult = await deleteImage(removedImage);
      console.log("delete result", deleteResult);
    }

    if (bannerImage instanceof File) {
      const result = await uploadImage(bannerImage);
      console.log("cloudinary result", result);
      bannerImagePath = result;
    }

    const newHeroSection = await HeroSection.findByIdAndUpdate(
      data.id,
      {
        heroTitle,
        heroSubtitle,
        bannerImage: bannerImagePath,
      },
      { new: true },
    );

    return {
      message: "Hero section updated successfully",
      status: 200,
      heroSection: cleanData(newHeroSection),
    };
  } catch (error) {
    console.log(error);

    return { message: "Updating hero section failed", status: 500 };
  }
}

export async function getHeroSection() {
  try {
    await connectToDatabase();
    const heroSection = await HeroSection.findOne().sort({ createdAt: -1 });

    if (!heroSection) {
      return { message: "Hero section not found", status: 404 };
    }
    return {
      message: "Hero section retrieved successfully",
      status: 200,
      heroSection: cleanData(heroSection),
    };
  } catch (error) {
    return { message: "Retrieving hero section failed", status: 500 };
  }
}
