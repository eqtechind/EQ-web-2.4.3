"use client"; 
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Success = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/process-investor/aadhaar_verification-investor  "); // Redirects to Aadhar no
    }, 3000);
  }, [router]);

  return (
    <div className="w-full flex-col gap-8 h-[100vh] overflow-hidden flex justify-center items-center">
      <div className="bg-blue-600 w-[20vh] h-[20vh] md:w-[30vh] md:h-[30vh] rounded-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="size-20"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </div>
      <h1 className="text-3xl font-semibold text-blue-500 md:text-4xl">
        Success!
      </h1>
      <p className="text-lg text-gray-500">Redirecting...</p>
    </div>
  );
};

export default Success;
