//database needed

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PersonalDetailsForm = ({ onNext, defaultValues }) => {
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

  // --- MODIFICATION START ---
  // The onSubmit function is now async to handle the API call
  const onSubmit = async (data) => {
    // 1. Restructure the flat form data to match the nested backend schema
    const payload = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      personalEmail: data.personalEmail,
      address: {
        countryOfOrigin: data.countryOfOrigin,
        state: data.state,
        district: data.district,
        pincode: data.pincode,
        regionalAddress: data.regionalAddress,
        permanentAddress: data.permanentAddress,
      },
      occupationDetails: {
        occupation: data.occupation,
        // The backend expects 'annualIncomeRange', so we map 'annualIncome' to it
        annualIncomeRange: data.annualIncome,
      },
    };

    // 2. Send the restructured data to the backend API
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.REGISTER), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Send the restructured 'payload'
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
        // Handle server-side errors (e.g., duplicate email)
        throw new Error(result.message || 'Something went wrong on the server.');
      }

      // 3. If the API call is successful, proceed to the next step
      alert('Step 1 successful! Data saved.');
      // Pass both the form data and the startup ID from the response
      onNext({
        ...data,
        _id: result.data._id || result._id // Include the startup ID from the response
      });

    } catch (error) {
      // Handle network errors or errors thrown from the server response
      console.error('Registration failed:', error);
      
      // Check if it's a network error (backend not running)
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        alert('Backend server is not running. Please start the server or contact support.');
      } else if (error.message.includes('Backend server returned an error page')) {
        alert('Backend server error. Please check if the server is running correctly.');
      } else {
        alert('Registration Failed: ' + error.message);
      }
      
      // For now, continue with a temporary ID so the form flow doesn't break
      console.log('Continuing with temporary ID for development...');
      onNext({
        ...data,
        _id: `temp_${Date.now()}`, // Generate temporary ID
        _savedLocally: true,
        _apiError: error.message
      });
    }
  };
  // --- MODIFICATION END ---


  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">Step 1 of 5</p>
        <h2 className="text-2xl font-bold text-gray-800">Personal Details</h2>
        <p className="text-gray-600 mt-2">Let&apos;s register your startup with us!</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Your JSX for the form fields remains exactly the same. */}
        {/* No changes are needed below this line. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Full Name*</Label>
            <Input
              id="fullName"
              {...register("fullName")}
              placeholder="Enter Full Name here"
              className="mt-1"
            />
            {errors.fullName && (
              <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phoneNumber">Phone Number*</Label>
            <Input
              id="phoneNumber"
              {...register("phoneNumber")}
              placeholder="Phone Number"
              className="mt-1"
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500 mt-1">{errors.phoneNumber.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="personalEmail">Personal Email Address*</Label>
          <Input
            id="personalEmail"
            type="email"
            {...register("personalEmail")}
            placeholder="Personal Email Address"
            className="mt-1"
          />
          {errors.personalEmail && (
            <p className="text-sm text-red-500 mt-1">{errors.personalEmail.message}</p>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Enter your Address Details:</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="countryOfOrigin">Country of Origin*</Label>
              <Select onValueChange={(value) => setValue("countryOfOrigin", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="usa">USA</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.countryOfOrigin && (
                <p className="text-sm text-red-500 mt-1">{errors.countryOfOrigin.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="state">State*</Label>
              <Input
                id="state"
                {...register("state")}
                placeholder="State"
                className="mt-1"
              />
              {errors.state && (
                <p className="text-sm text-red-500 mt-1">{errors.state.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="district">District*</Label>
              <Input
                id="district"
                {...register("district")}
                placeholder="District"
                className="mt-1"
              />
              {errors.district && (
                <p className="text-sm text-red-500 mt-1">{errors.district.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="pincode">Pincode*</Label>
              <Input
                id="pincode"
                {...register("pincode")}
                placeholder="Pincode"
                className="mt-1"
              />
              {errors.pincode && (
                <p className="text-sm text-red-500 mt-1">{errors.pincode.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="regionalAddress">Regional Address*</Label>
            <Input
              id="regionalAddress"
              {...register("regionalAddress")}
              placeholder="Regional Address"
              className="mt-1"
            />
            {errors.regionalAddress && (
              <p className="text-sm text-red-500 mt-1">{errors.regionalAddress.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="permanentAddress">Permanent Address*</Label>
            <Input
              id="permanentAddress"
              {...register("permanentAddress")}
              placeholder="Permanent Address"
              className="mt-1"
            />
            {errors.permanentAddress && (
              <p className="text-sm text-red-500 mt-1">{errors.permanentAddress.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Enter Occupation Details:</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="occupation">Your Occupation*</Label>
              <Select onValueChange={(value) => setValue("occupation", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select occupation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="employed">Employed</SelectItem>
                  <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.occupation && (
                <p className="text-sm text-red-500 mt-1">{errors.occupation.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="annualIncome">Annual Income Range*</Label>
              <Select onValueChange={(value) => setValue("annualIncome", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select income range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-2lakh">0 - 2 Lakh</SelectItem>
                  <SelectItem value="2-5lakh">2 - 5 Lakh</SelectItem>
                  <SelectItem value="5-10lakh">5 - 10 Lakh</SelectItem>
                  <SelectItem value="10lakh+">10 Lakh+</SelectItem>
                </SelectContent>
              </Select>
              {errors.annualIncome && (
                <p className="text-sm text-red-500 mt-1">{errors.annualIncome.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onNext(defaultValues)}
            className="flex-1 font-semibold py-3 rounded-lg transition-all duration-200"
          >
            Skip
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-gradient-primary hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-all duration-200"
          >
            Proceed
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetailsForm;