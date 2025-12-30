//database needed

"use client";

import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const PersonalVerificationForm = ({ onNext, onPrev, defaultValues }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({
    pan: null,
    income: null,
    'kyc-photo': null
  });
  const [selectedIncomeProofType, setSelectedIncomeProofType] = useState(defaultValues?.incomeProofType || '');
  const [webcamStream, setWebcamStream] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    return () => {
      if (webcamStream) {
        webcamStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [webcamStream]);

  const handleFileUpload = (file, type) => {
    setUploadedFiles(prev => ({
      ...prev,
      [type]: file
    }));
  };

  const startWebcam = async () => {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        toast({ 
          title: "Error", 
          description: "Webcam can only be used in browser environment", 
          variant: "destructive" 
        });
        return;
      }

      // Check if webcam is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast({ 
          title: "Webcam Not Supported", 
          description: "Your browser doesn't support webcam access", 
          variant: "destructive" 
        });
        return;
      }

      console.log('Starting webcam...');
      console.log('Media devices available:', navigator.mediaDevices);

      // Request webcam permissions with specific constraints
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user' // Use front camera
        } 
      });
      
      setWebcamStream(stream);
      setShowWebcam(true);
      
      // Wait for video to be ready
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
      }
      
      toast({ 
        title: "Webcam Started", 
        description: "Webcam is now active. Click 'Capture Photo' when ready." 
      });
      
    } catch (error) {
      console.error('Webcam error:', error);
      let errorMessage = "Could not access webcam";
      
      if (error.name === 'NotAllowedError') {
        errorMessage = "Camera permission denied. Please allow camera access and try again.";
      } else if (error.name === 'NotFoundError') {
        errorMessage = "No camera found on your device.";
      } else if (error.name === 'NotReadableError') {
        errorMessage = "Camera is already in use by another application.";
      } else if (error.name === 'OverconstrainedError') {
        errorMessage = "Camera doesn't meet the required specifications.";
      }
      
      toast({ 
        title: "Webcam Error", 
        description: errorMessage, 
        variant: "destructive" 
      });
    }
  };

  const stopWebcam = () => {
    if (webcamStream) {
      webcamStream.getTracks().forEach(track => track.stop());
      setWebcamStream(null);
      setShowWebcam(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      
      canvasRef.current.toBlob((blob) => {
        const file = new File([blob], 'kyc-photo.jpg', { type: 'image/jpeg' });
        handleFileUpload(file, 'kyc-photo');
        stopWebcam();
      }, 'image/jpeg');
    }
  };

  const onSubmit = async (data) => {
    // Validate required fields before submission
    if (!data.panNumber) {
      toast({ title: "Validation Error", description: "PAN Number is required", variant: "destructive" });
      return;
    }

    if (!selectedIncomeProofType) {
      toast({ title: "Validation Error", description: "Income Proof Type is required", variant: "destructive" });
      return;
    }

    if (!uploadedFiles.pan) {
      toast({ title: "Validation Error", description: "PAN Card upload is required", variant: "destructive" });
      return;
    }

    if (!uploadedFiles.income) {
      toast({ title: "Validation Error", description: "Income Proof upload is required", variant: "destructive" });
      return;
    }

    if (!uploadedFiles['kyc-photo']) {
      toast({ title: "Validation Error", description: "KYC Photo is required", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    const startupId = defaultValues?._id;

    if (!startupId) {
      toast({ title: "Error", description: "Startup ID is missing.", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    console.log('Submitting form with data:', {
      panNumber: data.panNumber,
      incomeProofType: selectedIncomeProofType,
      files: uploadedFiles
    });

    const formData = new FormData();
    formData.append('panNumber', data.panNumber);
    formData.append('incomeProofType', selectedIncomeProofType);
    if (uploadedFiles.pan) formData.append('pan', uploadedFiles.pan);
    if (uploadedFiles.income) formData.append('income', uploadedFiles.income);
    if (uploadedFiles['kyc-photo']) formData.append('kycPhoto', uploadedFiles['kyc-photo']);

    try {
      const response = await fetch(`http://localhost:5001/api/register/verification/${startupId}`, {
        method: 'PUT',
        body: formData,
      });
      
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'An error occurred.');
      
      toast({ title: "Step 2 Complete!", description: "Verification details saved." });
      // Pass the verification data along with the startup ID
      onNext({
        ...result.data,
        _id: startupId // Ensure the startup ID is passed to the next step
      });
      
    } catch (error) {
      console.error('Submission error:', error);
      toast({ title: "Submission Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

   
  
  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">Step 2 of 5</p>
        <h2 className="text-2xl font-bold text-gray-800">Personal Verification</h2>
        
                 {/* Progress Indicator */}
         <div className="mt-4 p-3 bg-gray-50 rounded-lg">
           <div className="flex items-center justify-between text-sm">
             <span className={`${uploadedFiles.pan ? 'text-green-600' : 'text-gray-500'}`}>
               PAN Card
             </span>
             <span className={`${uploadedFiles.income ? 'text-green-600' : 'text-gray-500'}`}>
               Income Proof
             </span>
             <span className={`${uploadedFiles['kyc-photo'] ? 'text-green-600' : 'text-gray-500'}`}>
               KYC Photo
             </span>
           </div>
         </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* PAN Number */}
                 <div>
           <Label htmlFor="panNumber">
             PAN Number *
           </Label>
          <Input
            id="panNumber"
            {...register("panNumber", { 
              required: "PAN Number is required",
              pattern: {
                value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                message: "Please enter a valid PAN number"
              }
            })}
            placeholder="ABCDE1234F"
            className={`mt-1 ${errors.panNumber ? 'border-red-500' : ''}`}
          />
          {errors.panNumber && (
            <p className="text-sm text-red-500 mt-1">{errors.panNumber.message}</p>
          )}
        </div>

        {/* Income Proof Type */}
                 <div>
           <Label htmlFor="incomeProofType">
             Income Proof Type *
           </Label>
          <Select 
            onValueChange={(value) => {
              setSelectedIncomeProofType(value);
              setValue("incomeProofType", value);
            }} 
            value={selectedIncomeProofType}
          >
            <SelectTrigger className={`mt-1 ${!selectedIncomeProofType ? 'border-red-500' : ''}`}>
              <SelectValue placeholder="Select income proof type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="salary-slip">Salary Slip</SelectItem>
              <SelectItem value="bank-statement">Bank Statement</SelectItem>
              <SelectItem value="form-16">Form 16</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {!selectedIncomeProofType && (
            <p className="text-sm text-red-500 mt-1">Please select an income proof type</p>
          )}
        </div>

        {/* PAN Card Upload */}
        <div>
          <Label>PAN Card *</Label>
          <div className="mt-1">
            <Input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) handleFileUpload(file, 'pan');
              }}
              className="mt-1"
            />
                         {uploadedFiles.pan && (
               <p className="text-sm text-green-600 mt-1">{uploadedFiles.pan.name}</p>
             )}
          </div>
        </div>

        {/* Income Proof Upload */}
        <div>
          <Label>Income Proof *</Label>
          <div className="mt-1">
            <Input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) handleFileUpload(file, 'income');
              }}
              className="mt-1"
            />
                         {uploadedFiles.income && (
               <p className="text-sm text-green-600 mt-1">{uploadedFiles.income.name}</p>
             )}
          </div>
        </div>

        {/* KYC Photo */}
        <div>
          <Label>KYC Photo *</Label>
          <div className="mt-1 space-y-3">
            {!showWebcam ? (
              <div className="space-y-3">
                <Button
                  type="button"
                  onClick={startWebcam}
                  variant="outline"
                  className="w-full"
                >
                  📷 Start Webcam
                </Button>
                
                {/* Fallback file upload option */}
                <div className="text-center">
                  <span className="text-sm text-gray-500">or</span>
                </div>
                
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) handleFileUpload(file, 'kyc-photo');
                    }}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload a photo if webcam doesn&apos;t work
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full rounded-lg border bg-gray-100"
                    style={{ minHeight: '240px' }}
                  />
                  {!videoRef.current?.readyState >= 3 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                        <p className="text-sm text-gray-600">Starting camera...</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <canvas ref={canvasRef} className="hidden" />
                
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={capturePhoto}
                    className="flex-1"
                    disabled={!videoRef.current?.readyState >= 3}
                  >
                    📸 Capture Photo
                  </Button>
                  <Button
                    type="button"
                    onClick={stopWebcam}
                    variant="outline"
                    className="flex-1"
                  >
                    ⏹️ Stop Webcam
                  </Button>
                </div>
              </div>
            )}
            
            {uploadedFiles['kyc-photo'] && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-600">
                  {uploadedFiles['kyc-photo'].name || 'KYC Photo captured'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Debug Info - Remove this in production */}
        <div className="pt-4 border-t">
          <details className="text-xs text-gray-500">
            <summary className="cursor-pointer">Debug Info</summary>
                         <div className="mt-2 p-2 bg-gray-100 rounded">
               <p>PAN Number: {uploadedFiles.pan ? 'Complete' : 'Incomplete'}</p>
               <p>Income Proof Type: {selectedIncomeProofType ? 'Complete' : 'Incomplete'}</p>
               <p>PAN Card: {uploadedFiles.pan ? 'Complete' : 'Incomplete'}</p>
               <p>Income Proof: {uploadedFiles.income ? 'Complete' : 'Incomplete'}</p>
               <p>KYC Photo: {uploadedFiles['kyc-photo'] ? 'Complete' : 'Incomplete'}</p>
             </div>
          </details>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onPrev} className="flex-1" disabled={isLoading}>
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
            className="flex-1 bg-gradient-primary hover:opacity-90 text-white" 
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Proceed'}
          </Button>
        </div>
      </form>
    </div>
  );
};

PersonalVerificationForm.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
};

export default PersonalVerificationForm;