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
    const { withdrawalPassword } = await req.json();
    if (!withdrawalPassword) {
      return Response.json(
        { success: false, message: "Withdrawal Password Is Required" },
        { status: 404 }
      );
    }

    const user = await User.findById(session?.user?.id);

    if (!user) {
      return Response.json(
        { success: false, message: "No user found" },
        { status: 404 }
      );
    }

    //check if password match
    const isPasswordCorrect = await bcrypt.compare(
      withdrawalPassword,
      user.withdrawalPassword
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { success: false, message: "Invalid Withdrawal Password" },
        { status: 400 }
      );
    }

    return Response.json({
      success: true,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
