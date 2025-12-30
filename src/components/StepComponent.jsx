import React from "react";

const StepComponent = ({ step, totalStep, description }) => {
  return (
    <div>
      <div>
        Step {step} to {totalStep}
      </div>
      <h1 className="py-[2vh]">{description}</h1>
    </div>
  );
};

export default StepComponent;
