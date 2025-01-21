//admin get all restaurant owners
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import connectDB from "@utils/connectDB";
import { getServerSession } from "next-auth";
import User from "@models/user";

export const GET = async (req, res) => {
  const session = await getServerSession(
    req,
    {
      ...res,
      getHeader: (name) => res.headers?.get(name),
      setHeader: (name, value) => res.headers?.set(name, value),
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
    const result = await User.find();

    return Response.json(
      {
        success: true,
        users: result.reverse(),
      },
      { status: 200 }
    );
  } catch (error) {
    return new Response(`${error}`, { status: 500 });
  }
};
