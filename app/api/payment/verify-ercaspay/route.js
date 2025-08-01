// app/api/payments/verify-ercaspay/route.js
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

    const { transactionRef } = await req.json();

    if (!transactionRef) {
      return NextResponse.json(
        { success: false, message: "Transaction reference is required" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.ERCASPAY_BASE_URL || "https://api.ercaspay.com/api/v1";

    const response = await fetch(
      `${baseUrl}/payment/transaction/verify/${transactionRef}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    return NextResponse.json({
      success: true,
      data: result,
      message: "Verification completed"
    });

  } catch (error) {
    console.error("Ercaspay verification error:", error);
    return NextResponse.json({
      success: false,
      message: "Verification failed"
    }, { status: 500 });
  }
}