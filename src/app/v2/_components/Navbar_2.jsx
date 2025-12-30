"use client"
import Link from "next/link";
import React from "react";

const Navbar_2 = () => {
  return (
    <div className="w-full h-[8vh] ">
      <div className="flex items-center py-4 gap-6">
        <div className="text-bolder text-lg">EQvisor</div>
        <div className="text-[#999999] text-sm flex gap-6 items-center">
          <Link href="/v2/eqfund">Go to HomePage</Link>
          <Link href="/v2/contact">Contact</Link>
          <button onClick={()=>{console.log("perform logout operation")}} className="text-sm">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar_2;
