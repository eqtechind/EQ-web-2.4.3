"use client";
import React, { useState } from "react";

const InvestmentForm = () => {
  const [investmentType, setInvestmentType] = useState(""); // State to track the selected investment type

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="w-[100%] max-w-xl bg-gradient-to-tr bg-transparent from-blue-400 to-green-400 bg-opacity-10 rounded-lg shadow-lg p-6 backdrop-blur-md border border-blue-300">
        <h1 className="text-xl font-bold text-white mb-4">
          Invest in <span className="text-white">Google Corp.</span>
        </h1>

        <form>
          {/* Investment Amount Input */}
          <div className="mb-4">
            <label
              htmlFor="investmentAmount"
              className="block text-white text-sm font-medium mb-2"
            >
              Enter investment amount<span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              id="investmentAmount"
              placeholder="investment amount"
              className="w-full p-3 rounded-md bg-white bg-opacity-50 placeholder-gray-600 text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Investment Type */}
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2">
              Choose one<span className="text-red-500">*</span>:
            </label>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="equity"
                name="investmentType"
                value="equity"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                onChange={() => setInvestmentType("equity")}
              />
              <label htmlFor="equity" className="ml-2 text-white text-sm">
                Equity
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="equityDebt"
                name="investmentType"
                value="equityDebt"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                onChange={() => setInvestmentType("equityDebt")}
              />
              <label htmlFor="equityDebt" className="ml-2 text-white text-sm">
                Equity + Debt
              </label>
            </div>
          </div>

          {/* Equity Percentage and Debt Percentage */}

          <div className="mb-4 flex gap-4 w-full">
            {/* Equity Field */}
            <div className="mb-4 w-full">
              <label
                htmlFor="equityPercentage"
                className="block text-white text-sm font-medium mb-2"
              >
                Equity you will get:
              </label>
              <input
                type="text"
                id="equityPercentage"
                placeholder="equity percentage"
                className="w-full p-3 rounded-md bg-white bg-opacity-50 placeholder-gray-600 text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {investmentType === "equityDebt" && (
              <div className="w-full">
                <label
                  htmlFor="debtPercentage"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Debt percentage:
                </label>
                <input
                  type="text"
                  id="debtField"
                  placeholder="Debt %"
                  className="w-full p-3 rounded-md bg-white bg-opacity-50 placeholder-gray-600 text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-2 rounded-md text-blue-700 bg-white bg-opacity-80 shadow-md hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Go back
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md text-white bg-blue-600 shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Proceed to Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvestmentForm;
