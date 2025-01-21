import User from "@models/user";
import bcrypt from "bcryptjs";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import connectDB from "@utils/connectDB";
import { NextResponse } from "next/server";

export const POST = async (req) => {
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
    return Response.json(
      { message: "You must be logged in." },
      { status: 401 }
    );
  }
  try {
    await connectDB;
    const { oldPassword, newPassword, confirmNewPassword } = await req.json();

    const user = await User.findById(session?.user?.id);

    if (!user) {
      return Response.json(
        { success: false, message: "No user found" },
        { status: 404 }
      );
    }

    //check if password match
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { success: false, message: "Old password is incorrect" },
        { status: 400 }
      );
    }

    if (newPassword !== confirmNewPassword) {
      return Response.json(
        { success: false, message: "Passwords dont match" },
        { status: 400 }
      );
    }

    // //setUp new password
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return Response.json({
      success: true,
      message: `Password Reset succesful`,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
