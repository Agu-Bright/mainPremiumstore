import connectDB from "@utils/connectDB";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Payment from "@models/paymentMethods";

export const PUT = async (req, res) => {
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
  } else if (session?.user?.role !== "admin") {
    return Response.json({ message: "Forbidden request" }, { status: 403 });
  }

  try {
    await connectDB();
    const body = await req.json();
    const { status, id } = body;
    if (!status) {
      return Response.json(
        { success: false, message: "Status is required" },
        { status: 400 }
      );
    }
    await Payment.findByIdAndUpdate(id, { status });

    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
