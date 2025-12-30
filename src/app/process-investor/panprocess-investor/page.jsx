"use client";
import React, { useState, useEffect } from "react";
import Input from "@/components/Input";
import StepComponent from "@/components/StepComponent";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const PanProcess = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [pan, setPan] = useState("");
  const [dob, setDob] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState('unknown');
  const [connectionRetries, setConnectionRetries] = useState(0);

  // Check API availability on component mount
  useEffect(() => {
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

  // Enhanced submission logic with backend integration
  const handleContinue = async () => {
    if (!name || !pan || !dob) {
      toast.error("Please fill out all fields.");
      return;
    }

    // Validate PAN format
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(pan)) {
      toast.error("Please enter a valid PAN number (e.g., ABCDE1234F)");
      return;
    }

    setIsLoading(true);

    // Prepare data for backend
    const formData = {
      name: name.trim(),
      pan: pan.toUpperCase(),
      dateOfBirth: dob,
      step: 'pan_verification',
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('http://localhost:5001/api/investor/pan-verification', {
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
      toast.success("PAN verification successful!");
      
      // Store the verification data in localStorage for the next steps
      localStorage.setItem('investorPanData', JSON.stringify({
        ...formData,
        _id: result.data?._id || result._id,
        _verified: true
      }));

      // Navigate to next step
      router.push("/process-investor/digilocker-investor");

    } catch (error) {
      console.error('PAN verification failed:', error);
      
      // Check if it's a network error (backend not running)
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        toast.error("Backend server is not running. Please start the server or contact support.");
      } else if (error.message.includes('Backend server returned an error page')) {
        toast.error("Backend server error. Please check if the server is running correctly.");
      } else {
        toast.error("PAN verification failed: " + error.message);
      }
      
      setApiStatus('unavailable');
      
      // For development, continue with local storage even if API fails
      console.log('Continuing with local storage for development...');
      localStorage.setItem('investorPanData', JSON.stringify({
        ...formData,
        _id: `temp_${Date.now()}`,
        _savedLocally: true,
        _apiError: error.message
      }));
      
      // Still navigate to next step for development
      router.push("/process-investor/digilocker-investor");
    } finally {
      setIsLoading(false);
    }
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

          <div className="relative bg-white shadow-lg rounded-xl flex flex-col gap-10 w-[100%] max-w-md md:max-w-lg p-8 z-10">
            <div className="space-y-2">
              <input
                type="text"
                className="w-full outline-none border-b-2 border-gray-600 focus:border-blue-500 transition-colors"
                placeholder="Enter name as per PAN"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
              {name && name.length < 2 && (
                <p className="text-xs text-red-500">Name must be at least 2 characters</p>
              )}
            </div>
            
            <div className="w-full flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  className="w-full outline-none border-b-2 border-gray-600 focus:border-blue-500 transition-colors uppercase"
                  placeholder="Enter PAN (e.g., ABCDE1234F)"
                  value={pan}
                  onChange={(e) => setPan(e.target.value.toUpperCase())}
                  maxLength={10}
                  disabled={isLoading}
                />
                {pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan) && (
                  <p className="text-xs text-red-500">Invalid PAN format</p>
                )}
              </div>
              
              <div className="flex-1 space-y-2">
                <input
                  type="date"
                  className="w-full outline-none border-b-2 border-gray-600 focus:border-blue-500 transition-colors"
                  placeholder="DOB"
                  max={today}
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  disabled={isLoading}
                />
                {dob && new Date(dob) > new Date(today) && (
                  <p className="text-xs text-red-500">Date cannot be in the future</p>
                )}
              </div>
            </div>
            <div className="w-full flex justify-end">
              <Button
                onClick={handleContinue}
                disabled={isLoading || !name || !pan || !dob}
                className="bg-blue-500 hover:bg-blue-600 text-white flex gap-2 items-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanProcess;
