"use client";
import StepComponent from "@/components/StepComponent";
import Link from "next/link";
import React, { useState } from "react";
import DigiLockerAccept from "./_components/DigiLockerAccept";

const Page = () => {
  const [allowPage, setAllowPage] = useState(false);
  if (allowPage) {
    return <DigiLockerAccept setAllowPage={setAllowPage} />;
  }
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="relative pl-[5vh] z-[5] w-[100%] md:w-[70%] h-[70%]">
        <StepComponent
          step={1}
          totalStep={7}
          description={"Aadhaar KYC using DigiLocker"}
        />
        <div className="relative bg-white z-[5]  rounded-xl flex flex-col gap-10 w-[90%] md:w-[70%] pt-[3vh] pb-[5vh] h-[70%]">
          <p>
            We will collect your address-related information from DigiLocker
            account for KYC. Your Aadhaar number/copy will not be stored.
            <br></br>
            <br></br>
            <br></br>
            The Aadhaar and PAN ABCD0789I should belong to you, the applicant.
            If it does not,
            <Link className="text-blue-500" href={"/panprocess"}>
              start over
            </Link>
          </p>
          <button
            onClick={() => {
              setAllowPage(true);
            }}
            className="w-full rounded-md bg-blue-600 py-2 text-white"
          >
            Continue to DigiLocker
          </button>
          <p className="text-slate-400 text-sm pt-[6vh]">
            *By clicking the above button, I consent to use my Aadhaar related
            documents and information to conduct online KYC for opening an
            account in the EQvisor pvt. ltd. in order to avail the services they
            provide.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
