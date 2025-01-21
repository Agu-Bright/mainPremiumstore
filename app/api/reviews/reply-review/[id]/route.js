// import Restaurant from "@models/restaurant";
// import { authOptions } from "@app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
// import connectDB from "@utils/connectDB";
// import cloudinary from "@utils/cloudinary";
// import { NextResponse } from "next/server";

// export const PUT = async (req, { params }) => {
//   //check if user is authenticated is have a role of seller
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

//   try {
//     await connectDB;
//     const { id } = params;
//     const data = await req.json();

//     //get restaurant belonging to this user
//     //get the restaurant reviews
//     const restaurant = await Restaurant.findOne({
//       user: session?.user?.id,
//     }).populate({
//       path: "reviews",
//       populate: [{ path: "user" }, { path: "reply.user" }],
//     });

//     if (!restaurant) {
//       return Response.json({ message: "No restaurant found" }, { status: 404 });
//     }
//     const review = restaurant.reviews.filter(
//       (rev) => rev._id.toString() === id.toString()
//     )[0];

//     if (!review) {
//       return Response.json({ message: "Review not found" }, { status: 404 });
//     }

//     review.reply = {
//       user: session?.user?.id,
//       comment: data.reply,
//       createdAt: new Date(),
//     };

//     await restaurant.save();
//     const updatedRestaurant = await Restaurant.findOne({
//       user: session?.user?.id,
//     }).populate({
//       path: "reviews",
//       populate: [{ path: "user" }, { path: "reply.user" }],
//     });

//     return Response.json(
//       { message: "success", reviews: updatedRestaurant.reviews },
//       { status: 200 }
//     );
//   } catch (error) {
//     return Response.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// };
