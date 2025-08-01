// app/api/payments/initialize-ercaspay/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const {
      amount,
      paymentReference,
      customerName,
      customerEmail,
      customerPhoneNumber, // This is required!
      userId,
      description,
    } = await req.json();

    // Validation
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid amount" },
        { status: 400 }
      );
    }

    if (!customerEmail) {
      return NextResponse.json(
        { success: false, message: "Customer email is required" },
        { status: 400 }
      );
    }

    // Phone number is optional

    const baseUrl =
      process.env.ERCASPAY_BASE_URL || "https://api.ercaspay.com/api/v1";
    const secretKey = process.env.ERCASPAY_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { success: false, message: "Payment configuration error" },
        { status: 500 }
      );
    }

    // Use the EXACT format from Ercaspay documentation
    const paymentData = {
      amount: parseFloat(amount),
      paymentReference: paymentReference,
      paymentMethods: "card,bank-transfer,ussd,qrcode", // Exact format from docs
      customerName: customerName || "Active User",
      customerEmail: customerEmail,
      redirectUrl: `${
        process.env.NEXTAUTH_URL || "http://localhost:3000"
      }/user/add-fund?transactionRef=${paymentReference}&status=success`,
      description: description || "Account Top-up",
      currency: "NGN", // Changed from USD to NGN for Nigeria
      feeBearer: "merchant", // As per your preference
      metadata: {
        firstname: customerName?.split(" ")[0] || "Active",
        lastname: customerName?.split(" ")[1] || "User",
        email: customerEmail,
        userId: userId,
        source: "web_app",
      },
    };

    // Add phone number only if provided
    if (customerPhoneNumber) {
      paymentData.customerPhoneNumber = customerPhoneNumber;
    }

    console.log("=== ERCASPAY PAYMENT INITIATION ===");
    console.log("Base URL:", baseUrl);
    console.log("Secret Key exists:", !!secretKey);
    console.log("Payload:", JSON.stringify(paymentData, null, 2));

    const response = await fetch(`${baseUrl}/payment/initiate`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify(paymentData),
    });

    console.log("Response Status:", response.status);
    console.log(
      "Response Headers:",
      Object.fromEntries(response.headers.entries())
    );

    const responseText = await response.text();
    console.log("Raw Response:", responseText);

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      return NextResponse.json(
        { success: false, message: "Invalid response from payment gateway" },
        { status: 500 }
      );
    }

    console.log("Parsed Result:", JSON.stringify(result, null, 2));

    // Check for success using the exact response format from docs
    if (
      result?.requestSuccessful === true &&
      result?.responseCode === "success"
    ) {
      return NextResponse.json({
        success: true,
        data: result,
        message: "Payment initialized successfully",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message:
            result?.responseMessage ||
            result?.errorMessage ||
            "Payment initialization failed",
          errorCode: result?.responseCode,
          fullResponse: result,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Ercaspay initialization error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
