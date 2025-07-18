import Wallet from "@models/wallet";
import connectDB from "@utils/connectDB";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Deposit from "@models/Deposit";
import Order from "@models/order";

export const GET = async (req, res) => {
  const session = await getServerSession(
    req,
    {
      ...NextResponse,
      getHeader: (name) => NextResponse.headers?.get(name),
      setHeader: (name, value) => NextResponse.headers?.set(name, value),
    },
    authOptions
  );
  try {
    await connectDB;

    // Fetch the latest 10 Orders
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("-logs.log")
      .lean()
      .populate(["user", "orderLog"]);

    // Fetch the latest 10 Deposits
    const deposits = await Deposit.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("-wallet")
      .lean()
      .populate("user");

    // Current time
    const now = new Date();

    // Adjust createdAt for all orders and deposits to be 1 to 10 minutes ago
    const adjustedOrders = orders.map((order) => {
      const offset = Math.random() * 9 * 60 * 1000 + 60 * 1000; // Between 1-10 minutes in milliseconds
      order.createdAt = new Date(now.getTime() - offset);
      return order;
    });

    const adjustedDeposits = deposits.map((deposit) => {
      const offset = Math.random() * 9 * 60 * 1000 + 60 * 1000; // Between 1-10 minutes in milliseconds
      deposit.createdAt = new Date(now.getTime() - offset);
      return deposit;
    });

    // Combine the two arrays
    const combined = [...adjustedOrders, ...adjustedDeposits];

    // Sort the combined array by createdAt in descending order
    combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return new Response(
      JSON.stringify({ success: true, values: combined.slice(0, 10) }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
};
