import User from "@models/user";
import connectDB from "@utils/connectDB";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Log from "@models/log";
import Category from "@models/Category";
import axios from "@node_modules/axios";

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
    // console.log("hiiiiiiiiiiiiiiiiiiiiiiiii");
    const body = await req.json();
    console.log("id", body?.id);

    // https://shopviaclone22.com/api/product.php?api_key=46a255ee592b54e3d05021daf07dd07c&product=3
    const { data } = await axios.get(
      `https://shopviaclone22.com/api/product.php?api_key=aee5f317aad9959bf4915f0502812b2c&product=${body?.id}`
    );
    console.log(data);

    return new Response(
      JSON.stringify({ success: true, logs: data?.categories }),
      {
        status: 200,
      }
    );
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
