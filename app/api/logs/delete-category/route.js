import connectDB from "@utils/connectDB";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Log from "@models/log";
import Category from "@models/Category";

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
    return Response.json(
      { message: "You must be logged in." },
      { status: 401 }
    );
  }
  if (session?.user?.role !== "admin") {
    return Response.json({ message: "Unauthorized Route" }, { status: 401 });
  }
  try {
    await connectDB;
    const { catId } = await req.json();

    await Category.findByIdAndDelete(catId);
    await Log.deleteMany({ category: catId });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    if ((error.code = 11000 && error.keyPattern && error.keyValue)) {
      return new Response(
        JSON.stringify({ success: false, message: "User already exist" }),
        { status: 500 }
      );
    }
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
};
