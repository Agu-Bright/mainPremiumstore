import User from "@models/user";
import { sendMail, transporter } from "@utils/nodemailer";

export const POST = async (req) => {
  try {
    const { email } = await req.json();
    const user = await User.findOne({ email });
    if (!user) {
      return Response.json(
        { success: false, message: "No user found" },
        { status: 404 }
      );
    }
    if (!user.password) {
      return Response.json({
        success: false,
        message: "google authenticated",
      });
    }

    const resetToken = user.getRessetPasswordToken();
    await user.save({ validateBeforeSave: false });
    //SEND THE RESET TOKEN TO THE USER VIA EMAIL
    const resetUrl = `https://${process.env.HOST}/user/password-reset?token=${resetToken}`;
    const message = `Your password reset token is as follows:\n\n ${resetUrl}\n\n If you have not requested this email, then ignore it!.`;

    try {
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "Password Reset",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reservaion Created </title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: white;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: white;
              padding: 0px 0px 0px 0px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              background-color: white;
              color: #fff;
              padding: 10px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .header img {
              max-width: 100px;
              height: auto;
            }
            .content {
              padding: 20px;
            }
            .footer {
              background-color: orange;
              color: white;
              padding: 10px;
              border-radius: 0 0 10px 10px;
              text-align: center;
            }
            h1{
              color: black;
            }
            .content p{
              color: black;
            }
        
            @media only screen and (max-width: 600px) {
              .container {
                max-width: 100%;
                border-radius: 0;
                box-shadow: none;
              }
              .header h1 {
                font-size: 15px;
              }
              .header img {
                max-width: 80px;
              }
            }
            @media (prefers-color-scheme: dark) {
              body {
                background-color: #333; /* Dark background color */
              }
              .container {
                background-color: #fff; /* White container background color */
                color: #333; /* Default text color in dark mode */
                box-shadow: none; /* No shadow in dark mode */
              }
              .header {
                background-color: #555; /* Dark header background color */
              }
              .content {
                color: #fff; /* Light text color in dark mode */
              }
              .footer {
                background-color: #orange; /* Dark footer background color */
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
            <p>ActiveStore</p>
              <h1>Password Reset</h1>
            </div>
           
            <div class="content">
            <p>
              Click the button below to reset your password.
            </p>   
            <p>
            If you have not requested this email, then ignore it.
            </p>   
            <a href = ${resetUrl} >
                Reset Password
            </a>
            </div>
            <div class="footer">
              <p>Thank you for choosing our service!</p>
            </div>
          </div>
        </body>
        </html>
        `,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return Response.json({
        success: false,
        message: error.message,
      });
    }
    return Response.json({
      success: true,
      message: `Mail Sent to ${email}`,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
