// import Restaurant from "@models/restaurant";
// import { authOptions } from "@app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
// import connectDB from "@utils/connectDB";
// import Reservation from "@models/booking";
// import { NextResponse } from "next/server";
// import ApiFeatures from "@utils/apiFeatures";

// //sub-admin get my reservations
// export const GET = async (req, { params }) => {
//   //check if user is authenticated
//   const session = await getServerSession(
//     req,
//     {
//       ...NextResponse,
//       getHeader: (name) => NextResponse.headers?.get(name),
//       setHeader: (name, value) => NextResponse.headers?.set(name, value),
//     },
//     authOptions
//   );
//   if (!session) {
//     return Response.json(
//       { message: "You must be logged in." },
//       { status: 401 }
//     );
//   } else if (session && session?.user?.role !== "sub-admin") {
//     return Response.json({ message: "Forbidden request" }, { status: 403 });
//   }

//   const searchParams = req.nextUrl.searchParams;
//   const queryParams = {};

//   searchParams.forEach((value, key) => {
//     queryParams[key] = value;
//   });
//   try {
//     await connectDB;

//     //find users restaurant
//     const reviews = await Restaurant.findOne({
//       user: session?.user?.id,
//     })
//       .select("reviews")
//       .populate({
//         path: "reviews",
//         populate: [{ path: "user" }, { path: "reply.user" }],
//       });

//     return Response.json(
//       {
//         success: true,
//         reviews,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     return new Response(`${error}`, { status: 500 });
//   }
// };
