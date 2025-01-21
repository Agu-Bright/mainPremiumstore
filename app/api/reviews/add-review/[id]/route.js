// import Restaurant from "@models/restaurant";
// import { authOptions } from "@app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
// import connectDB from "@utils/connectDB";
// import cloudinary from "@utils/cloudinary";
// import { NextResponse } from "next/server";

// // import { getAuthSession } from "@utils/auth";

// export const POST = async (req, { params }) => {
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
//   }
//   try {
//     await connectDB;
//     const formData = await req.formData();
//     const photo = formData.get("photo");

//     if (photo) {
//       const bytes = await photo.arrayBuffer();
//       const buffer = Buffer.from(bytes);

//       const newPromise = new Promise((resolve, reject) => {
//         cloudinary.v2.uploader
//           .upload_stream({ folder: "reviews" }, (error, result) => {
//             if (result) {
//               resolve({ public_id: result.public_id, url: result.secure_url });
//             }
//             if (error) {
//               reject(error);
//             }
//           })
//           .end(buffer);
//       });
//       const get = (name) => {
//         const value = formData.get(name);
//         return value;
//       };

//       const photos = await newPromise;
//       const data = {
//         user: session?.user?.id,
//         foodRating: get("foodReview"),
//         serviceRating: get("serviceReview"),
//         ambianceRating: get("ambiance"),
//         comment: get("review"),
//         photo: photos,
//       };

//       const restaurant = await Restaurant.findById(params?.id);

//       //check if restaurant is already reviewed by the user
//       const isReviewed = restaurant.reviews.find(
//         (rev) => rev.user.toString() === session?.user?.id.toString()
//       );
//       if (isReviewed) {
//         //update the review
//         restaurant.reviews.forEach((rev) => {
//           if (rev.user.toString() === session?.user?.id.toString()) {
//             rev.comment = get("review");
//             rev.foodRating = get("foodReview");
//             rev.serviceRating = get("serviceReview");
//             rev.ambianceRating = get("ambiance");
//             rev.comment = get("review");
//             rev.photo = photos;
//           }
//         });
//       } else {
//         //add review
//         restaurant.reviews.push(data);
//         restaurant.numberOfReviews = restaurant.reviews.length;
//       }

//       //calculate the overall rating

//       restaurant.rating =
//         restaurant.reviews.reduce((acc, item) => {
//           return (
//             (item.ambianceRating + item.foodRating + item.serviceRating) / 3 +
//             acc
//           );
//         }, 0) / restaurant.reviews.length;

//       await restaurant.save({ validateBeforeSave: false });
//       return Response.json({ message: "success" }, { status: 200 });
//     } else {
//       const get = (name) => {
//         const value = formData.get(name);
//         return value;
//       };

//       const data = {
//         user: session?.user?.id,
//         foodRating: get("foodReview"),
//         serviceRating: get("serviceReview"),
//         ambianceRating: get("ambiance"),
//         comment: get("review"),
//       };

//       const restaurant = await Restaurant.findById(params?.id);

//       //check if restaurant is already reviewed by the user
//       const isReviewed = restaurant.reviews.find(
//         (rev) => rev.user.toString() === session?.user?.id.toString()
//       );
//       if (isReviewed) {
//         //update the review
//         restaurant.reviews.forEach((rev) => {
//           if (rev.user.toString() === session?.user?.id.toString()) {
//             rev.comment = get("review");
//             rev.foodRating = get("foodReview");
//             rev.serviceRating = get("serviceReview");
//             rev.ambianceRating = get("ambiance");
//             rev.comment = get("review");
//             rev.photo = null;
//           }
//         });
//       } else {
//         //add review
//         restaurant.reviews.push(data);
//         restaurant.numberOfReviews = restaurant.reviews.length;
//       }

//       //calculate the overall rating

//       restaurant.rating = Math.round(
//         restaurant.reviews.reduce((acc, item) => {
//           return (
//             (item.ambianceRating + item.foodRating + item.serviceRating) / 3 +
//             acc
//           );
//         }, 0) / restaurant.reviews.length
//       );

//       await restaurant.save({ validateBeforeSave: false });
//       return Response.json({ message: "success" }, { status: 200 });
//     }
//   } catch (error) {
//     return Response.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// };
