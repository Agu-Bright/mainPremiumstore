// //admin get all restaurant owners
// import { authOptions } from "@app/api/auth/[...nextauth]/route";
// import connectDB from "@utils/connectDB";
// import { getServerSession } from "next-auth";
// import User from "@models/user";
// import Restaurant from "@models/restaurant";
// import mongoose from "mongoose";

// export const POST = async (req, res) => {
//   const session = await getServerSession(
//     req,
//     {
//       ...res,
//       getHeader: (name) => res.headers?.get(name),
//       setHeader: (name, value) => res.headers?.set(name, value),
//     },
//     authOptions
//   );
//   if (!session) {
//     return Response.json(
//       { message: "You must be logged in." },
//       { status: 401 }
//     );
//   } else if (session && session?.user?.role !== "admin") {
//     return Response.json({ message: "Forbidden request" }, { status: 403 });
//   }
//   const searchParams = req.nextUrl.searchParams;
//   const queryParams = {};
//   searchParams.forEach((value, key) => {
//     queryParams[key] = value;
//   });
//   try {
//     await connectDB;
//     const { id } = await req.json();
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return Response.json(
//         {
//           message: "Not a valid ID",
//         },
//         { status: 404 }
//       );
//     }

//     if (queryParams.add === "true") {
//       const restaurant = await Restaurant.findByIdAndUpdate(id, {
//         featured: true,
//       });
//       if (!restaurant) {
//         return Response.json(
//           {
//             message: "No restaurant found",
//           },
//           { status: 404 }
//         );
//       }
//       return Response.json(
//         {
//           success: true,
//         },
//         { status: 200 }
//       );
//     } else if (queryParams.add === "false") {
//       const restaurant = await Restaurant.findByIdAndUpdate(id, {
//         featured: false,
//       });
//       if (!restaurant) {
//         return Response.json(
//           {
//             message: "No restaurant found",
//           },
//           { status: 404 }
//         );
//       }
//       return Response.json(
//         {
//           success: true,
//         },
//         { status: 200 }
//       );
//     }
//   } catch (error) {
//     return new Response(`${error}`, { status: 500 });
//   }
// };
