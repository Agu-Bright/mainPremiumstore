import { transporter } from "@utils/nodemailer";

export const POST = async (req) => {
  const name = "bright";
  const emailTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Message</title>
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
          background-color: orange; /* Dark footer background color */
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Taskbox Office</h1>
        <h1>Welcome Message</h1>
      </div>
     
      <div class="content">
      <h4>Dear ${name}</h4>
        <p>

        Welcome to Taskboxoffice! We're thrilled to have you on board.
        
        At taskboxoffice, we are committed to providing you with the best experience possible. Whether you're here to explore our services, or resources, we're here to support you every step of the way.
        
        Feel free to reach out to us anytime if you have questions, feedback, or need assistance. Our team is always here to help.
        
        Once again, welcome to Taskboxoffice!</p>
      </div>
      <div class="footer">
        <p>Thank you for choosing our service!</p>
      </div>
    </div>
  </body>
  </html>
  `;
  try {
    const data = await req.json();
    // await transporter.sendMail({
    //   from: process.env.EMAIL,
    //   to: "brightagu2@gmail.com",
    //   subject: "Welcome Message",
    //   text: "This is a test string",
    //   html: emailTemplate,
    // });

    return Response.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "failed" }, { status: 500 });
  }
};
