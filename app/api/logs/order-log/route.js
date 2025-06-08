import User from "@models/user";
import connectDB from "@utils/connectDB";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Log from "@models/log";
import Wallet from "@models/wallet";
import Order from "@models/order";

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
    const { number, log } = await req.json();

    //find log
    const orderLog = await Log.findById(log);
    if (!orderLog) {
      return Response.json(
        { message: "Requested log can't be found." },
        { status: 401 }
      );
    }
    //check if number is available
    if (orderLog.logs.length < number) {
      return Response.json(
        { message: `This log is remaining ${orderLog.length} in stock` },
        { status: 401 }
      );
    }
    //check is user have enough balance
    const userWallet = await Wallet.findOne({ user: session?.user?.id });
    if (!userWallet) {
      return Response.json({ message: `Invalid user waller` }, { status: 401 });
    }
    const logCost = Number(number) * Number(orderLog.price);
    if (userWallet.balance < logCost) {
      return Response.json(
        { message: `Insucfficient account balance to purchase this log` },
        { status: 401 }
      );
    }
    //handle purchase ==> create Order
    const orderedLog = orderLog.logs.slice(-Number(number));
    orderLog.logs.splice(-Number(number));
    await orderLog.save();
    console.log("orderedLog", orderLog);
    const order = await Order.create({
      user: session?.user?.id,
      logs: orderedLog,
      orderLog: orderLog?._id,
      social: orderLog?.social,
      image: orderLog?.image,
      description: orderLog?.description,
    });
    //remove balance from users account
    userWallet.balance = Number(userWallet.balance) - logCost;
    await userWallet.save();

    return new Response(JSON.stringify({ success: true, order }), {
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
