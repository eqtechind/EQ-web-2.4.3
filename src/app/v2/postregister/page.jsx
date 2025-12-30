import React from "react";
import Navbar_2 from "../_components/Navbar_2";
import Image from "next/image";
import { instrumentSans } from "@/app/layout";
import Footer_2 from "../_components/Footer_2";

const Page = () => {
  return (
    <div className="px-[30vh] gap-6 flex flex-col inter">
      <Navbar_2 />
      <div className="w-full h-[70vh] bg-[#A5FF8A] grid place-items-center rounded-md py-6 ">
        <h1 className="text-[4rem] font-bold w-[60%] text-center">
          Let&apos;s Begin Your Investment Journey with Us.
        </h1>
      </div>
      <div className="w-full h-[60vh] bg-[#EDEDED] rounded-2xl flex overflow-hidden mt-20" style={{
        fontFamily:instrumentSans
      }}>
        {/* Left Side - Text */}
        <div className="w-1/2 flex flex-col items-center justify-center p-6 text-center">
        <div className="flex flex-col items-start justify-center px-[10vh]">

          <h1 className="text-4xl font-bold text-[#1F6DFF] ">EQFund</h1>
          <p className="mt-2 text-xl text-[#999999]  w-[80%] text-start">
            Instantly view summaries for recent activity and important trends
            right here.
          </p>
        </div>
        </div>

        {/* Right Side - Image */}
        <div className="w-1/2 h-full">
          <Image
            src="https://framerusercontent.com/images/H09nrbSPEBXrdUZMwdsm3ehYL4.jpg?width=1800&height=1508"
            alt="EQFund Preview"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="w-full mb-[20vh] h-[60vh] bg-[#EDEDED] rounded-2xl flex flex-row-reverse overflow-hidden" style={{
        fontFamily:instrumentSans
      }}>
        {/* Left Side - Text */}
        <div className="w-1/2 flex flex-col items-center justify-center p-6 text-center">
        <div className="flex flex-col items-start justify-center px-[10vh]">

          <h1 className="text-4xl font-bold text-[#1F6DFF] ">EQRaise</h1>
          <p className="mt-2 text-xl text-[#999999]  w-[80%] text-start">
          Generate tailored analytics to make smarter decisions and monitor performance metrics.          </p>
        </div>
        </div>

        {/* Right Side - Image */}
        <div className="w-1/2 h-full">
          <Image
            src="https://framerusercontent.com/images/btCFodV99QBQ8PVGelvsbuEIOQ.png?width=1200&height=800"
            alt="EQFund Preview"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <Footer_2/>
    </div>
  );
};

export default Page;
