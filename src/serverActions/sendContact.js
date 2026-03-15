"use server";
import Contact from "@/models/contact.model";
import { cleanData } from "@/utils/cleandata";
import connectToDatabase from "@/utils/connectDb";
import emailTransporter from "@/utils/emailTransporter";
export async function sendContact(data) {
  try {
    await connectToDatabase()
    const { fullName, email, phone, subject, message } = data;
    if (!fullName || !email || !message || !phone || !subject) {
      return {
        message: "All fields are required",
      };
    }
    const info = await emailTransporter.sendMail({
      from: process.env.EMAIL_SENDER,
      to: process.env.EMAIL_SENDER,
      subject: "this is subject",
      html: `<h2 style="font-size: 24px;">Customer Name: ${fullName}</h2>
              <p style="font-size: 18px;">Contact Email: ${email}</p>
              <p style="font-size: 18px;">Customer Message: ${message}</p>`,
    });

    if (info.messageId) {
      const contact = await Contact.create(data);
      return { message: "mail sent",status:200, data: cleanData(contact) };
    } else {
      return { message: "Error sending mail", status: 400 };
    }
  } catch (error) {
    return { message: "Error sending mail", status: 500 };
  }
}
