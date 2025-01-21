// //admin get all restaurant owners
// import { authOptions } from "@app/api/auth/[...nextauth]/route";
// import connectDB from "@utils/connectDB";
// import { getServerSession } from "next-auth";
// import User from "@models/user";
// import RestaurantOwner from "@models/restaurantOwner";
// // import Restaurant from "@models/restaurant";
// const stripe = require("stripe")(process.env.STRIPE_API_KEY);

// export const GET = async (req, res) => {
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

//   try {
//     await connectDB;

//     //admin details
//     //==> restaurant requests
//     const restaurantOwners = await RestaurantOwner.countDocuments({
//       status: "pending",
//     });
//     //==> total restauratns
//     // const restaurantCount = await Restaurant.countDocuments();
//     //==>  active subscriptions
//     const subscriptions = await stripe.subscriptions.list({
//       status: "active",
//       limit: 100, // Adjust as needed, this fetches up to 100 active subscriptions
//     }); //==>  expired subscriptions
//     const activesub = subscriptions.data.length;
//     const users = await User.countDocuments();

//     const data = {
//       totalUsers: users,
//       restaurantRequests: restaurantOwners,
//       totalRestaurants: restaurantCount,
//       totalSubsc: activesub,
//     };

//     return Response.json(
//       {
//         success: true,
//         data,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     return new Response(`${error}`, { status: 500 });
//   }
// };
