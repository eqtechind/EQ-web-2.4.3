import React, { useState } from "react";
import Success from "./Success";

const DigiLockerAccept = ({setAllowPage}) => {
    const [success,setSuccess]=useState(false);
    if(success){
        return <Success/>
    }
  return (
    <div className="w-full h-[100vh] flex items-center justify-center overflow-hidden">
      <div className="relative flex justify-center px-[1vh] z-[5] w-[100%] md:w-[70%] h-[70%]">
        <div className="login-shadow w-[100%] h-full flex gap-6 flex-col justify-center items-center md:py-[10vh] px-[4vh] md:px-[20vh]">
          <div className="flex flex-row items-center  justify-center gap-6 w-[100%] md:w-[70%]">
            <img src="/eqvisor_logo_2.png" className="w-[10vh] md:w-[25vh]" />
            <div className="w-[1px] bg-gray-400 h-[5vh] md:h-[10vh]"></div>
            <img src="/digilocker_logo.png" className="w-[8vh] h-[5vh] md:w-[15vh] md:h-[10vh]" />
          </div>
          <div className="text-center text-md md:text-xl">
            You are providing your consent to share your DigiLocker document
            with EQvisor.
          </div>
          <div className=" cursor-pointer flex w-full overflow-hidden rounded-full border-[1px] border-black ">
            <div onClick={()=>setSuccess(true)} className="flex gap-2 justify-center w-[50%] text-center bg-blue-500 text-white py-[1vh]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
              Allow
            </div>
            <div onClick={()=>setAllowPage(false)} className="w-[50%] text-center  py-[1vh]">Deny</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigiLockerAccept;
