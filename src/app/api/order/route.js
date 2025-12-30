import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      message: "Payments are temporarily disabled",
      orderId: "mock_order_id",
    },
    { status: 200 }
  );
}