"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; //  Import router

const StartUpForm = () => {
  const router = useRouter(); //  Initialize router

  const [teamMembers, setTeamMembers] = useState([
    { name: "", designation: "" },
    { name: "", designation: "" },
    { name: "", designation: "" },
    { name: "", designation: "" },
    { name: "", designation: "" },
  ]);

  const addMember = () => {
    setTeamMembers([...teamMembers, { name: "", designation: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index][field] = value;
    setTeamMembers(updatedMembers);
  };

  const handleContinue = () => {
    // You can add form validation here if needed
    router.push("/startup/venture-details"); //  Push to next page
  };

  return (
    <div className="max-w-full mx-auto py-4 relative overflow-hidden">
      <div className="w-[300vh] h-[200vh] absolute  rounded-l-full bg-blue-700 rotate-[-20deg] top-[-100vh] right-[-200vh]"></div>
      <div className="relative max-w-4xl mx-auto z-[100]">
        <h1 className="pt-8 text-xl font-bold mb-6 ">
          Kindly fill all the details related to your startup:
        </h1>
        <div className="bg-white p-8 shadow-[4px_10px_10px_10px_rgba(0,0,0,0.3)] rounded-md max-w-4xl mx-auto">
          {/* Startup Name */}
          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="startupName">
              Enter name of your startup*
            </label>
            <input
              type="text"
              id="startupName"
              className="w-full border border-gray-300 rounded p-2 focus:outline-blue-500"
              placeholder="Enter name of your startup*"
            />
          </div>

          {/* Domain of Work */}
          <div className="mb-6">
            <label className="block font-semibold mb-2" htmlFor="domain">
              Enter the domain of your work*
            </label>
            <input
              type="text"
              id="domain"
              className="w-full border border-gray-300 rounded p-2 focus:outline-blue-500"
              placeholder="Enter the domain of your work*"
            />
          </div>

          {/* Team Members */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Team member details:</span>
              <button
                className="text-blue-500 font-medium flex items-center hover:underline"
                onClick={addMember}
              >
                Add member <span className="ml-1 text-lg">+</span>
              </button>
            </div>
            <div className="border-b-2 border-gray-300 mb-4"></div>

            {teamMembers.map((member, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  className="border border-gray-300 rounded p-2 w-full focus:outline-blue-500"
                  placeholder={`Enter member name ${index + 1}*`}
                  value={member.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
                <input
                  type="text"
                  className="border border-gray-300 rounded p-2 w-full focus:outline-blue-500"
                  placeholder={`Enter member ${index + 1} designation*`}
                  value={member.designation}
                  onChange={(e) =>
                    handleChange(index, "designation", e.target.value)
                  }
                />
              </div>
            ))}
          </div>

          {/*  Continue Button */}
          <div className="mt-8 text-right">
            <button
              onClick={handleContinue}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartUpForm;
