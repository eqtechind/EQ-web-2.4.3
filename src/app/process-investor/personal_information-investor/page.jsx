"use client";
import StepComponent from "@/components/StepComponent";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const Page = () => {
  const [formData, setFormData] = useState({
    fatherFirstName: "",
    fatherLastName: "",
    motherFirstName: "",
    motherLastName: "",
    annualIncome: "",
    occupation: "",
    investmentExperience: "",
    belongsToVC: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState('unknown');
  const [connectionRetries, setConnectionRetries] = useState(0);

  const router = useRouter();

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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Enhanced form submission with backend integration
  const handleSubmit = async () => {
    const {
      fatherFirstName,
      fatherLastName,
      motherFirstName,
      motherLastName,
      annualIncome,
      occupation,
      investmentExperience,
      belongsToVC,
    } = formData;

    if (
      !fatherFirstName ||
      !fatherLastName ||
      !motherFirstName ||
      !motherLastName ||
      !annualIncome ||
      !occupation ||
      !investmentExperience ||
      !belongsToVC
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    // Prepare data for backend
    const submissionData = {
      personalInformation: {
        fatherFirstName: fatherFirstName.trim(),
        fatherLastName: fatherLastName.trim(),
        motherFirstName: motherFirstName.trim(),
        motherLastName: motherLastName.trim(),
        annualIncome: annualIncome.trim(),
        occupation: occupation.trim(),
        investmentExperience,
        belongsToVC
      },
      step: 'personal_information',
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('http://localhost:5001/api/investor/personal-information', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
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
      toast.success("Personal information saved successfully!");
      
      // Store the personal information data in localStorage for the next steps
      localStorage.setItem('investorPersonalInfoData', JSON.stringify({
        ...submissionData,
        _id: result.data?._id || result._id,
        _verified: true
      }));

      // Navigate to next step
      router.push("/process-investor/bankdetails-investor");

    } catch (error) {
      console.error('Personal information submission failed:', error);
      
      // Check if it's a network error (backend not running)
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        toast.error("Backend server is not running. Please start the server or contact support.");
      } else if (error.message.includes('Backend server returned an error page')) {
        toast.error("Backend server error. Please check if the server is running correctly.");
      } else {
        toast.error("Personal information submission failed: " + error.message);
      }
      
      setApiStatus('unavailable');
      
      // For development, continue with local storage even if API fails
      console.log('Continuing with local storage for development...');
      localStorage.setItem('investorPersonalInfoData', JSON.stringify({
        ...submissionData,
        _id: `temp_${Date.now()}`,
        _savedLocally: true,
        _apiError: error.message
      }));
      
      // Still navigate to next step for development
      router.push("/process-investor/bankdetails-investor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-[auto] md:h-[100vh] py-[4vh] md:py-[10vh] px-[2vh] md:px-[10vh]">
      <div className="w-[100%] h-[95%] mx-auto">
        <StepComponent
          step={3}
          totalStep={7}
          description={"Personal Information"}
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

        <div className="block md:grid  md:grid-cols-2 py-[10vh] px-[5vh] md:px-[15vh] gap-8 w-[100%] login-shadow border-[1px] h-full rounded-lg">
          <input
            type="text"
            name="fatherFirstName"
            value={formData.fatherFirstName}
            onChange={handleChange}
            className="w-full outline-none border-b-2 border-gray-600 h-[7vh] focus:border-blue-500 transition-colors"
            placeholder="Father's first name"
            disabled={isLoading}
          />
          <input
            type="text"
            name="fatherLastName"
            value={formData.fatherLastName}
            onChange={handleChange}
            className="w-full outline-none border-b-2 border-gray-600 h-[7vh] focus:border-blue-500 transition-colors"
            placeholder="Father's last name"
            disabled={isLoading}
          />
          <input
            type="text"
            name="motherFirstName"
            value={formData.motherFirstName}
            onChange={handleChange}
            className="w-full outline-none border-b-2 border-gray-600 h-[7vh] focus:border-blue-500 transition-colors"
            placeholder="Mother's first name"
            disabled={isLoading}
          />
          <input
            type="text"
            name="motherLastName"
            value={formData.motherLastName}
            onChange={handleChange}
            className="w-full outline-none border-b-2 border-gray-600 h-[7vh] focus:border-blue-500 transition-colors"
            placeholder="Mother's last name"
            disabled={isLoading}
          />
          <input
            type="text"
            name="annualIncome"
            value={formData.annualIncome}
            onChange={handleChange}
            className="w-full outline-none border-b-2 border-gray-600 h-[7vh] focus:border-blue-500 transition-colors"
            placeholder="Annual income"
            disabled={isLoading}
          />
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="w-full outline-none border-b-2 border-gray-600 h-[7vh] focus:border-blue-500 transition-colors"
            placeholder="Occupation"
            disabled={isLoading}
          />

          {/* Investment Experience Select */}
          <select
            name="investmentExperience"
            value={formData.investmentExperience}
            onChange={handleChange}
            disabled={isLoading}
            className={`${
              formData.investmentExperience == ""
                ? "text-slate-400"
                : " text-black"
            }  w-full outline-none border-b-2 border-gray-600 h-[7vh] bg-transparent focus:border-blue-500 transition-colors`}
          >
            <option value="" disabled className="text-slate-400">
              Investment Experience
            </option>
            <option className="text-black" value="<1 year">
              {"<1 year"}
            </option>
            <option className="text-black" value="1-2 years">
              1-2 years
            </option>
            <option className="text-black" value="2-3 years">
              2-3 years
            </option>
            <option className="text-black" value="3-4 years">
              3-4 years
            </option>
            <option className="text-black" value="4-5 years">
              4-5 years
            </option>
            <option className="text-black" value="5-10 years">
              5-10 years
            </option>
            <option className="text-black" value="10+ years">
              10+ years
            </option>
          </select>

          {/* Belongs to VC Select */}
          <select
            name="belongsToVC"
            value={formData.belongsToVC}
            onChange={handleChange}
            disabled={isLoading}
            className={`${
              formData.belongsToVC == "" ? "text-slate-400" : " text-black"
            }  w-full outline-none border-b-2 border-gray-600 h-[7vh] bg-transparent focus:border-blue-500 transition-colors`}
          >
            <option value="" disabled className="text-slate-400">
              Do you belong to a VC?
            </option>
            <option className="text-black" value="Yes">
              Yes
            </option>
            <option className="text-black" value="No">
              No
            </option>
          </select>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !formData.fatherFirstName || !formData.fatherLastName || !formData.motherFirstName || !formData.motherLastName || !formData.annualIncome || !formData.occupation || !formData.investmentExperience || !formData.belongsToVC}
            className="w-full md:col-span-2 font-semibold mt-[5vh] rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700 flex gap-2 items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Next'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
