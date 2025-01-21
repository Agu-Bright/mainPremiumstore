// import Restaurant from "@models/restaurant";
// import { authOptions } from "@app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
// import connectDB from "@utils/connectDB";
// import { NextResponse } from "next/server";
// import RestaurantOwner from "@models/restaurantOwner";

// export const PUT = async (req) => {
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
//   }
//   try {
//     await connectDB;
//     const data = await req.json();

//     //create a restaurant owner attached to this user
//     const restaurantOwner = await RestaurantOwner.create({
//       ...data,
//       user: session?.user?.id,
//     });

//     return Response.json(
//       { message: "success", restaurantOwner },
//       { status: 200 }
//     );
//   } catch (error) {
//     return Response.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// };
