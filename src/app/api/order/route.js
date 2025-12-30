import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.key_id,      // Ensure this is defined in .env
  key_secret: process.env.key_secret,
});

export async function POST(request) {
  try {
    // Parse and validate input
    const { amount = 10, currency = "INR" } = await request.json();
    if (!amount || isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { message: "Invalid or missing 'amount' parameter" },
        { status: 400 }
      );
    }

    // Create order options
    const options = {
      amount: amount * 100, // Razorpay accepts amount in paise (1 INR = 100 paise)
      currency: currency,
      receipt: "rcp_" + Math.random().toString(36).substring(7),
    };

    // Create order with Razorpay
    const order = await razorpay.orders.create(options);
    console.log("Order created:", order);

    // Return order ID
    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { message: error.message, details: error.response ? error.response.data : null },
      { status: 500 }
    );
  }
}
