"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Added for routing

const VentureForm = () => {
  const router = useRouter(); // ✅ Initialize router

  const fields = [
    {
      label: "Problem Statement",
      placeholder: "Enter your problem statement*",
    },
    {
      label: "Current Stage",
      placeholder: "Enter current stage of your startup*",
      hint: "e.g: Idea, Business Model, Proof of Concept, Early Revenue, Growth",
    },
    {
      label: "Target Customers",
      placeholder: "Enter your target customer segment*",
    },
    {
      label: "Competitors",
      placeholder: "Enter current direct/in-direct competitors*",
    },
    {
      label: "Revenue Model",
      placeholder: "Enter your Revenue Model*",
    },
    {
      label: "Selling Proposition",
      placeholder: "Enter your Unique Selling Proposition*",
    },
    {
      label: "Intellectual Property",
      placeholder: "Enter your Intellectual Property Advantage*",
    },
    {
      label: "Website Link",
      placeholder: "Enter link to your Startup Website (if any)",
    },
  ];

  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.label] = "";
      return acc;
    }, {})
  );

  const [error, setError] = useState("");

  const handleChange = (label, value) => {
    setFormData((prev) => ({ ...prev, [label]: value }));
    if (error) setError(""); // Clear error when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emptyFields = Object.entries(formData).filter(([_, value]) => !value);
    if (emptyFields.length > 0) {
      setError("Please fill out all required fields.");
    } else {
      setError("");
      // ✅ Navigate to next page
      router.push("/startup/personaldetails");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-[-100vh] right-[-200vh] w-[300vh] min-h-[300vh] rounded-2xl bg-blue-600"></div>
      <div className="w-full max-w-6xl my-6 bg-white rounded-lg shadow-2xl p-6 relative">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          Kindly fill all the details related to your startup:
        </h2>
        <div className="border-t-2 border-gray-200 pt-4">
          <h3 className="text-md font-semibold text-gray-600 mb-4">
            Venture Description:
          </h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {fields.map((field, index) => (
              <div key={index} className="relative">
                <label className="hidden md:block text-sm absolute right-5 top-[-1vh] font-medium bg-blue-400 rounded-md w-[30%] text-center text-white mb-2">
                  {field.label}
                </label>
                <textarea
                  className="w-full h-16 p-3 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder={field.placeholder}
                  value={formData[field.label]}
                  onChange={(e) => handleChange(field.label, e.target.value)}
                ></textarea>
                {field.hint && (
                  <p className="text-xs text-gray-400 mt-1">{field.hint}</p>
                )}
              </div>
            ))}
            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}
            <div className="text-center">
              <button
                type="submit"
                className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none"
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

export default VentureForm;
