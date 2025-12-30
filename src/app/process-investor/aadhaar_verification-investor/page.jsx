"use client";
import Eqvisor_logo from "https://media.licdn.com/dms/image/v2/D560BAQEtp8LUQovjLw/company-logo_200_200/B56ZYbwvUfHoAc-/0/1744222484219/eqvisor_logo?e=2147483647&v=beta&t=k2MuNSdz_89hfC0Lpg400VwMXHlWalo_lcTu1s5yOrA";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const Page = () => {
  const [captcha, setCaptcha] = useState("");
  const [userInput, setUserInput] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState('unknown');
  const [connectionRetries, setConnectionRetries] = useState(0);

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
    checkApiAvailability();
  }, []);

  // Check if API is available
  const checkApiAvailability = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        setApiStatus('available');
      } else {
        setApiStatus('unavailable');
      }
    } catch (error) {
      console.log('API health check failed:', error.message);
      setApiStatus('unavailable');
    }
  };

  // Retry API connection
  const retryApiConnection = async () => {
    setConnectionRetries(prev => prev + 1);
    await checkApiAvailability();
  };

  // Handle input change
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // Handle Aadhaar number change
  const handleAadharChange = (e) => {
    setAadharNumber(e.target.value);
  };

  // Verify the CAPTCHA and Aadhaar number
  const verifyCaptchaAndAadhar = async () => {
    // Aadhaar number validation (12 digits)
    const aadharPattern = /^\d{12}$/;
    if (!aadharPattern.test(aadharNumber)) {
      toast.error("Please enter a valid 12-digit Aadhaar number.");
      return;
    }

    // CAPTCHA verification
    if (userInput !== captcha) {
      toast.error("Captcha did not match, please try again.");
      return;
    }

    setIsLoading(true);

    // Prepare data for backend
    const formData = {
      aadhaarNumber: aadharNumber,
      captcha: userInput,
      step: 'aadhaar_verification',
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('http://localhost:5001/api/investor/aadhaar-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        // If not JSON, likely an HTML error page
        const textResponse = await response.text();
        console.error('Non-JSON response received:', textResponse);
        throw new Error('Backend server returned an error page. Please check if the server is running.');
      }

      const result = await response.json();

      if (!response.ok) {
        // Handle server-side errors
        throw new Error(result.message || 'Something went wrong on the server.');
      }

      setApiStatus('available');
      toast.success("Aadhaar verification successful!");
      
      // Store the verification data in localStorage for the next steps
      localStorage.setItem('investorAadhaarData', JSON.stringify({
        ...formData,
        _id: result.data?._id || result._id,
        _verified: true
      }));

      // Navigate to next step
      router.push("/process-investor/personal_information-investor");

    } catch (error) {
      console.error('Aadhaar verification failed:', error);
      
      // Check if it's a network error (backend not running)
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        toast.error("Backend server is not running. Please start the server or contact support.");
      } else if (error.message.includes('Backend server returned an error page')) {
        toast.error("Backend server error. Please check if the server is running correctly.");
      } else {
        toast.error("Aadhaar verification failed: " + error.message);
      }
      
      setApiStatus('unavailable');
      
      // For development, continue with local storage even if API fails
      console.log('Continuing with local storage for development...');
      localStorage.setItem('investorAadhaarData', JSON.stringify({
        ...formData,
        _id: `temp_${Date.now()}`,
        _savedLocally: true,
        _apiError: error.message
      }));
      
      // Still navigate to next step for development
      router.push("/process-investor/personal_information-investor");
    } finally {
      setIsLoading(false);
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
        
        {/* API Status Indicator */}
        <div className="mb-4 flex items-center justify-center gap-2">
          {apiStatus === 'available' ? (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Backend connected</span>
            </div>
          ) : apiStatus === 'unavailable' ? (
            <div className="flex items-center gap-2 text-orange-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Backend unavailable - will save locally</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={retryApiConnection}
                disabled={connectionRetries >= 3}
                className="ml-2 text-xs"
              >
                Retry
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Checking connection...</span>
            </div>
          )}
        </div>

        <p className="py-[4vh]">
          Completing further process will link your DigiLocker account with
          EQvisor application. Kindly make sure your DigiLocker account exists.
        </p>
        <input
          type="text"
          value={aadharNumber}
          onChange={handleAadharChange}
          className="w-full h-[7vh] border-[1px] rounded-xl px-[3vh] focus:border-blue-500 transition-colors"
          placeholder="Enter Aadhaar Number*"
          disabled={isLoading}
          maxLength={12}
        />
        {aadharNumber && !/^\d{12}$/.test(aadharNumber) && (
          <p className="text-xs text-red-500 mt-1">Please enter a valid 12-digit Aadhaar number</p>
        )}
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
            className="w-[40vh] h-[10vh] border-[1px] border-black px-2 text-center text-2xl focus:border-blue-500 transition-colors"
            placeholder="Enter CAPTCHA"
            disabled={isLoading}
          />
        </div>
        <p
          className="text-blue-600 cursor-pointer mt-2"
          onClick={refreshCaptcha}
        >
          Refresh Captcha
        </p>
        <Button
          onClick={verifyCaptchaAndAadhar}
          disabled={isLoading || !aadharNumber || !userInput}
          className="w-full font-semibold mt-[5vh] rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700 flex gap-2 items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Verifying...
            </>
          ) : (
            'Next'
          )}
        </Button>
        {message && <p className="mt-4 text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default Page;
