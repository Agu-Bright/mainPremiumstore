import Wallet from "@models/wallet";
import connectDB from "@utils/connectDB";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Rate from "@models/rate";

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
    if (!body || !body?.rate)
      return new Response(
        JSON.stringify({
          success: false,
          message: "Incomplete upload details",
        }),
        {
          status: 404,
        }
      );
    const rates = await Rate.find();
    if (rates.length === 0) {
      await Rate.create(body);
    } else {
      const rateId = rates[0]._id;
      await Rate.findByIdAndUpdate(rateId, body);
    }
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
};
