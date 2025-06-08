// File: /app/api/payment/verify-korapay/[reference]/route.js
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request, { params }) {
  try {
    const { reference } = params;

    // Validate the transaction reference
    if (!reference) {
      return NextResponse.json(
        { success: false, message: "Transaction reference is required" },
        { status: 400 }
      );
    }

    // Get the Korapay secret key from environment variables
    const korapaySecretKey = process.env.KORAPAY_SECRET_KEY;

    if (!korapaySecretKey) {
      console.error("Korapay secret key is not configured");
      return NextResponse.json(
        {
          success: false,
          message: "Payment verification service is not configured properly",
        },
        { status: 500 }
      );
    }

    // Make the verification request to Korapay API
    const response = await axios.get(
      `https://api.korapay.com/merchant/api/v1/charges/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${korapaySecretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the payment was successful
    if (
      response.data.status === true &&
      response.data.data.status === "success"
    ) {
      return NextResponse.json({
        success: true,
        message: "Payment verification successful",
        data: response.data.data,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Payment verification failed",
          data: response.data.data,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Payment verification error:", error);

    // Handle different types of errors
    if (error.response) {
      // The request was made and the server responded with a status code outside of 2xx
      return NextResponse.json(
        {
          success: false,
          message: error.response.data.message || "Payment verification failed",
          error: error.response.data,
        },
        { status: error.response.status }
      );
    } else if (error.request) {
      // The request was made but no response was received
      return NextResponse.json(
        {
          success: false,
          message: "No response from payment provider",
        },
        { status: 503 }
      );
    } else {
      // Something happened in setting up the request
      return NextResponse.json(
        {
          success: false,
          message:
            error.message || "An error occurred during payment verification",
        },
        { status: 500 }
      );
    }
  }
}
