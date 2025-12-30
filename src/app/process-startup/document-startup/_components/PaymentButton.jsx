import Script from "next/script";
import React, { useEffect, useState } from "react";

const PaymentButton = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  // useEffect(() => {
  //   // Dynamically load Razorpay's script
  //   const script = document.createElement("script");
  //   script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  // }, []);

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch("/api/order", { method: "POST" });
      const data = response.json();

      const options = {
        key: "rzp_test_OjKeKREVkIoUBm", // Replace with your Razorpay Key ID
        amount: "50000", // Amount in paise (e.g., 50000 = ₹500)
        currency: "INR",
        name: "Acme Corp", // Your business name
        description: "Test Transaction",
        // image: "https://example.com/your_logo", // Your business logo URL
        order_id: data.orderId, // Order ID from the backend API
        // callback_url: "https://eneqd3r9zrjok.x.pipedream.net/", // Payment success callback URL
        prefill: {
          name: "Gaurav Kumar", // Customer's name
          email: "gaurav.kumar@example.com", // Customer's email
          contact: "9000090000", // Customer's phone number
        },
        // notes: {
        //   address: "Razorpay Corporate Office",
        // },
        theme: {
          color: "#3399cc",
        },
        handler: function (response) {
          console.log("Payment Successful:", response);
          alert(
            "Payment successful! Payment ID: " + response.razorpay_payment_id
          );
        },
      };

      if (window.Razorpay) {
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        // console.error("Razorpay SDK failed to load.");
        // alert("Razorpay SDK is not loaded. Please check your internet connection.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <button
        disabled={isProcessing}
        onClick={handlePayment}
        className="bg-blue-500 hover:bg-blue-600 w-[30vh] mg:w-[70vh] lg:w-[90vh] text-white font-bold py-2 px-4 rounded"
      >
        Pay
      </button>
    </>
  );
};

export default PaymentButton;
