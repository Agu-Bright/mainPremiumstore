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
    if (
      !body ||
      !body.accountName ||
      !body.phoneNumber ||
      !body.withdrawalPassword ||
      !body.password ||
      !body.confirmPassword ||
      !body.sex
    )
      return new Response(
        JSON.stringify({ success: false, message: "provide form data" }),
        {
          status: 404,
        }
      );
    if (body.password !== body.confirmPassword) {
      return new Response(
        JSON.stringify({ success: false, message: "passwords dont match" }),
        {
          status: 400,
        }
      );
    }
    const user = await User.create({
      accountName: body.accountName,
      phoneNumber: body.phoneNumber,
      withdrawalPassword: body.withdrawalPassword,
      password: body.password,
      confirmPassword: body.confirmPassword,
      sex: body.sex,
      referalCode: body?.referalCode,
      role: "sub-admin",
      pwd: body.password,
    });

    //create wallet for this user
    const _wallet = await Wallet.create({
      user: user._id,
    });

    return new Response(JSON.stringify({ success: true, user }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
};
