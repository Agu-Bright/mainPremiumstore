// import Restaurant from "@models/restaurant";
// import { authOptions } from "@app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
// import connectDB from "@utils/connectDB";
// import { NextResponse } from "next/server";
// import RestaurantOwner from "@models/restaurantOwner";
// import User from "@models/user";

// export const PUT = async (req, { params }) => {
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
//   } else if (session && session?.user?.role !== "admin") {
//     return Response.json({ message: "Forbidden request" }, { status: 403 });
//   }
//   try {
//     await connectDB;
//     const { id } = params;
//     const data = await req.json();

//     //find the restaurantowner with the id
//     const restaurantOwner = await RestaurantOwner.findById(id);
//     if (!restaurantOwner) {
//       return Response.json(
//         { message: `No restaurant found with Id: ${id}` },
//         { status: 404 }
//       );
//     }
//     //find and update user role to sub admin
//     const user = await User.findByIdAndUpdate(restaurantOwner.user, data);

//     const currentDate = new Date();

//     const expiryDate = new Date();
//     expiryDate.setDate(currentDate.getDate() + 30);

//     const updatedModel = {
//       isRestaurant: true,
//       subscriptionStart: currentDate,
//       subscriptionEnd: expiryDate,
//     };

//     const updatedRestaurantOwner = await RestaurantOwner.findByIdAndUpdate(
//       id,
//       updatedModel
//     );

//     //set the subscription start date to now
//     //set the expiry date to 30days
//     //update the isrestaurant to true

//     return Response.json({ message: "success" }, { status: 200 });
//   } catch (error) {
//     return Response.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// };
