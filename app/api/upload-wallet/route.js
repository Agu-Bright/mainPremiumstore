import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import connectDB from "@utils/connectDB";
import { NextResponse } from "next/server";
import Wallet from "@models/wallet";

export const PUT = async (req) => {
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

    const wallet = await Wallet.findOne({ user: session?.user.id.toString() });
    if (!wallet) {
      return Response.json(
        { success: false, message: "No wallet Found" },
        { status: 404 }
      );
    }

    //check if wallet address exist
    const walletAddressExist = wallet.walletAddress;
    if (walletAddressExist) {
      // setUpdate request
      wallet.reqUpdate = true;
      await wallet.save();
    } else {
      //update wallet
      wallet.walletAddress = data?.walletAddress;
      wallet.network = data?.wallet;
      await wallet.save();
    }
    return Response.json({ message: "success", wallet }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
