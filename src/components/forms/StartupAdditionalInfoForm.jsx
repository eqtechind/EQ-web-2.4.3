//database needed

"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { 
  API_CONFIG, 
  buildApiUrl, 
  createApiRequest, 
  handleApiResponse, 
  validateFile, 
  validateAdditionalInfoFile,
  createFormData,
  getEnvironmentConfig,
  ERROR_MESSAGES 
} from "@/lib/api-config";
import { useRouter } from "next/navigation";

// Validation schema for form fields
const VALIDATION_RULES = {
  objectClause: {
    required: "Object clause is required",
    minLength: { value: 10, message: "Object clause must be at least 10 characters" }
  },
  approvedInitialCapital: {
    required: "Approved initial capital is required",
    pattern: { value: /^[0-9,]+$/, message: "Please enter a valid amount" }
  },
  stakeholders: {
    required: "At least one stakeholder is required",
    minLength: { value: 1, message: "At least one stakeholder is required" }
  }
};

const StartupAdditionalInfoForm = ({ onNext, onPrev, defaultValues }) => {
  const router =  useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [apiStatus, setApiStatus] = useState('unknown'); // 'unknown', 'available', 'unavailable'
  const [connectionRetries, setConnectionRetries] = useState(0);
  const adtFormRef = useRef(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      stakeholders: [{ name: "", designation: "" }],
      ...defaultValues,
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "stakeholders",
  });

  // Watch stakeholders for validation
  const stakeholders = watch("stakeholders");

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

  // Get environment configuration
  const envConfig = getEnvironmentConfig();

  console.log('process.env.NEXT_PUBLIC_SKIP_API:', process.env.NEXT_PUBLIC_SKIP_API);
  console.log('envConfig:', envConfig);

  // Enhanced submission logic with better error handling
  const onSubmit = async (data) => {
    console.log('Form submitted with data:', data);
    console.log('Startup ID:', defaultValues?._id);
    console.log('Uploaded files:', uploadedFiles);
    console.log('API Status:', apiStatus);
    
    setIsLoading(true);
    const startupId = defaultValues?._id;

    if (!startupId) {
      toast({ 
        title: "Error", 
        description: "Startup ID is missing. Please restart the registration process.", 
        variant: "destructive" 
      });
      setIsLoading(false);
      return;
    }

    // Validate stakeholders
    const validStakeholders = stakeholders.filter(stakeholder => 
      stakeholder.name && stakeholder.name.trim().length > 0
    );

    if (validStakeholders.length === 0) {
      toast({ 
        title: "Validation Error", 
        description: "At least one stakeholder with a valid name is required.", 
        variant: "destructive" 
      });
      setIsLoading(false);
      return;
    }

    // Environment-based API bypass (for development/testing)
    const skipAPI = envConfig.skipApi;

    // Create FormData using the helper function
    const formData = createFormData(data, uploadedFiles);
    
    console.log('skipAPI:', skipAPI, 'API_CONFIG.SKIP_API:', API_CONFIG.SKIP_API);
    
    // Validate files before submission
    for (const [key, file] of Object.entries(uploadedFiles)) {
      if (file) {
        const validation = validateAdditionalInfoFile(file, key);
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
        title: "Registration Complete!", 
        description: "Startup registration completed successfully (API bypassed for development)." 
      });
      onNext({
        ...data,
        stakeholders: validStakeholders,
        _id: startupId,
        _savedLocally: true,
        _developmentMode: true
      });
      setIsLoading(false);
      return;
    }
    
    // Try to connect to backend
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.ADDITIONAL_INFO) + `/${startupId}`, {
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
      toast({ 
        title: "Registration Complete!", 
        description: "Startup registration completed successfully." 
      });

      //check if startup redirect to this page if not 
      router.push("/v2/startup/profile")
      // redriect to this page 
      // router.push("/v2/postregister")

      
      // Pass the additional info data along with the startup ID
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
        stakeholders: validStakeholders,
        _id: startupId,
        _savedLocally: true,
        _apiError: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addStakeholder = () => {
    append({ name: "", designation: "" });
  };

  const handleFileUpload = (fileKey, file) => {
    if (file) {
      const validation = validateAdditionalInfoFile(file, fileKey);
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

  // Check if form is ready for submission
  const isFormReady = () => {
    const hasValidStakeholders = stakeholders.some(stakeholder => 
      stakeholder.name && stakeholder.name.trim().length > 0
    );
    return hasValidStakeholders && isValid;
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">Step 5 of 5</p>
        <h2 className="text-2xl font-bold text-gray-800">Startup additional info</h2>
        <p className="text-gray-600 mt-2">Final step before we start working together:</p>
        
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
        <div>
          <Label htmlFor="objectClause">Enter Object Clause: *</Label>
          <Input
            id="objectClause"
            {...register("objectClause", VALIDATION_RULES.objectClause)}
            placeholder="Enter Object Clause"
            className="mt-1"
          />
          {errors.objectClause && (
            <p className="text-sm text-red-500 mt-1">{errors.objectClause.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="approvedInitialCapital">Enter Approved Initial Capital: *</Label>
          <Input
            id="approvedInitialCapital"
            {...register("approvedInitialCapital", VALIDATION_RULES.approvedInitialCapital)}
            placeholder="Enter Approved Initial Capital (e.g., 1,00,000)"
            className="mt-1"
          />
          {errors.approvedInitialCapital && (
            <p className="text-sm text-red-500 mt-1">{errors.approvedInitialCapital.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="adtForm">Upload Form ADT-1:</Label>
          <input
            type="file"
            ref={adtFormRef}
            onChange={(e) => handleFileUpload('adtForm', e.target.files?.[0] || null)}
            accept=".pdf,.png,.jpg,.jpeg"
            className="hidden"
          />
          <Button
            type="button"
            onClick={() => adtFormRef.current?.click()}
            className="w-full bg-primary hover:bg-primary/90 text-white mb-4"
          >
            {uploadedFiles.adtForm ? '✓ Uploaded' : 'Upload Form ADT-1'}
          </Button>
          {uploadedFiles.adtForm && (
            <p className="text-sm text-green-600 mt-1">
              ✓ {uploadedFiles.adtForm.name} ({Math.round(uploadedFiles.adtForm.size / 1024)}KB)
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="font-medium text-gray-800">Enter Stakeholder Details: *</Label>
            <Button
              type="button"
              onClick={addStakeholder}
              variant="outline"
              size="sm"
              className="text-primary border-primary hover:bg-primary/10"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Member
            </Button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="space-y-3 p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Stakeholder {index + 1}
                </span>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    variant="outline"
                    size="sm"
                    className="text-red-500 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`stakeholder-name-${index}`}>Enter Stakeholder name *</Label>
                  <Input
                    id={`stakeholder-name-${index}`}
                    {...register(`stakeholders.${index}.name`, { 
                      required: "Stakeholder name is required" 
                    })}
                    placeholder="Enter Stakeholder name *"
                    className="mt-1"
                  />
                  {errors.stakeholders?.[index]?.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.stakeholders[index].name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor={`stakeholder-designation-${index}`}>Enter Stakeholder Designation</Label>
                  <Input
                    id={`stakeholder-designation-${index}`}
                    {...register(`stakeholders.${index}.designation`)}
                    placeholder="Enter Stakeholder Designation"
                    className="mt-1"
                  />
                  {errors.stakeholders?.[index]?.designation && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.stakeholders[index].designation.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {errors.stakeholders && (
            <p className="text-sm text-red-500 mt-1">At least one stakeholder is required</p>
          )}
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
                <p>Form Valid: {isValid ? 'Yes' : 'No'}</p>
                <p>Form Ready: {isFormReady() ? 'Yes' : 'No'}</p>
                <p>Files Ready: {Object.keys(uploadedFiles).filter(key => uploadedFiles[key]).length}</p>
                <p>Stakeholders: {fields.length}</p>
                <p>Valid Stakeholders: {stakeholders.filter(s => s.name && s.name.trim()).length}</p>
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
            onClick={() => {
              onNext(defaultValues);
              router.push("/v2/startup/profile");
            }}
            className="flex-1"
            disabled={isLoading}
          >
            Skip
          </Button>
          <Button
            type="submit"
            disabled={isLoading || !isFormReady()}
            className="flex-1 bg-gradient-primary hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Completing Registration...' : 'Complete Registration'}
          </Button>
        </div>
      </form>
    </div>
  );
};

StartupAdditionalInfoForm.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
};

export default StartupAdditionalInfoForm;