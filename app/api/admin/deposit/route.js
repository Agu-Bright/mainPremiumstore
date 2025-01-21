import User from "@models/user";
import Wallet from "@models/wallet";
import connectDB from "@utils/connectDB";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Deposit from "@models/Deposit";

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
    return Response.json({ message: "You must be logged in" }, { status: 401 });
  }
  if (session?.user.role !== "admin") {
    return Response.json({ message: "Unauthorized route" }, { status: 409 });
  }
  try {
    await connectDB;
    const body = await req.json();
    if (!body || !body.amount || !body.user || !body.method)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Incomplet Deposit details",
        }),
        {
          status: 404,
        }
      );

    const user = await User.findById(body.user);
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "No user found" }),
        {
          status: 404,
        }
      );
    }

    const wallet = await Wallet.findOne({ user: user?._id });
    if (!wallet) {
      return new Response(
        JSON.stringify({ success: false, message: "No wallet found" }),
        {
          status: 404,
        }
      );
    }
    //create deposit for this user
    const deposit = await Deposit.create({
      user: user?.id,
      wallet: wallet.user,
      method: body.method,
      amount: Number(body.amount),
      status: "success",
    });
    wallet.balance = wallet.balance + Number(deposit.amount);
    await wallet.save();

    return new Response(JSON.stringify({ success: true, deposit }), {
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
