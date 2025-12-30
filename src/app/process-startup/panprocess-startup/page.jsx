"use client";
import React, { useState } from "react";
import Input from "@/components/Input";
import StepComponent from "@/components/StepComponent";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const PanProcess = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [pan, setPan] = useState("");
  const [dob, setDob] = useState("");

  const handleContinue = () => {
    if (!name || !pan || !dob) {
      toast.error("Please fill out all fields.");
      return;
    }
    router.push("/process-startup/digilocker-startup");
  };

  // Set max date to today’s date
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="w-full h-screen overflow-hidden flex items-center justify-center bg-gray-50">
      <div className="relative w-full max-w-lg md:max-w-2xl lg:max-w-3xl flex items-center justify-center">
        {/* Background Circle */}
        <div className="absolute max-sm:hidden top-[-50vh] left-[10vh] md:top-[-120vh] md:left-[50vh] w-[150vw] h-[150vw] md:w-[100vw] md:h-[100vw] bg-blue-400 rounded-full overflow-hidden z-10"></div>

        {/* Main Content */}
        <div className="z-20 w-[92%]">
            <StepComponent
              step={1}
              totalStep={7}
              description={"Starting with your PAN"}
            />
          <div className="relative bg-white shadow-lg rounded-xl flex flex-col gap-10 w-[100%] max-w-md md:max-w-lg p-8 z-10">
            <input
              type="text"
              className="w-full outline-none border-b-2 border-gray-600"
              placeholder="Enter name as per PAN"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="w-full flex flex-col md:flex-row gap-6 items-center">
              <input
                type="text"
                className="w-full outline-none border-b-2 border-gray-600"
                placeholder="Enter PAN"
                value={pan}
                onChange={(e) => setPan(e.target.value)}
              />
              <input
                type="date"
                className="w-full outline-none border-b-2 border-gray-600"
                placeholder="DOB"
                max={today}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div className="w-full flex justify-end">
              <p
                className="text-blue-500 flex gap-2 items-center cursor-pointer"
                onClick={handleContinue}
              >
                Continue
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanProcess;
