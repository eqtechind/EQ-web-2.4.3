"use client";
import React from "react";

const PaymentButton = () => {
  const handlePayment = async () => {
    // Step 1: Fetch the order ID from your API
    const response = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: "50000", currency: "INR" }), // Amount in smallest currency unit (paise)
    });

    const { orderId } = await response.json();

    // Step 2: Initialize Razorpay payment
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Add this to `.env.local`
      amount: "5000", // Amount in paise
      currency: "INR",
      name: "Your App Name",
      description: "Test Transaction",
      image: "/your-logo.png", // Replace with your logo
      order_id: orderId, // Generated from the backend
      handler: async function (response) {
        // Handle payment success
        console.log("Payment Success:", response);
        alert("Payment Successful!");
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Your Company Address",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpay = new Razorpay(options);
    razorpay.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Pay Now
    </button>
  );
};

export default PaymentButton;
