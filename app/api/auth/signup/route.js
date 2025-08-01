import connectDB from "@utils/connectDB";
import { sendMail } from "@utils/nodemailer";
import User2 from "@models/user2";
import Wallet2 from "@models/wallet2";

export const POST = async (req, res) => {
  try {
    await connectDB();
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
    await Wallet2.create({
      user: user._id,
    });

    await sendMail("welcome", user.username, user.email);

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
