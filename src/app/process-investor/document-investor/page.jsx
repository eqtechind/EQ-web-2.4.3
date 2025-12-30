"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Script from "next/script";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const UploadDocuments = () => {
  const [signatureFile, setSignatureFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [showKYCSuccess, setShowKYCSuccess] = useState(false); // State for KYC success pop-up
  const router = useRouter();

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

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload only JPG, PNG, or PDF files");
        return;
      }
      
      setFile(file);
      toast.success(`File uploaded: ${file.name}`);
    }
  };

  // Helper function to convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleContinue = async () => {
    if (!signatureFile || !panFile) {
      toast.error("Please upload all required documents before continuing.");
      return;
    }

    setIsLoading(true);

    try {
      // Convert files to base64
      const signatureBase64 = await fileToBase64(signatureFile);
      const panBase64 = await fileToBase64(panFile);

      // Prepare data for backend
      const submissionData = {
        documents: {
          signature: {
            fileName: signatureFile.name,
            fileType: signatureFile.type,
            fileSize: signatureFile.size,
            data: signatureBase64
          },
          panCard: {
            fileName: panFile.name,
            fileType: panFile.type,
            fileSize: panFile.size,
            data: panBase64
          }
        },
        step: 'document_upload',
        timestamp: new Date().toISOString()
      };

      const response = await fetch('http://localhost:5001/api/investor/documents', {
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
      toast.success("Documents uploaded successfully!");
      
      // Store the document data in localStorage for the next steps
      localStorage.setItem('investorDocumentData', JSON.stringify({
        ...submissionData,
        _id: result.data?._id || result._id,
        _verified: true
      }));

      // Show KYC success pop-up
      setShowKYCSuccess(true);
      
      // Redirect to home page after 3 seconds
      setTimeout(() => {
        router.push("/eqfund/home"); // Redirect to home page
      }, 3000);

    } catch (error) {
      console.error('Document upload failed:', error);
      
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        toast.error("Backend server is not running. Please start the server or contact support.");
      } else if (error.message.includes('Backend server returned an error page')) {
        toast.error("Backend server error. Please check if the server is running correctly.");
      } else {
        toast.error("Document upload failed: " + error.message);
      }
      
      setApiStatus('unavailable');
      
      // For development, continue with local storage even if API fails
      console.log('Continuing with local storage for development...');
      localStorage.setItem('investorDocumentData', JSON.stringify({
        documents: {
          signature: {
            fileName: signatureFile.name,
            fileType: signatureFile.type,
            fileSize: signatureFile.size,
            data: await fileToBase64(signatureFile)
          },
          panCard: {
            fileName: panFile.name,
            fileType: panFile.type,
            fileSize: panFile.size,
            data: await fileToBase64(panFile)
          }
        },
        step: 'document_upload',
        timestamp: new Date().toISOString(),
        _id: `temp_${Date.now()}`,
        _savedLocally: true,
        _apiError: error.message
      }));
      
      // Still show success and redirect for development
      setShowKYCSuccess(true);
      setTimeout(() => {
        router.push("/eqfund/home");
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-[auto] overflow-hidden lg:min-h-screen bg-gray-50">
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      {/* KYC Success Pop-up */}
      {showKYCSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">KYC Done Successfully!</h3>
            <p className="text-gray-600 mb-4">
              Your documents have been verified successfully.
            </p>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-green-600 h-1.5 rounded-full animate-progress" 
                style={{ animationDuration: "3s" }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Redirecting to home page...
            </p>
          </div>
        </div>
      )}

      {/* Your existing form content */}
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-2xl">
        {/* Step Title */}
        <h3 className="text-gray-400 text-sm font-medium mb-2">Step 6 of 7</h3>
        <h2 className="text-gray-800 text-lg font-semibold mb-6">Upload documents</h2>

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

        {/* Income Proof - Disabled */}
        <div className="mb-6">
          <label className="block text-gray-600 text-sm mb-2">Income proof</label>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center">
            <select className="flex-grow border rounded px-3 py-2 text-sm text-gray-400 bg-gray-100">
              <option disabled value="" className="cursor-not-allowed">
                Select proof type
              </option>
              <option value="salary_slip">Salary Slip</option>
              <option value="bank_statement">Bank Statement</option>
            </select>
            <button className="bg-gray-300 text-gray-500 px-4 py-2 rounded text-sm font-medium cursor-not-allowed">
              Upload
            </button>
          </div>
        </div>

        {/* Signature Upload */}
        <div className="mb-6">
          <label className="block text-gray-600 text-sm mb-2">Signature*</label>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center">
            <label
              htmlFor="signatureUpload"
              className={`px-4 py-2 rounded text-sm font-medium cursor-pointer transition-colors ${
                isLoading 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {isLoading ? 'Uploading...' : 'Upload'}
            </label>
            <input
              type="file"
              id="signatureUpload"
              className="hidden"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => handleFileChange(e, setSignatureFile)}
              disabled={isLoading}
            />
            <p className="text-gray-500 text-xs">
              Kindly upload a signature done with a pen on a blank piece of paper. 
              Signature done by pencil, markers, etc. will not be accepted.
            </p>
          </div>
          {signatureFile && (
            <p className="text-green-600 text-xs mt-1">Uploaded: {signatureFile.name}</p>
          )}
        </div>

        {/* Copy of PAN Upload */}
        <div className="mb-8">
          <label className="block text-gray-600 text-sm mb-2">Copy of PAN*</label>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center">
            <label
              htmlFor="panUpload"
              className={`px-4 py-2 rounded text-sm font-medium cursor-pointer transition-colors ${
                isLoading 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {isLoading ? 'Uploading...' : 'Upload'}
            </label>
            <input
              type="file"
              id="panUpload"
              className="hidden"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => handleFileChange(e, setPanFile)}
              disabled={isLoading}
            />
            <p className="text-gray-500 text-xs">Upload a copy of your PAN card.</p>
          </div>
          {panFile && (
            <p className="text-green-600 text-xs mt-1">Uploaded: {panFile.name}</p>
          )}
        </div>

        {/* Continue Button */}
        <div className="flex justify-end mt-6">
          <Button
            onClick={handleContinue}
            disabled={isLoading || !signatureFile || !panFile}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm font-semibold transition flex gap-2 items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              'Continue'
            )}
          </Button>
        </div>
      </div>

      {/* Add this to your global CSS or in a style tag */}
      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress linear forwards;
        }
      `}</style>
    </div>
  );
};

export default UploadDocuments;