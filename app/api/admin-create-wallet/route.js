import User from "@models/user";
import Wallet from "@models/wallet";
import connectDB from "@utils/connectDB";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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
  } else if (session && session?.user?.role !== "admin") {
    return Response.json({ message: "Forbidden request" }, { status: 403 });
  }
  try {
    await connectDB;
    const body = await req.json();
    console.log(body);

    if (!body || !body.wallet || !body.walletAddress)
      return new Response(
        JSON.stringify({ success: false, message: "Incomplet upload details" }),
        {
          status: 404,
        }
      );
    //create wallet address
    const wallet = await Wallet.create({
      user: session?.user.id,
      type: "admin",
      network: body.wallet,
      walletAddress: body.walletAddress,
    });

    // const wallet = await Wallet.findOne({
    //   type: "admin",
    //   network: body?.network,
    // });
    // if (!wallet)
    //   return new Response(
    //     JSON.stringify({ success: false, message: "No Wallet found" }),
    //     {
    //       status: 404,
    //     }
    //   );

    // wallet.walletAddress = body.walletAddress;
    // await wallet.save();

    return new Response(JSON.stringify({ success: true, wallet }), {
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
