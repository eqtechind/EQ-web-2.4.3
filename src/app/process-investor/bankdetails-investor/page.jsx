"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export const UploadSec = () => {
  // State to store form data separately
  const router = useRouter();
  const [ifscData, setIfscData] = useState({
    IFSC: "",
    MICR: "",
    AC: "",
  });

  const [upiData, setUpiData] = useState({
    BANK: "",
    UPI: "",
  });

  // Separate states for terms and conditions checkboxes
  const [ifscTermsAccepted, setIfscTermsAccepted] = useState(false);
  const [upiTermsAccepted, setUpiTermsAccepted] = useState(false);

  // Backend integration states
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

  // Input change handler for IFSC form
  const handleIfscChange = (e) => {
    const { name, value } = e.target;
    setIfscData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Input change handler for UPI form
  const handleUpiChange = (e) => {
    const { name, value } = e.target;
    setUpiData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Enhanced form submit handler for IFSC Form
  const handleIfscSubmit = async (e) => {
    e.preventDefault();
    
    if (!ifscTermsAccepted) {
      toast.error("You must accept the terms and conditions to proceed for IFSC form.");
      return;
    }

    if (!ifscData.IFSC || !ifscData.MICR || !ifscData.AC) {
      toast.error("Please fill in all IFSC form fields.");
      return;
    }

    setIsLoading(true);

    // Prepare data for backend
    const submissionData = {
      bankDetails: {
        type: "IFSC",
        ifscCode: ifscData.IFSC.trim(),
        micrCode: ifscData.MICR.trim(),
        accountNumber: ifscData.AC.trim(),
      },
      step: 'bank_details',
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('http://localhost:5001/api/investor/bank-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Non-JSON response received:', textResponse);
        throw new Error('Backend server returned an error page. Please check if the server is running.');
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong on the server.');
      }

      setApiStatus('available');
      toast.success("Bank details saved successfully!");
      
      // Store the bank details data in localStorage for the next steps
      localStorage.setItem('investorBankDetailsData', JSON.stringify({
        ...submissionData,
        _id: result.data?._id || result._id,
        _verified: true
      }));

      // Navigate to next step
      router.push("/process-investor/faceverification-investor");

    } catch (error) {
      console.error('Bank details submission failed:', error);
      
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        toast.error("Backend server is not running. Please start the server or contact support.");
      } else if (error.message.includes('Backend server returned an error page')) {
        toast.error("Backend server error. Please check if the server is running correctly.");
      } else {
        toast.error("Bank details submission failed: " + error.message);
      }
      
      setApiStatus('unavailable');
      
      // For development, continue with local storage even if API fails
      console.log('Continuing with local storage for development...');
      localStorage.setItem('investorBankDetailsData', JSON.stringify({
        ...submissionData,
        _id: `temp_${Date.now()}`,
        _savedLocally: true,
        _apiError: error.message
      }));
      
      // Still navigate to next step for development
      router.push("/process-investor/faceverification-investor");
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced form submit handler for UPI Form
  const handleUpiSubmit = async (e) => {
    e.preventDefault();
    
    if (!upiTermsAccepted) {
      toast.error("You must accept the terms and conditions to proceed for UPI form.");
      return;
    }

    if (!upiData.BANK || !upiData.UPI) {
      toast.error("Please fill in all UPI form fields.");
      return;
    }

    setIsLoading(true);

    // Prepare data for backend
    const submissionData = {
      bankDetails: {
        type: "UPI",
        bankName: upiData.BANK.trim(),
        upiId: upiData.UPI.trim(),
      },
      step: 'bank_details',
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('http://localhost:5001/api/investor/bank-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Non-JSON response received:', textResponse);
        throw new Error('Backend server returned an error page. Please check if the server is running.');
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong on the server.');
      }

      setApiStatus('available');
      toast.success("Bank details saved successfully!");
      
      // Store the bank details data in localStorage for the next steps
      localStorage.setItem('investorBankDetailsData', JSON.stringify({
        ...submissionData,
        _id: result.data?._id || result._id,
        _verified: true
      }));

      // Navigate to next step
      router.push("/process-investor/faceverification-investor");

    } catch (error) {
      console.error('Bank details submission failed:', error);
      
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        toast.error("Backend server is not running. Please start the server or contact support.");
      } else if (error.message.includes('Backend server returned an error page')) {
        toast.error("Backend server error. Please check if the server is running correctly.");
      } else {
        toast.error("Bank details submission failed: " + error.message);
      }
      
      setApiStatus('unavailable');
      
      // For development, continue with local storage even if API fails
      console.log('Continuing with local storage for development...');
      localStorage.setItem('investorBankDetailsData', JSON.stringify({
        ...submissionData,
        _id: `temp_${Date.now()}`,
        _savedLocally: true,
        _apiError: error.message
      }));
      
      // Still navigate to next step for development
      router.push("/process-investor/faceverification-investor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      {/* Main Container */}
      <section className="w-full max-w-5xl bg-white p-4 md:p-8 rounded-lg shadow-md border border-gray-300">
        {/* Heading */}
        <div className="text-center mb-8">
          <h3 className="text-gray-500 text-sm font-medium">Step 4 of 7</h3>
          <h1 className="text-2xl md:text-3xl font-semibold mt-2">
            Link your bank account
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Bank account should be in your name from which you will transact
            funds for investment.
          </p>
        </div>

        {/* API Status Indicator */}
        <div className="mb-6 flex items-center justify-center gap-2">
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

        {/* Forms Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Left Form - IFSC */}
          <form
            onSubmit={handleIfscSubmit}
            className="w-full md:w-1/2 border border-gray-300 rounded-md shadow-sm p-4 md:p-6"
          >
            <h2 className="text-lg font-semibold mb-4">Link using IFSC</h2>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              IFSC Code
            </label>
            <input
              type="text"
              name="IFSC"
              placeholder="Enter IFSC code"
              className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-blue-500 transition-colors"
              value={ifscData.IFSC}
              onChange={handleIfscChange}
              disabled={isLoading}
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Branch MICR Code
            </label>
            <input
              type="text"
              name="MICR"
              placeholder="Enter MICR code"
              className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-blue-500 transition-colors"
              value={ifscData.MICR}
              onChange={handleIfscChange}
              disabled={isLoading}
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Bank Account Number
            </label>
            <textarea
              name="AC"
              placeholder="Enter Bank account number"
              rows={2}
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-blue-500 transition-colors"
              value={ifscData.AC}
              onChange={handleIfscChange}
              disabled={isLoading}
            />

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={ifscTermsAccepted}
                onChange={(e) => setIfscTermsAccepted(e.target.checked)}
                className="mr-2"
                disabled={isLoading}
              />
              <span className="text-sm text-gray-700">
                I accept the terms{" "}
                <a href="/terms" className="text-blue-500 underline">
                  Read our T&Cs
                </a>
              </span>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !ifscTermsAccepted || !ifscData.IFSC || !ifscData.MICR || !ifscData.AC}
              className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 flex gap-2 items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save information'
              )}
            </Button>
          </form>
          <div className="hidden md:flex flex-col items-center">
            <div className="w-[3px] h-[10vh] bg-blue-500"></div>
            <span className="text-gray-400 font-semibold text-xl">or</span>
            <div className="w-[3px] h-[10vh] bg-blue-500"></div>
          </div>

          {/* Right Form - UPI */}
          <form
            onSubmit={handleUpiSubmit}
            className="w-full md:w-1/2 border border-gray-300 rounded-md shadow-sm p-4 md:p-6"
          >
            <h2 className="text-lg font-semibold mb-4">Link using UPI-ID</h2>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Bank Name
            </label>
            <input
              type="text"
              name="BANK"
              placeholder="Enter Bank name"
              className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-blue-500 transition-colors"
              value={upiData.BANK}
              onChange={handleUpiChange}
              disabled={isLoading}
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">
              Valid UPI-ID
            </label>
            <input
              type="text"
              name="UPI"
              placeholder="Enter valid UPI-ID"
              className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-blue-500 transition-colors"
              value={upiData.UPI}
              onChange={handleUpiChange}
              disabled={isLoading}
            />

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={upiTermsAccepted}
                onChange={(e) => setUpiTermsAccepted(e.target.checked)}
                className="mr-2"
                disabled={isLoading}
              />
              <span className="text-sm text-gray-700">
                I accept the terms{" "}
                <a href="/terms" className="text-blue-500 underline">
                  Read our T&Cs
                </a>
              </span>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !upiTermsAccepted || !upiData.BANK || !upiData.UPI}
              className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 flex gap-2 items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save information'
              )}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default UploadSec;
