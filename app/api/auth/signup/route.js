import connectDB from "@utils/connectDB";
import Wallet from "@models/wallet";
import { sendMail } from "@utils/nodemailer";
import User2 from "@models/user2";

export const POST = async (req, res) => {
  try {
    await connectDB;
    const body = await req.json();
    if (
      !body ||
      !body.username ||
      !body.email ||
      !body.password ||
      !body.confirmPassword
    )
      return new Response(
        JSON.stringify({ success: false, message: "All field is required" }),
        {
          status: 404,
        }
      );
    if (body.password !== body.confirmPassword) {
      return new Response(
        JSON.stringify({ success: false, message: "passwords dont match" }),
        {
          status: 400,
        }
      );
    }
    const user = await User2.create({
      username: body.username,
      withdrawalPassword: body.withdrawalPassword,
      password: body.password,
      confirmPassword: body.confirmPassword,
      email: body?.email,
    });
    const _wallet = await Wallet.create({
      user: user._id,
    });

    await sendMail("welcome", user.username, user.email);
    //create wallet for this user

    return new Response(JSON.stringify({ success: true, user }), {
      status: 200,
    });
  } catch (error) {
    if ((error.code = 11000 && error.keyPattern && error.keyValue)) {
      return new Response(
        JSON.stringify({ success: false, message: "User already exist" }),
        { status: 500 }
      );
    }
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
};
