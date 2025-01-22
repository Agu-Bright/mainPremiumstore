import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import connectDB from "@utils/connectDB";
import { NextResponse } from "next/server";
import Category from "@models/Category";
import axios from "@node_modules/axios";

export const GET = async (req) => {
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
    const { data } = await axios.get(
      "https://shopviaclone22.com/api/products.php?api_key=aee5f317aad9959bf4915f0502812b2c"
    );
    return new Response(
      JSON.stringify({ success: true, categories: data?.categories }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
