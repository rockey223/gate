"use server";
import ContactPage from "@/models/contactPage.model";
import { cleanData } from "@/utils/cleandata";
import connectToDatabase from "@/utils/connectDb";

export async function createContactPageContent(data) {
  try {
    await connectToDatabase();
    const newPage = await ContactPage.create(data);
    return {
      message: "Hero section created successfully",
      status: 201,
      data: newPage,
    };
  } catch (error) {
    return { message: "Creating contact page section failed", status: 500 };
  }
}

export async function updateContactPage(data) {
  try {
    await connectToDatabase();
    

    const existing = await ContactPage.findOne();

    if (existing) {
      // Update fields directly
      existing.email = data.email;
      existing.phoneNumber = data.phoneNumber;
      existing.address = data.address;
      existing.facebookUrl = data.facebookUrl;
      existing.linkedInUrl = data.linkedInUrl;
      existing.twitterUrl = data.twitterUrl;
      existing.tiktokUrl = data.tiktokUrl;
      existing.instagramUrl = data.instagramUrl;

      await existing.save();
      return { message: "updated" };
    } else {
      // Create new document directly
      await ContactPage.create({
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
        facebookUrl: data.facebookUrl,
        linkedInUrl: data.linkedInUrl,
        twitterUrl: data.twitterUrl,
        tiktokUrl: data.tiktokUrl,
        instagramUrl: data.instagramUrl,
      });
      return { message: "created" };
    }
  } catch (error) {
    console.error("updateContactPage error:", error);
    return { message: "updating contact page section failed", status: 500 };
  }
}


export async function getContactPage() {
  try {
    await connectToDatabase();

    // Fetch the first (and only) contact page
    const contact = await ContactPage.findOne(); // lean() returns plain JS object

    if (!contact) {
      return { message: "No contact page found", data: null };
    }

    return cleanData(contact) ;
  } catch (error) {
    console.error("getContactPage error:", error);
    return { message: "Failed to fetch contact page", data: null, status: 500 };
  }
}