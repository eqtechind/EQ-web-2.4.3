"use client";
import React from "react";
import { useRouter } from "next/navigation"; // ✅ Added this line

const PersonalInformationForm = () => {
  const router = useRouter(); // ✅ Added this line

  const handleContinue = (e) => {
    e.preventDefault(); // ✅ Prevent default form submission
    router.push("/startup/documents"); // ✅ Replace with your actual next path
  };

  return (
    <div className="py-6 bg-white">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-gray-400 text-lg mb-4">Step 3 of 6</h2>
          <h3 className="text-2xl font-semibold mb-6 text-center sm:text-left">
            Personal Information
          </h3>

          <form
            onSubmit={handleContinue} // ✅ Added this line
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white rounded-lg shadow-2xl p-6 sm:p-8"
          >
            {/* Father's Name */}
            <div>
              <input
                type="text"
                placeholder="Father’s first name*"
                className="w-full border-b border-gray-300 p-2 focus:outline-none focus:ring-0"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Father’s last name*"
                className="w-full border-b border-gray-300 p-2 focus:outline-none focus:ring-0"
              />
            </div>

            {/* Mother's Name */}
            <div>
              <input
                type="text"
                placeholder="Mother’s first name*"
                className="w-full border-b border-gray-300 p-2 focus:outline-none focus:ring-0"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Mother’s last name*"
                className="w-full border-b border-gray-300 p-2 focus:outline-none focus:ring-0"
              />
            </div>

            {/* Income, Contact 1, and Contact 2 */}
            <div className="sm:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <input
                type="text"
                placeholder="Annual income*"
                className="w-full border-b border-gray-300 p-2 focus:outline-none focus:ring-0"
              />
              <input
                type="text"
                placeholder="Contact number 1*"
                className="w-full border-b border-gray-300 p-2 focus:outline-none focus:ring-0"
              />
              <input
                type="text"
                placeholder="Contact number 2*"
                className="w-full border-b border-gray-300 p-2 focus:outline-none focus:ring-0"
              />
            </div>

            {/* Startup Age and Billing Address */}
            <div className="sm:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Age of your startup (in years)*"
                className="w-full border-b border-gray-300 p-2 focus:outline-none focus:ring-0"
              />
              <input
                type="text"
                placeholder="Billing Address*"
                className="w-full border-b border-gray-300 p-2 focus:outline-none focus:ring-0"
              />
            </div>

            {/* Button */}
            <div className="sm:col-span-2 mt-6">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationForm;
