// app/api/payments/verify-ercaspay/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import connectDB from "@utils/connectDB";
import Deposit2 from "@models/Deposit2";
import Wallet2 from "@models/wallet2";

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

    await connectDB();

    // Check if this transaction has already been processed
    const existingDeposit = await Deposit2.findOne({
      transactionRef: transactionRef,
    });

    if (existingDeposit) {
      return NextResponse.json(
        {
          success: false,
          message: "Transaction already processed",
        },
        { status: 409 }
      );
    }

    const baseUrl =
      process.env.ERCASPAY_BASE_URL || "https://api.ercaspay.com/api/v1";

    // Verify payment with Ercaspay
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

    // Check if payment verification was successful
    if (!result?.requestSuccessful || !result?.responseBody) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment verification failed",
          data: result,
        },
        { status: 400 }
      );
    }

    const paymentData = result.responseBody;
    const amount = paymentData.amount;

    if (!amount) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment amount",
        },
        { status: 400 }
      );
    }

    // Find user's wallet
    const wallet = await Wallet2.findOne({ user: session.user.id });
    if (!wallet) {
      return NextResponse.json(
        {
          success: false,
          message: "Wallet not found",
        },
        { status: 404 }
      );
    }

    // Create deposit record
    const deposit = await Deposit2.create({
      user: session.user.id,
      wallet: wallet.user,
      method: "ErcasPay",
      amount: Number(amount),
      status: "success",
      transactionRef: transactionRef,
    });

    // Update wallet balance
    wallet.balance = wallet.balance + Number(amount);
    await wallet.save();

    return NextResponse.json({
      success: true,
      data: result,
      deposit: deposit,
      message: "Payment verified and deposit successful",
    });
  } catch (error) {
    console.error("Ercaspay verification error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Verification failed",
      },
      { status: 500 }
    );
  }
}
