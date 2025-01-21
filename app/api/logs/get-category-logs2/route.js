import User from "@models/user";
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

  try {
    await connectDB;
    const body = await req.json();
    const category = await Category.findById(body.category);
    if (!category) {
      return new Response(
        JSON.stringify({ success: false, message: "Category Doesn't Exist" }),
        { status: 500 }
      );
    }
    // Fetch logs without the `logs` field but include `logCount`
    const logs = await Log.find({ category: category._id }).select("-logs");

    // For each log, calculate the length of the `logs` array
    const logsWithCount = await Promise.all(
      logs.map(async (log) => {
        const logCount = await Log.aggregate([
          { $match: { _id: log._id } },
          { $project: { logCount: { $size: "$logs" } } },
        ]);
        return {
          ...log.toObject(), // Convert the log document to a JS object
          logCount: logCount[0]?.logCount || 0, // Add the log count
        };
      })
    );

    return new Response(
      JSON.stringify({ success: true, logs: logsWithCount }),
      { status: 200 }
    );
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
