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
    return Response.json(
      { message: "You must be logged in." },
      { status: 401 }
    );
  }
  try {
    await connectDB;
    const body = await req.json();
    if (!body || !body.amount)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Incomplete Deposit details",
        }),
        {
          status: 404,
        }
      );

    const wallet = await Wallet.findOne({ user: session?.user?.id });
    if (!wallet) {
      return new Response(
        JSON.stringify({ success: false, message: "No wallet found" }),
        {
          status: 404,
        }
      );
    }
    //create deposit for this user
    let deposit;
    if (body?.transactionRef) {
      //check if depeosit already exist

      const alreadyexist = await Deposit.findOne({
        transactionRef: body?.transactionRef,
      });

      if (alreadyexist) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "Transaction Aleady Exists",
          }),
          {
            status: 409,
          }
        );
      }
      deposit = await Deposit.create({
        user: session?.user.id,
        wallet: wallet.user,
        method: body.method,
        amount: Number(body.amount),
        status: "success",
        transactionRef: body?.transactionRef,
      });
    } else {
      deposit = await Deposit.create({
        user: session?.user.id,
        wallet: wallet.user,
        method: body.method,
        amount: Number(body.amount),
        status: "success",
      });
    }
    wallet.balance = wallet.balance + Number(deposit.amount);
    await wallet.save();
    return new Response(JSON.stringify({ success: true, deposit }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
};
