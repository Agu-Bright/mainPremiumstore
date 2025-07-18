import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import connectDB from "@utils/connectDB";
import { NextResponse } from "next/server";
import Deposit from "@models/Deposit";
import User2 from "@models/user2";


export const GET = async (req) => {
  // Check if user is authenticated
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
  } else if (session && session?.user?.role == "user") {
    return Response.json({ message: "Forbidden request" }, { status: 403 });
  }

  try {
    await connectDB;

    // Extract URL parameters
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;
    const search = url.searchParams.get("search");

    let deposits;
    let total;

    if (search) {
      // Find the user by email
      const user = await User2.findOne({ email: search });
      if (!user) {
        return Response.json(
          { success: false, message: "User not found" },
          { status: 404 }
        );
      }

      // Fetch deposits for the found user
      deposits = await Deposit.find({ user: user._id })
        .sort({ createdAt: -1 })
        .populate("user")
        .skip(skip)
        .limit(limit);

      total = await Deposit.countDocuments({ user: user._id });
    } else {
      // Fetch all deposits with pagination
      deposits = await Deposit.find()
        .sort({ createdAt: -1 })
        .populate("user")
        .skip(skip)
        .limit(limit);

      total = await Deposit.countDocuments();
    }

    if (!deposits || deposits.length === 0) {
      return Response.json(
        { success: false, message: "No deposits found" },
        { status: 404 }
      );
    }

    // Return paginated results
    return Response.json(
      {
        message: "success",
        deposits,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
