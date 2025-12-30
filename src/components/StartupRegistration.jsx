"use client"
import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";
import ProgressSteps from "./ProgressSteps";
import PersonalDetailsForm from "./forms/PersonalDetailsForm";
import PersonalVerificationForm from "./forms/PersonalVerificationForm";
import StartupDetailsForm from "./forms/StartupDetailsForm";
import StartupDocumentsForm from "./forms/StartupDocumentsForm";
import StartupAdditionalInfoForm from "./forms/StartupAdditionalInfoForm";

const steps = [
  { id: "personal-details", title: "Personal details" },
  { id: "personal-verification", title: "Personal verification" },
  { id: "startup-details", title: "Startup details" },
  { id: "startup-documents", title: "Startup documents" },
  { id: "startup-additional-info", title: "Startup additional info" },
];

const StartupRegistration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [completedSteps, setCompletedSteps] = useState([]);

  const ProgressSteps = steps.map((step, index) => ({
    ...step,
    completed: completedSteps.includes(index),
    active: currentStep === index,
  }));

  const handleNext = (stepData) => {
    const stepKey = steps[currentStep].id.replace("-", "");
    
    // If this is the first step and we have a startup ID, store it globally
    if (currentStep === 0 && stepData._id) {
      setFormData(prev => ({
        ...prev,
        startupId: stepData._id, // Store startup ID globally
        [stepKey]: stepData,
      }));
    } else {
      const updatedFormData = {
        ...formData,
        [stepKey]: stepData,
      };
      setFormData(updatedFormData);
    }
    
    // Mark current step as completed
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      toast({
        title: "Progress Saved",
        description: `${steps[currentStep].title} completed successfully.`,
      });
    } else {
      // Final step - complete registration
      toast({
        title: "Registration Complete!",
        description: "Your startup registration has been submitted successfully.",
      });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev=>prev - 1);
    }
  };

  const getCurrentStepData = () => {
    const stepKey = steps[currentStep].id.replace("-", "");
    const stepData = formData[stepKey] || {};
    
    // Include the startup ID in all steps after the first step
    if (currentStep > 0 && formData.startupId) {
      return {
        ...stepData,
        _id: formData.startupId
      };
    }
    
    return stepData;
  };

  const renderCurrentStep = () => {
    const defaultValues = getCurrentStepData();

    switch (currentStep) {
      case 0:
        return (
          <PersonalDetailsForm
            onNext={handleNext}
            defaultValues={defaultValues}
          />
        );
      case 1:
        return (
          <PersonalVerificationForm
            onNext={handleNext}
            onPrev={handlePrev}
            defaultValues={defaultValues}
          />
        );
      case 2:
        return (
          <StartupDetailsForm
            onNext={handleNext}
            onPrev={handlePrev}
            defaultValues={defaultValues}
          />
        );
      case 3:
        return (
          <StartupDocumentsForm
            onNext={handleNext}
            onPrev={handlePrev}
            defaultValues={defaultValues}
          />
        );
      case 4:
        return (
          <StartupAdditionalInfoForm
            onNext={handleNext}
            onPrev={handlePrev}
            defaultValues={defaultValues}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-48 translate-y-48" />
        <div className="absolute top-1/2 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-16" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:w-80 lg:fixed lg:right-20 lg:top-1/2  lg:-translate-y-1/2">
          <ProgressSteps steps={progressSteps} />
        </div>

        {/* Mobile Progress */}
        <div className="lg:hidden p-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center justify-between text-white">
              <span className="text-sm font-medium">Step {currentStep + 1} of {steps.length}</span>
              <span className="text-sm">{steps[currentStep].title}</span>
            </div>
            <div className="mt-2 bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:mr-96 p-4 lg:p-8 flex items-center justify-center">
          <div className="w-full max-w-4xl">
            {renderCurrentStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupRegistration;