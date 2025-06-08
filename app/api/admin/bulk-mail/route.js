import nodemailer from "nodemailer";
import User from "@models/user";
import Wallet from "@models/wallet";
import connectDB from "@utils/connectDB";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
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
    const { emails, message, broadcast } = await req.json();

    if ((!emails || emails.length === 0) && broadcast !== "all") {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid payload" }),
        { status: 400 }
      );
    }

    let recipients = emails; // Default: use provided emails

    if (broadcast === "all") {
      // Fetch all user emails if broadcast is enabled
      const users = await User.find({}, "email");
      recipients = users.map((user) => user.email);
    }

    // Send emails using Promise.allSettled() to ensure all emails are attempted
    const sendMailResults = await Promise.allSettled(
      recipients.map((email) =>
        transporter.sendMail({
          from: process.env.EMAIL,
          to: email,
          subject: "Activestore",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0,0,0,0.1);">
              <p style="color: #555; font-size: 16px;">Hello,</p>
              <p style="color: #333; font-size: 16px;">${message}</p>
              <p style="color: #555; font-size: 16px;">Best regards,<br>Admin Team</p>
              <hr style="border: 0.5px solid #ddd;">
              <p style="text-align: center; font-size: 14px; color: #777;">© 2025 ActiveStore. All rights reserved.</p>
            </div>
          `,
        })
      )
    );

    // Process results and log failed emails
    const failedEmails = sendMailResults
      .map((result, index) =>
        result.status === "rejected" ? recipients[index] : null
      )
      .filter(Boolean);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Mails sent successfully",
        failedEmails, // Include failed emails in response
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
};
