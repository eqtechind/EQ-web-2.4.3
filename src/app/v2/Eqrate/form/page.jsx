"use client";

import { useForm } from "react-hook-form";
import "../Eqrate.css"


export default function RatingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12">
   <header>
          <div className="header-box">
            <div className="logo-title">
              <span className="logo-text">EQvisor</span>
            </div>
            <nav className="about-nav">
              <a href="/v2/startup/dashboard" className="nav-link">Go To Home Page</a>
              <a href="/v2/contact" className="nav-link">Contact Us</a>
              <a href="#" className="nav-link">LogOut</a>
            </nav>
            <div className="header_line eqv-rule--header" aria-hidden="true" />
            <div className="logo-title">
              <span className="logo-text">EQRate</span>
            </div>
          </div>
        </header>      {/* Header */}
      <div className="bg-yellow-200 text-4xl my-8  w-[80%] p-4 rounded-lg mx-auto text-center font-semibold">
        Let&apos;s begin with the rating process! We will need some more data in
        order to rate your startup.
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[155vh] mx-auto space-y-8"
      >
        {/* Revenue + Debt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Revenue (if any):</label>
            <input
              type="number"
              {...register("revenue")}
              className="w-full border rounded-lg p-2"
              placeholder="Enter Revenue"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Debt (if any):</label>
            <input
              type="number"
              {...register("debt")}
              className="w-full border rounded-lg p-2"
              placeholder="Enter Debt"
            />
          </div>
        </div>

        {/* Promoter Holding + Net Profit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Promoter Holding<span className="text-red-500">*</span>:
            </label>
            <input
              type="number"
              {...register("promoterHolding", { required: true })}
              className="w-full border rounded-lg p-2"
              placeholder="Enter Promoter Holding"
            />
            {errors.promoterHolding && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">
              Net Profit<span className="text-red-500">*</span>:
            </label>
            <input
              type="number"
              {...register("netProfit", { required: true })}
              className="w-full border rounded-lg p-2"
              placeholder="Enter Net Profit"
            />
            {errors.netProfit && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>
        </div>

        {/* Net Cashflow */}
        <div>
          <label className="block font-medium mb-1">
            Net Cashflow<span className="text-red-500">*</span>:
          </label>
          <input
            type="number"
            {...register("netCashflow", { required: true })}
            className="w-full border rounded-lg p-2"
            placeholder="Enter Net Cashflow"
          />
          {errors.netCashflow && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>

        {/* Market Size */}
        <div>
          <h3 className="font-semibold border-b-[6px] border-[#FFF78A] mb-4">
            Market Size
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">
                Total Addressable Market<span className="text-red-500">*</span>:
              </label>
              <input
                type="number"
                {...register("tam", { required: true })}
                className="w-full border rounded-lg p-2"
                placeholder="Enter TAM"
              />
              {errors.tam && (
                <p className="text-red-500 text-sm">This field is required</p>
              )}
            </div>
            <div>
              <label className="block font-medium mb-1">
                Servicable Available Market
                <span className="text-red-500">*</span>:
              </label>
              <input
                type="number"
                {...register("sam", { required: true })}
                className="w-full border rounded-lg p-2"
                placeholder="Enter SAM"
              />
              {errors.sam && (
                <p className="text-red-500 text-sm">This field is required</p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <label className="block font-medium mb-1">
              Servicable Obtained Market
              <span className="text-red-500">*</span>:
            </label>
            <input
              type="number"
              {...register("som", { required: true })}
              className="w-full border rounded-lg p-2"
              placeholder="Enter SOM"
            />
            {errors.som && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>
        </div>

        {/* Unit Economics */}
        <div>
          <h3 className="font-semibold border-b-[6px] border-[#FFF78A] mb-4">
            Unit Economics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-1">
                Customer Acquisition Cost
                <span className="text-red-500">*</span>:
              </label>
              <input
                type="number"
                {...register("cac", { required: true })}
                className="w-full border rounded-lg p-2"
                placeholder="Enter CAC"
              />
              {errors.cac && (
                <p className="text-red-500 text-sm">This field is required</p>
              )}
            </div>
            <div>
              <label className="block font-medium mb-1">
                Lifetime Value of Customer
                <span className="text-red-500">*</span>:
              </label>
              <input
                type="number"
                {...register("ltv", { required: true })}
                className="w-full border rounded-lg p-2"
                placeholder="Enter LTV"
              />
              {errors.ltv && (
                <p className="text-red-500 text-sm">This field is required</p>
              )}
            </div>
          </div>
        </div>

        {/* Revenue Growth Rate */}
        <div>
          <h3 className="font-semibold border-b-[6px] border-[#FFF78A] mb-4">
            Revenue Growth Rate
          </h3>
          <div>
            <label className="block font-medium mb-1">
              Month on Month (MoM)%<span className="text-red-500">*</span>:
            </label>
            <input
              type="number"
              {...register("mom", { required: true })}
              className="w-full border rounded-lg p-2"
              placeholder="Enter MoM in %"
            />
            {errors.mom && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>
        </div>

        {/* Other Financials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">
              Total Operating Expenses<span className="text-red-500">*</span>:
            </label>
            <input
              type="number"
              {...register("toe", { required: true })}
              className="w-full border rounded-lg p-2"
              placeholder="Enter TOE"
            />
            {errors.toe && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">
              Active User Growth<span className="text-red-500">*</span>:
            </label>
            <input
              type="number"
              {...register("aug", { required: true })}
              className="w-full border rounded-lg p-2"
              placeholder="Enter AUG"
            />
            {errors.aug && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">
              Gross Margin<span className="text-red-500">*</span>:
            </label>
            <input
              type="number"
              {...register("grossMargin", { required: true })}
              className="w-full border rounded-lg p-2"
              placeholder="Enter Gross Margin"
            />
            {errors.grossMargin && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1">
              Profit After Taxes<span className="text-red-500">*</span>:
            </label>
            <input
              type="number"
              {...register("pat", { required: true })}
              className="w-full border rounded-lg p-2"
              placeholder="Enter PAT"
            />
            {errors.pat && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>
        </div>

        {/* Total Funds Raised */}
        <div>
          <label className="block font-medium mb-1">
            Total Funds Raised<span className="text-red-500">*</span>:
          </label>
          <input
            type="number"
            {...register("tfr", { required: true })}
            className="w-full border rounded-lg p-2"
            placeholder="Enter TFR"
          />
          {errors.tfr && (
            <p className="text-red-500 text-sm">This field is required</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#FFF78A] w-full hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
