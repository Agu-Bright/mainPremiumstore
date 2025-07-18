import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import connectDB from "@utils/connectDB";
import { NextResponse } from "next/server";
import Order from "@models/order";
import User2 from "@models/user2";

export const GET = async (req) => {
  // Check if the user is authenticated
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
    return new Response(JSON.stringify({ message: "You must be logged in." }), {
      status: 401,
    });
  }

  if (session?.user.role !== "admin") {
    return new Response(JSON.stringify({ message: "Unauthorized route" }), {
      status: 403,
    });
  }

  try {
    await connectDB;

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email"); // Search by email
    const page = parseInt(searchParams.get("page")) || 1; // Default to page 1
    const limit = parseInt(searchParams.get("limit")) || 10; // Default to 10 orders per page
    const skip = (page - 1) * limit; // Calculate skip value for MongoDB query

    let query = {};
    if (email) {
      // Find the user by email
      const user = await User2.findOne({ email });
      if (!user) {
        return new Response(
          JSON.stringify({ message: "No user found with this email." }),
          { status: 404 }
        );
      }
      query = { user: user._id }; // Update query to filter by user ID
    }

    console.log(query);

    // Fetch paginated orders based on the query
    const totalOrders = await Order.countDocuments(query); // Total number of filtered orders
    const orders = await Order.find(query)
      .populate("orderLog user")
      .sort({ createdAt: -1 }) // Sort orders by creation date (newest first)
      .skip(skip)
      .limit(limit)
      .lean();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Orders fetched successfully",
        orders,
        pagination: {
          total: totalOrders,
          page,
          limit,
          totalPages: Math.ceil(totalOrders / limit),
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
};
