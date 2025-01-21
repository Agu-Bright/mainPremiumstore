import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import connectDB from "@utils/connectDB";
import { NextResponse } from "next/server";
import Deposit from "@models/Deposit";
import Wallet from "@models/wallet";

export const POST = async (req) => {
  //check if user is authenticated
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
    const data = await req.json();
    const deposit = await Deposit.findById(data.id);
    if (!deposit) {
      return Response.json({ message: "No Deposit found" }, { status: 401 });
    }

    const wallet = await Wallet.findOne({ user: deposit.user });
    if (!wallet) {
      return Response.json({ message: "No user found" }, { status: 401 });
    }

    if (data.approve === "true") {
      //upadte user account balance
      deposit.status = "success";
      //update wallet status
      wallet.balance = wallet.balance + Number(deposit.amount);
      await deposit.save();
      await wallet.save();
    } else {
      //upadte user account balance
      deposit.status = "rejected";
      //update wallet status
      await deposit.save();
    }

    return Response.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
