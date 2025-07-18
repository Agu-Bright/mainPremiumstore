import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const handleTypeSelect = (type, name, restaurant, resId) => {
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
      .title{
        color: orange
      },
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
        <h1 class="title">ActiveStore</h1>
        <h1>Welcome Message</h1>
      </div>
     
      <div class="content">
      <h4>Dear ${name}</h4>
        <p>
  
        Welcome to ActiveStore! We're thrilled to have you on board.
        
        At ActiveStore, we are committed to providing you with the best experience possible. Whether you're here to explore our services, or resources, we're here to support you every step of the way.
        
        Feel free to reach out to us anytime if you have questions, feedback, or need assistance. Our team is always here to help.
        
        Once again, welcome to ActiveStore!</p>
      </div>
      <div class="footer">
        <p>Thank you for choosing our service!</p>
      </div>
    </div>
  </body>
  </html>
  `;
  const restaurantRequest = `
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
        background-color: red;
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
          background-color: #555; /* Dark footer background color */
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://res.cloudinary.com/dnrqrebbt/image/upload/v1714267624/white-logo_hwdpcn.png" alt="Logo">
        <h1>Restaurant Request</h1>
      </div>
     
      <div class="content">
      <h6>Dear ${name}</h6>
        <p>
  
        Welcome to RedTables! We're thrilled to have you on board.
        
        At RedTables, we are committed to providing you with the best experience possible. Whether you're here to explore our products, services, or resources, we're here to support you every step of the way.
        
        Feel free to reach out to us anytime if you have questions, feedback, or need assistance. Our team is always here to help.
        
        Once again, welcome to RedTables!</p>
      </div>
      <div class="footer">
        <p>Thank you for choosing our service!</p>
      </div>
    </div>
  </body>
  </html>
  `;
  const acceptRequest = `
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
        background-color: red;
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
          background-color: #555; /* Dark footer background color */
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://res.cloudinary.com/dnrqrebbt/image/upload/v1714267624/white-logo_hwdpcn.png" alt="Logo">
        <h1>Restaurant Approved</h1>
      </div>
     
      <div class="content">
      <h6>Dear ${name}</h6>
        <p>
  
        Welcome to RedTables dashboard! We're thrilled to inform you that your request to manage your restaurant with our platform have been approved.
        
        At RedTables, we are committed to providing you with the best experience possible. Whether you're here to explore our products, services, or resources, we're here to support you every step of the way.
        
        Feel free to reach out to us anytime if you have questions, feedback, or need assistance. Our team is always here to help.
        <a href =${process.env.DOMAIN + "/dasboard"} >My Dashboard</a>
        Once again, welcome to RedTables!</p>
      </div>
      <div class="footer">
        <p>Thank you for choosing our service!</p>
      </div>
    </div>
  </body>
  </html>
  `;
  const sendReminder = `
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
        background-color: red;
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
          background-color: #555; /* Dark footer background color */
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://res.cloudinary.com/dnrqrebbt/image/upload/v1714267624/white-logo_hwdpcn.png" alt="Logo">
        <h1>Reminder</h1>
      </div>
     
      <div class="content">
      <h6>Dear ${name}</h6>
        <p>
  
        Welcome to RedTables dashboard! We're thrilled to inform you that your request to manage your restaurant with our platform have been approved.
        
        At RedTables, we are committed to providing you with the best experience possible. Whether you're here to explore our products, services, or resources, we're here to support you every step of the way.
        
        Feel free to reach out to us anytime if you have questions, feedback, or need assistance. Our team is always here to help.
        <a href =${process.env.DOMAIN + "/dasboard"} >My Dashboard</a>
        Once again, welcome to RedTables!</p>
      </div>
      <div class="footer">
        <p>Thank you for choosing our service!</p>
      </div>
    </div>
  </body>
  </html>
  `;
  const createReservation = `
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
        background-color: red;
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
          background-color: #555; /* Dark footer background color */
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://res.cloudinary.com/dnrqrebbt/image/upload/v1714267624/white-logo_hwdpcn.png" alt="Logo">
        <h1>Reservation</h1>
      </div>
     
      <div class="content">
      <h6>Dear ${name}</h6>
        <p>
        Your reservation at <a href ="${
          process.env.DOMAIN + "/" + resId
        }">${restaurant}</a>  has been created.
      </div>x x 
      <div class="footer">
        <p>Thank you for choosing our service!</p>
      </div>
    </div>
  </body>
  </html>
  `;

  switch (type) {
    case "welcome":
      return emailTemplate;
    case "restaurantRequest":
      return restaurantRequest;
    case "acceptRequest":
      return acceptRequest;
    case "sendReminder":
      return sendReminder;
    case "createReservation":
      return createReservation;
    default:
      break;
  }
};

export const sendMail = async (type, name, reciever, restaurant, resId) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: reciever,
      subject: "Welcome Message",
      text: "This is a test string",
      html: handleTypeSelect(type, name, restaurant, resId),
    });
    return true;
  } catch (error) {
    return false;
  }
};
