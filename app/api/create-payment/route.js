import connectDB from "@utils/connectDB";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Payment from "@models/paymentMethods";

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
  } else if (session?.user?.role !== "admin") {
    return Response.json({ message: "Forbidden request" }, { status: 403 });
  }

  try {
    await connectDB;

    const body = await req.json();
    const { name, token, status } = body;

    if (!name || !token) {
      return Response.json(
        { success: false, message: "Name and token are required" },
        { status: 400 }
      );
    }

    const newPayment = new Payment({
      name,
      token,
      status: status || "active",
    });

    await newPayment.save();

    return Response.json(
      { success: true, payment: newPayment },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
