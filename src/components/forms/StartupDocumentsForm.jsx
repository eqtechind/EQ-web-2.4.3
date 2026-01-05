//database needed

"use client";

import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, AlertCircle } from "lucide-react";
import { 
  API_CONFIG, 
  buildApiUrl, 
  createApiRequest, 
  handleApiResponse, 
  getEnvironmentConfig,
  ERROR_MESSAGES 
} from "@/lib/api-config";

const StartupDocumentsForm = ({ onNext, onPrev, defaultValues }) => {
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [apiStatus, setApiStatus] = useState('unknown');
  const [connectionRetries, setConnectionRetries] = useState(0);
  const fileRefs = useRef({});

  // Get environment configuration
  const envConfig = getEnvironmentConfig();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  // Check API availability on component mount
  useEffect(() => {
    checkApiAvailability();
  }, []);

  // Check if API is available
  const checkApiAvailability = async () => {
    try {
      const healthUrl = buildApiUrl(API_CONFIG.ENDPOINTS.HEALTH);
      const response = await createApiRequest(healthUrl, { method: 'GET' });
      
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

  // Enhanced submission logic with better error handling
  const onSubmit = async (data) => {
    console.log('Form submitted with data:', data);
    console.log('Startup ID:', defaultValues?._id);
    console.log('Uploaded files:', uploadedFiles);
    
    setIsLoading(true);
    const startupId = defaultValues?._id;

    if (!startupId) {
      toast({ title: "Error", description: "Startup ID is missing.", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    // Environment-based API bypass (for development/testing)
    const skipAPI = envConfig.skipApi;

    const formData = new FormData();
    
    // Append all text data
    Object.keys(data).forEach(key => {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    });

    // Append all file data
    Object.keys(uploadedFiles).forEach(key => {
      if (uploadedFiles[key]) {
        formData.append(key, uploadedFiles[key]);
      }
    });
    
    // Skip API call for development/testing
    if (skipAPI) {
      toast({ 
        title: "Step 4 Complete!", 
        description: "Startup documents saved locally (API bypassed for development)." 
      });
      onNext({
        ...data,
        _id: startupId,
        _savedLocally: true,
        _developmentMode: true
      });
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.DOCUMENTS) + `/${startupId}`, {
        method: 'PUT',
        body: formData,
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
      toast({ title: "Step 4 Complete!", description: "Startup documents saved." });
      
      // Pass the documents data along with the startup ID
      onNext({
        ...result.data,
        _id: startupId // Ensure the startup ID is passed to the next step
      });
      
    } catch (error) {
      console.error('API Error:', error);
      
      // Check if it's a network error (backend not running)
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        toast({ 
          title: "Network Error", 
          description: "Backend server is not running. Please start the server or contact support.", 
          variant: "destructive" 
        });
      } else if (error.message.includes('Backend server returned an error page')) {
        toast({ 
          title: "Server Error", 
          description: "Backend server error. Please check if the server is running correctly.", 
          variant: "destructive" 
        });
      } else {
        toast({ 
          title: "Submission Failed", 
          description: error.message, 
          variant: "destructive" 
        });
      }
      
      setApiStatus('unavailable');
      
      // For now, continue with a temporary ID so the form flow doesn't break
      console.log('Continuing with temporary ID for development...');
      onNext({
        ...data,
        _id: startupId,
        _savedLocally: true,
        _apiError: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (fileKey, file) => {
    if (file) {
      setUploadedFiles(prev => ({ ...prev, [fileKey]: file }));
      toast({ title: "File Ready", description: `${file.name} is ready for upload.` });
    }
  };

  const documentSections = [
    {
      title: "Upload Certificate of Incorporation:",
      inputPlaceholder: "Enter Certificate Identification Number (CIN)*",
      buttonText: "Upload COI*",
      fileKey: "coi"
    },
    {
      title: "Upload Memorandum of Association:",
      buttonText: "Upload MOA*",
      fileKey: "moa"
    },
    {
      title: "Upload Articles of Association:",
      buttonText: "Upload AOA*",
      fileKey: "aoa"
    },
    {
      title: "Upload Company PAN:",
      buttonText: "Upload Company PAN*",
      fileKey: "companyPan"
    },
    {
      title: "Upload Department for Promotion of Industry and Internal Trade Certificate:",
      buttonText: "Upload DPIIT*",
      fileKey: "dpiit"
    },
    {
      title: "Upload GST (if any):",
      buttonText: "Upload GST/No or Similiar*",
      fileKey: "gst"
    },
    {
      title: "Upload Startup Bank Statement:",
      buttonText: "Upload Startup Bank Statement*",
      fileKey: "bankStatement"
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">Step 4 of 5</p>
        <h2 className="text-2xl font-bold text-gray-800">Startup documents</h2>
        <p className="text-gray-600 mt-2">Upload all the required documents:</p>
        
        {/* API Status Indicator */}
        <div className="mt-4 flex items-center gap-2">
          {apiStatus === 'available' ? (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Backend connected</span>
            </div>
          ) : apiStatus === 'unavailable' ? (
            <div className="flex items-center gap-2 text-orange-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Backend unavailable - will save locally</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={retryApiConnection}
                disabled={connectionRetries >= 3}
                className="ml-2"
              >
                Retry
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              <span className="text-sm">Checking connection...</span>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <p className="text-sm text-gray-600 mb-4">
          Kindly upload all files in .png, .jpg, .jpeg or .pdf format and under 10 MB size.
        </p>

        <div className="space-y-6">
          {documentSections.map((section, index) => (
            <div key={index} className="space-y-3">
              <Label className="font-medium text-gray-800">{section.title}</Label>
              
              {section.inputPlaceholder && (
                <div className="flex gap-2">
                  <Input
                    {...register("corporateIdentificationNumber")}
                    placeholder={section.inputPlaceholder}
                    className="flex-1"
                  />
                  <input
                    type="file"
                    ref={(el) => (fileRefs.current[section.fileKey] = el)}
                    onChange={(e) => handleFileUpload(section.fileKey, e.target.files?.[0] || null)}
                    accept="image/*,.pdf"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    onClick={() => fileRefs.current[section.fileKey]?.click()}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    {uploadedFiles[section.fileKey] ? '✓ Uploaded' : section.buttonText}
                  </Button>
                </div>
              )}
              
              {!section.inputPlaceholder && (
                <>
                  <input
                    type="file"
                    ref={(el) => (fileRefs.current[section.fileKey] = el)}
                    onChange={(e) => handleFileUpload(section.fileKey, e.target.files?.[0] || null)}
                    accept="image/*,.pdf"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    onClick={() => fileRefs.current[section.fileKey]?.click()}
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                  >
                    {uploadedFiles[section.fileKey] ? '✓ Uploaded' : section.buttonText}
                  </Button>
                </>
              )}
            </div>
          ))}
        </div>

        {errors.corporateIdentificationNumber && (
          <p className="text-sm text-red-500 mt-1">{errors.corporateIdentificationNumber.message}</p>
        )}

        {/* Debug Info - Remove in production */}
        {envConfig.enableDebug && (
          <div className="pt-4 border-t">
            <details className="text-xs text-gray-500">
              <summary className="cursor-pointer">Debug Info</summary>
              <div className="mt-2 p-2 bg-gray-100 rounded">
                <p>Startup ID: {defaultValues?._id || 'Not available'}</p>
                <p>API Status: {apiStatus}</p>
                <p>Connection Retries: {connectionRetries}</p>
                <p>Form Data: {JSON.stringify(Object.keys(defaultValues || {}))}</p>
                <p>Files Ready: {Object.keys(uploadedFiles).filter(key => uploadedFiles[key]).length}</p>
              </div>
            </details>
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onPrev}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => onNext(defaultValues)}
            className="flex-1"
            disabled={isLoading}
          >
            Skip
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-gradient-primary hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-all duration-200"
          >
            {isLoading ? 'Submitting...' : 'Proceed'}
          </Button>
        </div>
      </form>
    </div>
  );
};

StartupDocumentsForm.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
};

export default StartupDocumentsForm;