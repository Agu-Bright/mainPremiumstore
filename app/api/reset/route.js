// import connectDB from "@utils/connectDB";
// import User from "@models/user";
// import Wallet from "@models/wallet";

// export const GET = async (req, res) => {
//   try {
//     await connectDB;
//     // find all users
//     const users = await User.find();
//     for (const user of users) {
//       // Check if the user already has a wallet
//       const existingWallet = await Wallet.findOne({ user: user._id });
//       if (!existingWallet) {
//         // If no wallet exists, create a new wallet for the user
//         const newWallet = new Wallet({
//           user: user._id,
//         });
//         await newWallet.save();
//         console.log(`Wallet created for user: ${user.username}`);
//       }
//     }

//     return new Response(
//       JSON.stringify({ success: true, message: "wallet created" }),
//       {
//         status: 200,
//       }
//     );
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ success: false, message: error.message }),
//       { status: 500 }
//     );
//   }
// };
