"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React, { useEffect, useState } from "react";
import ResetPassword from "../_components/ResetPassword";
import { toast } from "sonner";

const Page = () => {
  const [otpStatus, setOtpStatus] = useState(false);
  const [timer, setTimer] = useState({ min: 5, sec: 0 });
  const [isActive, setIsActive] = useState(false);
  const [resendOtp, setResendOtp] = useState(true);
const [resetPasswordStatus,setResetPasswordStatus]=useState(false)
  // Function to handle timer countdown
  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          const { min, sec } = prevTimer;

          // When time is up
          if (min === 0 && sec === 0) {
            clearInterval(interval);
            setIsActive(false);
            setResendOtp(false); // Enable the resend button
            return { min: 0, sec: 0 };
          }

          // Countdown logic
          if (sec === 0) {
            return { min: min - 1, sec: 59 };
          } else {
            return { min, sec: sec - 1 };
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  // Function to start the timer
  const startTimer = () => {
    setIsActive(true);
    setResendOtp(true); // Disable the resend button
  };

  // Function to reset the timer
  const resetTimer = () => {
    setTimer({ min: 5, sec: 0 });
    setIsActive(false);
    setResendOtp(true);
  };
  if(resetPasswordStatus){
    return <ResetPassword/>
  }


  const handleSubmit=()=>{
toast.success("OTP verified successfully");
    //TODO:logic for validating user 

    //this function use to show resetpassword page
    setResetPasswordStatus(true);
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="w-[70%] h-[80%]">
        <h2 className="md:text-xl text-md">Kindly enter the mobile number linked to your Aadhaar card:</h2>
        <div className="login-shadow w-[100%] h-full py-[10vh] px-[10vh] ">
          <div className="flex flex-col gap-4">
            <div className="flex md:flex-row flex-col items-center gap-4">
              <input
                type="tel"
                id="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter mobile number"
                required
              />
              <div className="flex items-center gap-2">
                <div className="w-[20vh] md:w-[7vh] h-[2px] bg-blue-600"></div>
                <div>or</div>
                <div className="w-[20vh] md:w-[7vh] h-[2px] bg-blue-600"></div>
              </div>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter email ID"
                required
              />
            </div>
            {!otpStatus ? (
              <button
                onClick={() => {
                  setOtpStatus(true);
                  startTimer();
                }}
                className="w-full text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Get OTP
              </button>
            ) : (
              <button
                onClick={() => {
                  resetTimer();
                  startTimer();
                }}
                type="button"
                disabled={resendOtp}
                className={`w-full text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${
                  resendOtp ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                Resend OTP
              </button>
            )}
          </div>
          <div>
            <div className="flex justify-start gap-8 items-center pt-[10vh]">
              <InputOTP maxLength={4}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
              <div className="w-[30vh] h-[8vh] rounded-lg flex items-center justify-center inner-shadow">
                {timer.min.toString().padStart(2, "0")}:
                {timer.sec.toString().padStart(2, "0")}
              </div>
            </div>
            <button type="button" onClick={handleSubmit} className="w-[25vh] mt-[5vh] text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
