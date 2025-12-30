"use client";
import StepComponent from "@/components/StepComponent";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

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
const router = useRouter();
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form validation
  const handleSubmit = () => {
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
    toast.success("Form submitted successfully!");
    router.push("/process-startup/bankdetails-startup")
  };

  return (
    <div className="w-full h-[auto] md:h-[100vh] py-[4vh] md:py-[10vh] px-[2vh] md:px-[10vh]">
      <div className="w-[100%] h-[95%] mx-auto">
        <StepComponent
          step={3}
          totalStep={7}
          description={"Personal Information"}
        />
        <div className="block md:grid  md:grid-cols-2 py-[10vh] px-[5vh] md:px-[15vh] gap-8 w-[100%] login-shadow border-[1px] h-full rounded-lg">
          <input
            type="text"
            name="fatherFirstName"
            value={formData.fatherFirstName}
            onChange={handleChange}
            className="w-full outline-none border-b-2 border-gray-600 h-[7vh]"
            placeholder="Father's first name"
          />
          <input
            type="text"
            name="fatherLastName"
            value={formData.fatherLastName}
            onChange={handleChange}
            className="w-full outline-none border-b-2 border-gray-600 h-[7vh]"
            placeholder="Father's last name"
          />
          <input
            type="text"
            name="motherFirstName"
            value={formData.motherFirstName}
            onChange={handleChange}
            className="w-full outline-none border-b-2 border-gray-600 h-[7vh]"
            placeholder="Mother's first name"
          />
          <input
            type="text"
            name="motherLastName"
            value={formData.motherLastName}
            onChange={handleChange}
            className="w-full outline-none border-b-2 border-gray-600 h-[7vh]"
            placeholder="Father's last name"
          />
          <input
            type="text"
            name="annualIncome"
            value={formData.annualIncome}
            onChange={handleChange}
            className="w-full outline-none border-b-2 border-gray-600 h-[7vh]"
            placeholder="Annual income"
          />
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="w-full outline-none border-b-2 border-gray-600 h-[7vh]"
            placeholder="Occupation"
          />

          {/* Investment Experience Select */}
          <select
            name="investmentExperience"
            value={formData.investmentExperience}
            onChange={handleChange}
            className={`${
              formData.investmentExperience == ""
                ? "text-slate-400"
                : " text-black"
            }  w-full outline-none border-b-2 border-gray-600 h-[7vh] bg-transparent`}
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
            className={`${
              formData.belongsToVC == "" ? "text-slate-400" : " text-black"
            }  w-full outline-none border-b-2 border-gray-600 h-[7vh] bg-transparent`}
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
          <button
            onClick={handleSubmit}
            className="w-full md:col-span-2 font-semibold mt-[5vh] rounded-lg bg-blue-600 py-2 text-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
