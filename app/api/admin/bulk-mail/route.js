import nodemailer from "nodemailer"; // Import nodemailer for sending emails
import User from "@models/user";
import Wallet from "@models/wallet";
import connectDB from "@utils/connectDB";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Deposit from "@models/Deposit";
import { transporter } from "../../../../utils/nodemailer";

export const POST = async (req, res) => {
  const session = await getServerSession(
    req,
    {
      ...NextResponse,
      getHeader: (name) => NextResponse.headers?.get(name),
      setHeader: (name, value) => NextResponse.headers?.set(name, value),
    },
    authOptions
  );
  if (!session) {
    return Response.json({ message: "You must be logged in" }, { status: 401 });
  }
  if (session?.user.role !== "admin") {
    return Response.json({ message: "Unauthorized route" }, { status: 403 });
  }

  try {
    await connectDB;
    const { emails, message } = await req.json();
    if (!emails || emails.length === 0 || !message) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid payload" }),
        { status: 400 }
      );
    }

    // Loop through each email and send the message
    const sendMailPromises = emails.map((email) => {
      return transporter.sendMail({
        from: process.env.EMAIL_USER, // Sender address
        to: email, // Recipient address
        subject: "Message from Admin", // Email subject
        text: message, // Email body
      });
    });

    // Wait for all emails to be sent
    await Promise.all(sendMailPromises);

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
};
