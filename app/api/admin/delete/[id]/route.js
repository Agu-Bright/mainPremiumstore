import { authOptions } from "@app/api/auth/[...nextauth]/route";
import User from "@models/user";
import Wallet from "@models/wallet";
import connectDB from "@utils/connectDB";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
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
    const id = params.id;

    const user = await User.findById(id);
    if (!user) {
      return Response.json(
        { message: "No user with ID found" },
        { status: 404 }
      );
    }
    if (user.role === "admin") {
      return Response.json(
        { message: "Admin can't be deleted" },
        { status: 401 }
      );
    }

    await User.findByIdAndDelete(id);
    await Wallet.deleteOne({ user: id });
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
