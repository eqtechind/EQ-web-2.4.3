"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const UploadSec = () => {
  // State to store form data separately
  const router = useRouter();
  const [ifscData, setIfscData] = useState({
    IFSC: "",
    MICR: "",
    AC: "",
  });

  const [upiData, setUpiData] = useState({
    BANK: "",
    UPI: "",
  });

  // Separate states for terms and conditions checkboxes
  const [ifscTermsAccepted, setIfscTermsAccepted] = useState(false);
  const [upiTermsAccepted, setUpiTermsAccepted] = useState(false);

  // Input change handler for IFSC form
  const handleIfscChange = (e) => {
    const { name, value } = e.target;
    setIfscData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Input change handler for UPI form
  const handleUpiChange = (e) => {
    const { name, value } = e.target;
    setUpiData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form submit handler for IFSC Form
  const handleIfscSubmit = (e) => {
    e.preventDefault();
    if (!ifscTermsAccepted) {
      alert(
        "You must accept the terms and conditions to proceed for IFSC form."
      );
    } else {
      const formattedData = {
        type: "IFSC Form",
        IFSC_Code: ifscData.IFSC,
        MICR_Code: ifscData.MICR,
        Account_Number: ifscData.AC,
      };
      console.log("IFSC Form Data:", formattedData);
      router.push("/process-startup/faceverification-startup");
    }
  };

  // Form submit handler for UPI Form
  const handleUpiSubmit = (e) => {
    e.preventDefault();
    if (!upiTermsAccepted) {
      alert(
        "You must accept the terms and conditions to proceed for UPI form."
      );
    } else {
      const formattedData = {
        type: "UPI Form",
        Bank_Name: upiData.BANK,
        UPI_ID: upiData.UPI,
      };
      console.log("UPI Form Data:", formattedData);
      router.push("/faceverification");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      {/* Main Container */}
      <section className="w-full max-w-5xl bg-white p-4 md:p-8 rounded-lg shadow-md border border-gray-300">
        {/* Heading */}
        <div className="text-center mb-8">
          <h3 className="text-gray-500 text-sm font-medium">Step 4 of 7</h3>
          <h1 className="text-2xl md:text-3xl font-semibold mt-2">
            Link your bank account
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Bank account should be in your name from which you will transact
            funds for investment.
          </p>
        </div>

        {/* Forms Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Left Form - IFSC */}
          <form
            onSubmit={handleIfscSubmit}
            className="w-full md:w-1/2 border border-gray-300 rounded-md shadow-sm p-4 md:p-6"
          >
            <h2 className="text-lg font-semibold mb-4">Link using IFSC</h2>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              IFSC Code
            </label>
            <input
              type="text"
              name="IFSC"
              placeholder="Enter IFSC code"
              className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-blue-500"
              value={ifscData.IFSC}
              onChange={handleIfscChange}
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Branch MICR Code
            </label>
            <input
              type="text"
              name="MICR"
              placeholder="Enter MICR code"
              className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-blue-500"
              value={ifscData.MICR}
              onChange={handleIfscChange}
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Bank Account Number
            </label>
            <textarea
              name="AC"
              placeholder="Enter Bank account number"
              rows={2}
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-blue-500"
              value={ifscData.AC}
              onChange={handleIfscChange}
            />

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={ifscTermsAccepted}
                onChange={(e) => setIfscTermsAccepted(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">
                I accept the terms{" "}
                <a href="/terms" className="text-blue-500 underline">
                  Read our T&Cs
                </a>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Save information
            </button>
          </form>
          <div className="hidden md:flex flex-col items-center">
            <div className="w-[3px] h-[10vh] bg-blue-500"></div>
            <span className="text-gray-400 font-semibold text-xl">or</span>
            <div className="w-[3px] h-[10vh] bg-blue-500"></div>
          </div>

          {/* Right Form - UPI */}
          <form
            onSubmit={handleUpiSubmit}
            className="w-full md:w-1/2 border border-gray-300 rounded-md shadow-sm p-4 md:p-6"
          >
            <h2 className="text-lg font-semibold mb-4">Link using UPI-ID</h2>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Bank Name
            </label>
            <input
              type="text"
              name="BANK"
              placeholder="Enter Bank name"
              className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-blue-500"
              value={upiData.BANK}
              onChange={handleUpiChange}
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Valid UPI-ID
            </label>
            <input
              type="text"
              name="UPI"
              placeholder="Enter valid UPI-ID"
              className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-blue-500"
              value={upiData.UPI}
              onChange={handleUpiChange}
            />

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={upiTermsAccepted}
                onChange={(e) => setUpiTermsAccepted(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">
                I accept the terms{" "}
                <a href="/terms" className="text-blue-500 underline">
                  Read our T&Cs
                </a>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Save information
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default UploadSec;
