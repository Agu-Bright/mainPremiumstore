import connectDB from "@utils/connectDB";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Profit from "@models/Profit";

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
  try {
    await connectDB;
    const body = await req.json();
    if (!body || !body.date)
      return new Response(
        JSON.stringify({ success: false, message: "Date input is required" }),
        {
          status: 404,
        }
      );

    const selectedDate = new Date(body?.date + "Z"); // Adding "Z" to indicate UTC
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);

    // Query to fetch documents created within the start and end of the day
    const profits = await Profit.find({
      user: session?.user?.id.toString(),

      createdAt: {
        $gte: selectedDate,
        $lt: nextDay,
      },
    });

    return new Response(JSON.stringify({ success: true, profits }), {
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
