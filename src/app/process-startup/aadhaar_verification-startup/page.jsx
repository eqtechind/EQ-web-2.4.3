"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

<Image
  src="https://cdn.prod.website-files.com/6953d4697b778fe505448f7e/6953d48e603683439ecd9ef4_pagelogo.png"
  alt="Eqvisor_logo"
  width={200}
  height={60}
/>

const Page = () => {
  const [captcha, setCaptcha] = useState("");
  const [userInput, setUserInput] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();
  // Generate a new CAPTCHA code
  function generateCaptcha() {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let captchaText = "";
    for (let i = 0; i < 6; i++) {
      captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captchaText;
  }

  // Generate CAPTCHA only on client side
  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // Handle Aadhaar number change
  const handleAadharChange = (e) => {
    setAadharNumber(e.target.value);
  };

  // Verify the CAPTCHA and Aadhaar number
  const verifyCaptchaAndAadhar = () => {
    // Aadhaar number validation (12 digits)
    const aadharPattern = /^\d{12}$/;
    if (!aadharPattern.test(aadharNumber)) {
      toast.error("Please enter a valid 12-digit Aadhaar number.");
      return;
    }

    // CAPTCHA verification
    if (userInput === captcha) {
      toast.success("Captcha verified successfully!");
      //TODO:preform aadhar verification if needed

      router.push("/process-startup/personal_information-startup");
    } else {
      toast.error("Captcha did not match, please try again.");
    }
  };

  // Refresh the CAPTCHA
  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setUserInput("");
    setMessage("");
  };

  return (
    <div className="w-full h-[100vh] px-[10vh] py-[15vh]">
      <div>
        <Eqvisor_logo className={"w-[auto] h-[4vh]"} />
        <p className="py-[4vh]">
          Completing further process will link your DigiLocker account with
          EQvisor application. Kindly make sure your DigiLocker account exists.
        </p>
        <input
          type="text"
          value={aadharNumber}
          onChange={handleAadharChange}
          className="w-full h-[7vh] border-[1px] rounded-xl px-[3vh]"
          placeholder="Enter Aadhaar Number*"
        />
        <p className="py-[8vh]">
          Please enter the captcha in the space given below:
        </p>
        <div className="flex gap-10">
          <div className="w-[40vh] h-[10vh] border-[1px] border-black flex items-center justify-center text-4xl font-bold relative">
            <div className="w-[90%] h-[1vh] bg-white absolute top-[49%]"></div>
            {captcha}
          </div>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            className="w-[40vh] h-[10vh] border-[1px] border-black px-2 text-center text-2xl"
            placeholder="Enter CAPTCHA"
          />
        </div>
        <p
          className="text-blue-600 cursor-pointer mt-2"
          onClick={refreshCaptcha}
        >
          Refresh Captcha
        </p>
        <button
          onClick={verifyCaptchaAndAadhar}
          className="w-full font-semibold mt-[5vh] rounded-lg bg-blue-600 py-2 text-white"
        >
          Next
        </button>
        {message && <p className="mt-4 text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default Page;
