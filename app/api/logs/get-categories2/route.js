import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import connectDB from "@utils/connectDB";
import { NextResponse } from "next/server";
import Category from "@models/Category";
import axios from "@node_modules/axios";

export const GET = async (req) => {
  // Check if the user is authenticated
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
    return new Response(JSON.stringify({ message: "You must be logged in." }), {
      status: 401,
    });
  }

  try {
    await connectDB;
    const { data } = await axios.get(
      `https://accsmtp.com/api/ListResource.php?username=${process.env._username}&password=${process.env._password}&domain`
    );

    // Modify the response to include proxied image URLs
    const categories = data?.categories.map((category) => ({
      ...category,
      proxiedImage: `${
        process.env.BASE_URL
      }/api/proxy-image?imageUrl=${encodeURIComponent(category.image)}`,
    }));

    return new Response(JSON.stringify({ success: true, categories }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
};
