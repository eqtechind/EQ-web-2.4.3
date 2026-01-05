//database needed

"use client";

import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, AlertCircle } from "lucide-react";
import { 
  API_CONFIG, 
  buildApiUrl, 
  createApiRequest, 
  handleApiResponse, 
  validateFile, 
  validateStartupDetailsFile,
  createFormData,
  getEnvironmentConfig,
  ERROR_MESSAGES 
} from "@/lib/api-config";

const StartupDetailsForm = ({ onNext, onPrev, defaultValues }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [apiStatus, setApiStatus] = useState('unknown');
  const [connectionRetries, setConnectionRetries] = useState(0);
  const boardResolutionRef = useRef(null);
  const pitchVideoRef = useRef(null);
  const pitchDeckRef = useRef(null);

  // Get environment configuration
  const envConfig = getEnvironmentConfig();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  // Watch the domain value to ensure it's properly tracked
  const domainValue = watch("domain");

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

    // Validate required fields
    if (!data.startupName || !data.address || !domainValue) {
      toast({ title: "Validation Error", description: "Please fill in all required fields including domain selection.", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    // Environment-based API bypass (for development/testing)
    const skipAPI = envConfig.skipApi;

    // Create FormData using the helper function
    const formData = createFormData(data, uploadedFiles);
    
    // Validate files before submission
    for (const [key, file] of Object.entries(uploadedFiles)) {
      if (file) {
        const validation = validateStartupDetailsFile(file, key);
        if (!validation.isValid) {
          toast({ 
            title: "File Validation Error", 
            description: validation.error, 
            variant: "destructive" 
          });
          setIsLoading(false);
          return;
        }
      }
    }
    
    // Skip API call for development/testing
    if (skipAPI) {
      toast({ 
        title: "Step 3 Complete!", 
        description: "Startup details saved locally (API bypassed for development)." 
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
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.STARTUP_DETAILS) + `/${startupId}`, {
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
      toast({ title: "Step 3 Complete!", description: "Startup details saved." });
      
      // Pass the startup details data along with the startup ID
      onNext({
        ...result.data,
        _id: startupId,
        _savedToBackend: true
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
    console.log('handleFileUpload called with:', { fileKey, file });
    if (file) {
      console.log('File details:', {
        name: file.name,
        size: file.size,
        type: file.type
      });
      
      const validation = validateStartupDetailsFile(file, fileKey);
      console.log('Validation result:', validation);
      
      if (validation.isValid) {
        setUploadedFiles(prev => ({ ...prev, [fileKey]: file }));
        toast({ 
          title: "File Ready", 
          description: `${file.name} is ready for upload.` 
        });
      } else {
        toast({ 
          title: "File Error", 
          description: validation.error, 
          variant: "destructive" 
        });
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">Step 3 of 5</p>
        <h2 className="text-2xl font-bold text-gray-800">Startup details</h2>
        <p className="text-gray-600 mt-2">Tell us more about your startup:</p>
        
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startupName">Enter Startup Name*</Label>
            <Input
              id="startupName"
              {...register("startupName", { 
                required: "Startup name is required" 
              })}
              placeholder="Startup Name"
              className="mt-1"
            />
            {errors.startupName && (
              <p className="text-sm text-red-500 mt-1">{errors.startupName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="domain">Select your domain*</Label>
            <Select 
              onValueChange={(value) => {
                console.log('Domain selected:', value);
                setValue("domain", value, { shouldValidate: true });
              }} 
              value={domainValue || defaultValues?.domain || ""}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select domain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="fintech">Fintech</SelectItem>
                <SelectItem value="ecommerce">E-commerce</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.domain && (
              <p className="text-sm text-red-500 mt-1">{errors.domain.message}</p>
            )}
            {!domainValue && (
              <p className="text-sm text-red-500 mt-1">Please select a domain</p>
            )}
          </div>
        </div>


        <div>
          <Label htmlFor="address">Enter Address*</Label>
                      <Input
              id="address"
              {...register("address", { 
                required: "Address is required" 
              })}
              placeholder="Address"
              className="mt-1"
            />
          {errors.address && (
            <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="problemStatement">Problem Statement*</Label>
          <Textarea
            id="problemStatement"
            {...register("problemStatement")}
            placeholder="Describe the problem your startup solves"
            className="mt-1"
            rows={3}
          />
          {errors.problemStatement && (
            <p className="text-sm text-red-500 mt-1">{errors.problemStatement.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="targetCustomers">What are your Target Customers?*</Label>
          <Input
            id="targetCustomers"
            {...register("targetCustomers")}
            placeholder="Target Customers"
            className="mt-1"
          />
          {errors.targetCustomers && (
            <p className="text-sm text-red-500 mt-1">{errors.targetCustomers.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="existingCompetitors">What are your Existing Competitors?*</Label>
          <Textarea
            id="existingCompetitors"
            {...register("existingCompetitors")}
            placeholder="List your existing competitors"
            className="mt-1"
            rows={2}
          />
          {errors.existingCompetitors && (
            <p className="text-sm text-red-500 mt-1">{errors.existingCompetitors.message}</p>
          )}
        </div>


        <div>
          <Label htmlFor="revenueModel">What is your Revenue Model?*</Label>
          <Input
            id="revenueModel"
            {...register("revenueModel")}
            placeholder="Revenue Model"
            className="mt-1"
          />
          {errors.revenueModel && (
            <p className="text-sm text-red-500 mt-1">{errors.revenueModel.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="uniqueSellingProposition">What is your Unique Selling Proposition (USP)?*</Label>
          <Textarea
            id="uniqueSellingProposition"
            {...register("uniqueSellingProposition")}
            placeholder="Unique Selling Proposition"
            className="mt-1"
            rows={3}
          />
          {errors.uniqueSellingProposition && (
            <p className="text-sm text-red-500 mt-1">{errors.uniqueSellingProposition.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="intellectualProperty">What is your Intellectual Property?*</Label>
          <Input
            id="intellectualProperty"
            {...register("intellectualProperty")}
            placeholder="Intellectual Property"
            className="mt-1"
          />
          {errors.intellectualProperty && (
            <p className="text-sm text-red-500 mt-1">{errors.intellectualProperty.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="website">Enter your Website:</Label>
          <Input
            id="website"
            {...register("website")}
            placeholder="https://yourwebsite.com"
            className="mt-1"
          />
          {errors.website && (
            <p className="text-sm text-red-500 mt-1">{errors.website.message}</p>
          )}
        </div>


        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="file"
              ref={boardResolutionRef}
              onChange={(e) => handleFileUpload('boardResolution', e.target.files?.[0] || null)}
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
            />
            <Button
              type="button"
              onClick={() => boardResolutionRef.current?.click()}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {uploadedFiles.boardResolution ? '✓ Uploaded' : 'Upload Board Resolution*'}
            </Button>
          </div>
          {uploadedFiles.boardResolution && (
            <p className="text-sm text-green-600">
              ✓ {uploadedFiles.boardResolution.name} ({Math.round(uploadedFiles.boardResolution.size / 1024)}KB)
            </p>
          )}
          <p className="text-xs text-gray-500">
            Kindly upload Board Resolution in .pdf, .png, .jpg, .jpeg and file size to be under 10 MB.
          </p>
          
          <div className="flex gap-2">
            <input
              type="file"
              ref={pitchVideoRef}
              onChange={(e) => handleFileUpload('pitchVideo', e.target.files?.[0] || null)}
              accept="video/*"
              className="hidden"
            />
            <Button
              type="button"
              onClick={() => pitchVideoRef.current?.click()}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {uploadedFiles.pitchVideo ? '✓ Uploaded' : 'Upload Pitch Video*'}
            </Button>
            <input
              type="file"
              ref={pitchDeckRef}
              onChange={(e) => handleFileUpload('pitchDeck', e.target.files?.[0] || null)}
              accept=".pdf,.ppt,.pptx"
              className="hidden"
            />
            <Button
              type="button"
              onClick={() => pitchDeckRef.current?.click()}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {uploadedFiles.pitchDeck ? '✓ Uploaded' : 'Upload Pitch Deck*'}
            </Button>
          </div>
          <div className="flex gap-4">
            {uploadedFiles.pitchVideo && (
              <p className="text-sm text-green-600">
                ✓ {uploadedFiles.pitchVideo.name} ({Math.round(uploadedFiles.pitchVideo.size / 1024)}KB)
              </p>
            )}
            {uploadedFiles.pitchDeck && (
              <p className="text-sm text-green-600">
                ✓ {uploadedFiles.pitchDeck.name} ({Math.round(uploadedFiles.pitchDeck.size / 1024)}KB)
              </p>
            )}
          </div>
          <p className="text-xs text-gray-500">
            Kindly upload Video File and Pitch Deck File under the size of 10 MB.
          </p>
        </div>
        
        {/* Debug Info - Remove in production */}
        {envConfig.enableDebug && (
          <div className="pt-4 border-t">
            <details className="text-xs text-gray-500">
              <summary className="cursor-pointer">Debug Info</summary>
              <div className="mt-2 p-2 bg-gray-100 rounded">
                <p>Startup ID: {defaultValues?._id || 'Not available'}</p>
                <p>API Status: {apiStatus}</p>
                <p>Connection Retries: {connectionRetries}</p>
                <p>Files Ready: {Object.keys(uploadedFiles).filter(key => uploadedFiles[key]).length}</p>
                <p>Domain Selected: {domainValue || 'None'}</p>
              </div>
            </details>
          </div>
        )}
        
        <div className="flex gap-4">
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

StartupDetailsForm.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
};

export default StartupDetailsForm;