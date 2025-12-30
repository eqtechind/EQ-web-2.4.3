"use client";
import React, { useState } from "react";

import Navbar from "./_components/Navbar";
import { Plus } from "lucide-react";

function NotRated() {
  return (
    <>
      <div className="flex gap-4 items-center mt-10">
        <input type="checkbox" />
        <div className="text-center text-lg">
          You have not filled the details required for obtaining Rating from us,
          kindly go to <span className="text-blue-500 italic">EQRate</span> in order to get your startup rated.<br></br>
        </div>
      </div>
      <div className="font-bold ml-9 text-lg italic">
        Unless you get rated we can&apos;t get you started with the funding rounds.
      </div>
    </>
  );
}

function ProfileDetails() {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="w-full mt-10 mx-auto bg-white border rounded-xl shadow-sm">
      {/* Tabs */}
      <div className="flex border-b text-sm font-medium">
        {[
          { key: "personal", label: "Personal Details" },
          { key: "startup", label: "Startup Details" },
          { key: "kyc", label: "Rating & KYC" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-3 ${
              activeTab === tab.key
                ? "border-b-2 border-black text-black"
                : "text-gray-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 space-y-6 text-sm leading-relaxed">
        {activeTab === "personal" && (
          <>
            {/* Personal Info */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Personal Details
              </h3>
              <div className="grid grid-cols-2 gap-y-2">
                <p>
                  <span className="font-medium">Name:</span> Austin Loyd
                </p>
                <p>
                  <span className="font-medium">Ph. Number:</span> 98987 07652
                </p>
                <p>
                  <span className="font-medium">Email:</span> austin@gmail.com
                </p>
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Address Details
              </h3>
              <div className="grid grid-cols-2 gap-y-2">
                <p>
                  <span className="font-medium">Country:</span> India
                </p>
                <p>
                  <span className="font-medium">State:</span> Maharashtra
                </p>
                <p>
                  <span className="font-medium">District:</span> Pune
                </p>
                <p className="col-span-2">
                  <span className="font-medium">Permanent Address:</span> Flat
                  102, Malban Heights, Akurdi, Pune-44
                </p>
                <p className="col-span-2">
                  <span className="font-medium">Regional Address:</span> Flat
                  102, Malban Heights, Akurdi, Pune-44
                </p>
              </div>
            </div>

            {/* Occupation */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Occupation Details
              </h3>
              <div className="grid grid-cols-2 gap-y-2">
                <p>
                  <span className="font-medium">Occupation:</span> Senior
                  Financial Advisor
                </p>
                <p>
                  <span className="font-medium">Annual Income:</span> 1,000,000
                  - 1,500,000
                </p>
              </div>
            </div>

            {/* PAN */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">PAN Details</h3>
              <p>
                <span className="font-medium">PAN:</span> AABJF4534N
              </p>
            </div>
          </>
        )}

        {activeTab === "startup" && (
          <>
            <div className="grid grid-cols-2 text-sm mb-4">
              <p>
                <span className="font-medium">Current Stage:</span> Ideation
              </p>
            </div>

            {/* Problem Statement */}
            <Section
              title="Problem Statement"
              text="Many individuals and businesses today struggle with managing everyday tasks efficiently..."
            />

            {/* Target Customers */}
            <Section
              title="Target Customers"
              text="The target customers for this startup could be small and medium-sized businesses..."
            />

            {/* Existing Competitors */}
            <Section
              title="Existing Competitors"
              text="The existing competitors for this startup could be small and medium-sized businesses..."
            />

            {/* Revenue Model */}
            <Section
              title="Revenue Model"
              text="The revenue model for this startup could be small and medium-sized businesses..."
            />

            {/* USP */}
            <Section
              title="Unique Selling Proposition (USP)"
              text="The unique selling proposition for this startup could be small and medium-sized businesses..."
            />

            {/* IP */}
            <Section
              title="Intellectual Property"
              text="The IP for this startup could be small and medium-sized businesses..."
            />

            {/* Object Clause */}
            <Section
              title="Object Clause"
              text="The Object Clause for this startup could be small and medium-sized businesses..."
            />

            {/* Capital */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                Approved Initial Capital
              </h3>
              <p className="text-2xl font-bold text-green-600">$450,000</p>
            </div>

            {/* Website */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                Website Details
              </h3>
              <p>
                <span className="font-medium">Website:</span>{" "}
                <a
                  href="https://www.eqvisor.in"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  www.eqvisor.in
                </a>
              </p>
            </div>
          </>
        )}

        {activeTab === "kyc" && (
          <div className="space-y-6">
            {/* KYC Status */}
            <div>
              <div className="flex items-center w-full mb-10">
                <h3 className="font-semibold text-gray-800 mb-2 w-[15vh]">
                  KYC Status
                </h3>{" "}
                <div className="w-full h-[2px] bg-gray-400"></div>
              </div>
              <div className="flex items-center gap-4">
                <div className=" rounded-md p-4 text-[4rem] font-semibold text-green-700">
                  Verified
                  <p className="text-[3rem] font-normal w-[100vh] text-gray-600 ">
                    by EQvisor Fintech Pvt. Ltd.
                  </p>
                </div>
                <video
                  src="https://framerusercontent.com/assets/eJ3mdXfxrMjFwGCoOU9dAnKNrAI.mp4"
                  loop
                  preload="auto"
                  poster="https://framerusercontent.com/images/5ndYkJQBzKgjvBwqCKDVEDOwII.png?width=1920&height=1080"
                  playsInline
                  autoPlay
                  style={{
                    cursor: "auto",
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                    display: "block",
                    objectFit: "cover",
                    backgroundColor: "rgba(28, 28, 28, 0)",
                    objectPosition: "50% 50%",
                  }}
                />
              </div>
            </div>

            {/* Rating Status */}
            <div>
              <div className="flex items-center w-full mb-10">
                <h3 className="font-semibold text-gray-800 mb-2 w-[15vh]">
                  Rating Status
                </h3>{" "}
                <div className="w-full h-[2px] bg-gray-400"></div>
              </div>
              <div className="relative w-full h-6 bg-gray-200 rounded">
                {/* Max rating bar */}
                <div className="absolute top-0 left-0 h-6 w-full bg-gray-300 rounded"></div>
                {/* Your rating */}
                <div
                  className="absolute top-0 left-0 h-6 bg-black rounded text-white text-xs flex items-center justify-end pr-2"
                  style={{ width: `${(7.05 / 10) * 100}%` }}
                >
                  7.05
                </div>
                {/* Max label */}
                <div className="absolute top-0 right-2 h-6 text-xs text-gray-500 flex items-center">
                  10.00
                </div>
              </div>

              {/* Legend */}
              <div className="flex gap-6 mt-2 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <span className="w-4 h-2 bg-black inline-block"></span>
                  Your Rating
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-4 h-2 bg-gray-300 inline-block"></span>
                  Maximum Possible Rating
                </div>
              </div>
              {/* <NotRated /> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* Helper Component for Sections */
function Section({ title, text }) {
  return (
    <div>
      <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}
function CompanyCard() {
  return (
    <div className="w-full mx-auto border rounded-xl shadow-sm flex items-center justify-between p-6 bg-white">
      {/* Left: Logo Placeholder */}
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 border rounded-md bg-gray-100 flex items-center justify-center">
          <Plus className="w-10 h-10 text-gray-600" />
        </div>

        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-semibold">Honzier and Sons</h2>
          <p className="text-lg text-gray-600">Domain: Construction</p>
          <p className="text-lg text-gray-600">
            Date of Registration: <span className="font-medium">29/08/25</span>
          </p>
        </div>
      </div>

      {/* Right: Progress & Status */}
      <div className="flex flex-col items-center gap-4">
        {/* Circular Progress */}
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16">
            <circle
              className="text-gray-200"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r="28"
              cx="32"
              cy="32"
            />
            <circle
              className="text-black"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r="28"
              cx="32"
              cy="32"
              strokeDasharray={2 * Math.PI * 28}
              strokeDashoffset={2 * Math.PI * 28 * (1 - 0.75)} // 75%
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-semibold">
            75%
          </span>
        </div>

        {/* Status */}
        <div className="flex flex-col items-center">
          <p className="text-sm font-medium">Profile Completion Status:</p>
          <p className="text-sm text-red-500">Incomplete</p>
          <button className="text-blue-600 text-xs font-medium hover:underline">
            See Why
          </button>
        </div>
      </div>
    </div>
  );
}
const page = () => {
  return (
    <div className="px-[10vh]">
      <Navbar />
      <CompanyCard />
      <ProfileDetails />
    </div>
  );
};

export default page;
