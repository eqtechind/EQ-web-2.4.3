"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Script from "next/script";

const UploadDocuments = () => {
  const [signatureFile, setSignatureFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [showKYCSuccess, setShowKYCSuccess] = useState(false); // State for KYC success pop-up
  const router = useRouter();

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      alert(`File uploaded: ${file.name}`);
    }
  };

  const handleContinue = () => {
    if (signatureFile && panFile) {
      // Show KYC success pop-up
      setShowKYCSuccess(true);
      
      // Redirect to home page after 3 seconds
      setTimeout(() => {
        router.push("/startup/team-member"); // Redirect to home page
      }, 3000);
    } else {
      alert("Please upload all required documents before continuing.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-[auto] overflow-hidden lg:min-h-screen bg-gray-50">
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      {/* KYC Success Pop-up */}
      {showKYCSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">KYC Done Successfully!</h3>
            <p className="text-gray-600 mb-4">
              Your documents have been verified successfully.
            </p>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-green-600 h-1.5 rounded-full animate-progress" 
                style={{ animationDuration: "3s" }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Redirecting to home page...
            </p>
          </div>
        </div>
      )}

      {/* Your existing form content */}
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-2xl">
        {/* Step Title */}
        <h3 className="text-gray-400 text-sm font-medium mb-2">Step 6 of 7</h3>
        <h2 className="text-gray-800 text-lg font-semibold mb-6">Upload documents</h2>

        {/* Income Proof - Disabled */}
        <div className="mb-6">
          <label className="block text-gray-600 text-sm mb-2">Income proof</label>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center">
            <select className="flex-grow border rounded px-3 py-2 text-sm text-gray-400 bg-gray-100">
              <option disabled value="" className="cursor-not-allowed">
                Select proof type
              </option>
              <option value="salary_slip">Salary Slip</option>
              <option value="bank_statement">Bank Statement</option>
            </select>
            <button className="bg-gray-300 text-gray-500 px-4 py-2 rounded text-sm font-medium cursor-not-allowed">
              Upload
            </button>
          </div>
        </div>

        {/* Signature Upload */}
        <div className="mb-6">
          <label className="block text-gray-600 text-sm mb-2">Signature*</label>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center">
            <label
              htmlFor="signatureUpload"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-medium cursor-pointer"
            >
              Upload
            </label>
            <input
              type="file"
              id="signatureUpload"
              className="hidden"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => handleFileChange(e, setSignatureFile)}
            />
            <p className="text-gray-500 text-xs">
              Kindly upload a signature done with a pen on a blank piece of paper. 
              Signature done by pencil, markers, etc. will not be accepted.
            </p>
          </div>
          {signatureFile && (
            <p className="text-green-600 text-xs mt-1">Uploaded: {signatureFile.name}</p>
          )}
        </div>

        {/* Copy of PAN Upload */}
        <div className="mb-8">
          <label className="block text-gray-600 text-sm mb-2">Copy of PAN*</label>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center">
            <label
              htmlFor="panUpload"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-medium cursor-pointer"
            >
              Upload
            </label>
            <input
              type="file"
              id="panUpload"
              className="hidden"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => handleFileChange(e, setPanFile)}
            />
            <p className="text-gray-500 text-xs">Upload a copy of your PAN card.</p>
          </div>
          {panFile && (
            <p className="text-green-600 text-xs mt-1">Uploaded: {panFile.name}</p>
          )}
        </div>

        {/* Continue Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleContinue}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm font-semibold transition"
          >
            Continue
          </button>
        </div>
      </div>

      {/* Add this to your global CSS or in a style tag */}
      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress linear forwards;
        }
      `}</style>
    </div>
  );
};

export default UploadDocuments;