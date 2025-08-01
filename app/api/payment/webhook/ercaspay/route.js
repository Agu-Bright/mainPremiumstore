// app/api/payments/webhook/ercaspay/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-ercaspay-signature");
    const webhookSecret = process.env.ERCASPAY_WEBHOOK_SECRET;

    // Verify webhook signature (if Ercaspay provides one)
    if (webhookSecret && signature) {
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(body)
        .digest("hex");

      if (signature !== expectedSignature) {
        return NextResponse.json(
          { message: "Invalid signature" },
          { status: 401 }
        );
      }
    }

    const event = JSON.parse(body);

    // Handle different webhook events
    switch (event.event) {
      case "payment.successful":
        // Handle successful payment
        console.log("Payment successful:", event.data);
        // Update your database here
        break;

      case "payment.failed":
        // Handle failed payment
        console.log("Payment failed:", event.data);
        // Update your database here
        break;

      default:
        console.log("Unknown webhook event:", event.event);
    }

    return NextResponse.json({ message: "Webhook processed" });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { message: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
