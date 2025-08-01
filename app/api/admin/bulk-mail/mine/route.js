// // //EXTRA BULK MESSAGE
import nodemailer from "nodemailer";
import Wallet from "@models/wallet";
import connectDB from "@utils/connectDB";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { transporter } from "@utils/nodemailer";
import User2 from "@models/user2";

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
    await connectDB();
    const { emails, message, broadcast } = await req.json();

    if ((!emails || emails.length === 0) && broadcast !== "all") {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid payload" }),
        { status: 400 }
      );
    }

    let recipients = emails; // Default: use provided emails

    if (broadcast === "all") {
      // Fetch all user emails if broadcast is enabled//
      const users = await User2.find({}, "email");

      // Define the emails to exclude
      const excludedEmails = [
        "juliusking2023@gmail.com",
        "support@activestore.org",
        "admin@activestore.org",
      ];

      // Filter out the excluded emails
      recipients = users
        .filter((user) => !excludedEmails.includes(user.email))
        .map((user) => user.email);
    }
    console.log("recipients", recipients.length);
    //     // Send emails using Promise.allSettled() to ensure all emails are attempted
    const sendMailResults = await Promise.allSettled(
      recipients.map((email) =>
        transporter.sendMail({
          from: process.env.EMAIL,
          to: email,
          subject: "Discord Bot",
          html: `
             <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0,0,0,0.1); text-align: center;">
      <a href="https:res.cloudinary.com/dnrqrebbt/image/upload/v1741273147/bot_t1lxsp.png" target="_blank">
          <img src="https:res.cloudinary.com/dnrqrebbt/image/upload/v1741273147/bot_t1lxsp.png" alt="Discord Bot" style="max-width: 100%; border-radius: 10px 10px 0 0;">
      </a>
      <div style="padding: 20px; text-align: left;">
          <p style="color: #555; font-size: 16px;">Hello,</p>
          <p style="color: #333; font-size: 16px;">
              Do you need a Discord bot that alerts you when a user joins any server which you are a member of?
              Get it now for a low price.
          </p>
          <p style="text-align: center; margin-top: 20px;">
              <a href="https://wa.link/7rjkvm" style="background-color: #5865F2; color: #fff; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">
                  Click Here to Send Us a Message (Whatsapp)
              </a>
          </p>
          <p style="text-align: center; margin-top: 20px;">
              <a href="https://t.me/dis_bot_gram" style="background-color: #5865F2; color: #fff; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">
                  Click Here to Send Us a Message (Telegram)
              </a>
          </p>
         
          <p style="color: #555; font-size: 16px; margin-top: 20px;">Best regards,<br>Admin Team</p>
      </div>
      <hr style="border: 0.5px solid #ddd;">
      <p style="text-align: center; font-size: 14px; color: #777;">© 2025 DiscordBot. All rights reserved.</p>
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
