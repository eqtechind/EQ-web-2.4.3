import Script from "next/script";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PaymentButton = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter(); // Initialize the router

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch("/api/order", { method: "POST" });
      const data = await response.json(); // Don't forget await here

      const options = {
        key: "rzp_test_OjKeKREVkIoUBm",
        amount: "50000",
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        order_id: data.orderId,
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        theme: {
          color: "#3399cc",
        },
        handler: function (response) {
          console.log("Payment Successful:", response);
          alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
          
          // Redirect to investor dashboard after successful payment
          router.push("/");
        },
      };

      if (window.Razorpay) {
        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
          alert("Payment failed. Please try again.");
          setIsProcessing(false);
        });
        rzp1.open();
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred during payment processing");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script 
        src="https://checkout.razorpay.com/v1/checkout.js" 
        strategy="beforeInteractive" 
      />

      <button
        disabled={isProcessing}
        onClick={handlePayment}
        className="bg-blue-500 hover:bg-blue-600 w-[30vh] mg:w-[70vh] lg:w-[90vh] text-white font-bold py-2 px-4 rounded"
      >
        {isProcessing ? "Processing..." : "Pay"}
      </button>
    </>
  );
};

export default PaymentButton;