import User from "@models/user";
import { sendMail, transporter } from "@utils/nodemailer";
import crypto from "crypto";

export const POST = async (req) => {
  try {
    const { password, confirmPassword, token } = await req.json();

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    //compare the reset password hashed token with the one in the database
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return Response.json(
        { success: false, message: "No user found" },
        { status: 404 }
      );
    }
    if (password !== confirmPassword) {
      return Response.json(
        { success: false, message: "Passwords dont match" },
        { status: 400 }
      );
    }

    //setUp new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return Response.json({
      success: true,
      message: `Password Reset succesful`,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
