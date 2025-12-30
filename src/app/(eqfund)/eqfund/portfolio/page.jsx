"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const page = () => {
  const months = [
    "Mar-24",
    "Apr-24",
    "May-24",
    "Jun-24",
    "Jul-24",
    "Aug-24",
    "Sep-24",
    "Oct-24",
    "Nov-24",
  ];

  const data = {
    labels: months,
    datasets: [
      {
        label: "Portfolio Value",
        data: [
          450200, 452000, 453500, 455000, 458000, 460000, 462000, 465000,
          470000,
        ],
        borderColor: "rgba(42, 124, 253, 1)",
        backgroundColor: "rgba(42, 124, 253, 0.1)",
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: "rgba(42, 124, 253, 1)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        padding: 12,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#555",
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          color: "#555",
          font: {
            size: 12,
          },
          callback: (value) => `$${value.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div className="bg-transparent flex items-center justify-center p-4">
      <div className="w-full lg:w-[90%] flex flex-col md:flex-row gap-6 bg-white h-auto md:h-[120vh] relative z-100 p-4 shadow-lg rounded-lg overflow-hidden">
        <div className="w-full md:w-[250vh]">
          <div className="w-full h-[40vh] md:h-[60%]">
            {/* Line Chart */}
            <Line data={data} options={options} />
          </div>
          {/* Investment Summary Cards */}
          <div className="h-30 h-[40vh] flex flex-col md:flex-row items-center justify-around w-full gap-4 mt-4">
            {/* Total Invested Amount Card */}
            <div className="inner-shadow w-full md:w-1/2 h-[25vh] flex py-6 px-8  shadow-lg rounded-xl bg-white items-center flex-col justify-center">
              <h2 className="text-[#64748b] text-xl mb-2">
                Total Invested Amount
              </h2>
              <p className="text-[#2A7CFD] text-4xl font-bold">$450,200</p>
            </div>
            {/* Total Returns Card */}
            <div className="inner-shadow w-full md:w-1/2 flex py-6 px-8 h-30 shadow-lg rounded-xl bg-white items-center flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-[#64748b] text-xl">
                  Total Returns in last
                </h2>
                <select className="text-[#64748b] text-lg bg-transparent border-none outline-none cursor-pointer">
                  <option>1 month</option>
                  <option>3 months</option>
                  <option>6 months</option>
                  <option>1 year</option>
                </select>
              </div>
              <p className="text-[#56E244] text-4xl font-bold">$4,800</p>
            </div>
          </div>
        </div>
        <div className="w-[4px] h-[90%] bg-blue-500 rounded-xl "></div>
        <div className="w-full px-2 flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl">Your Investment</h2>
          <div className="w-full h-auto md:h-[15vh] p-4 flex flex-col md:flex-row justify-around items-center bg-[#efefef] gap-4">
            <div className="w-[10vh] h-[10vh] bg-[#d9d9d9]"></div>
            <div className="w-full flex justify-evenly  items-center flex-col md:block md:w-[60%] px-2 text-white">
              <div className="text-blue-700">Aces</div>
              <div className="text-black">Invested:3000</div>
            </div>
            <div className="w-full md:w-[15vh] flex items-center justify-center font-extrabold text-green-500 text-3xl md:text-4xl">
              50%
              <span>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_154_5537)">
                    <path
                      d="M28.75 7.5L16.875 19.375L10.625 13.125L1.25 22.5M28.75 7.5H21.25M28.75 7.5V15"
                      stroke="#56E244"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_154_5537">
                      <rect width="30" height="30" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </div>
          </div>
          <div className="w-full h-auto md:h-[15vh] p-4 flex flex-col md:flex-row justify-around items-center bg-[#efefef] gap-4">
            <div className="w-[10vh] h-[10vh] bg-[#d9d9d9]"></div>
            <div className="w-full flex justify-evenly  items-center flex-col md:block md:w-[60%] px-2 text-white">
              <div className="text-blue-700">Aces</div>
              <div className="text-black">Invested:3000</div>
            </div>
            <div className="w-full md:w-[15vh] flex items-center justify-center font-extrabold text-red-500 text-3xl md:text-4xl">
              50%
              <span>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_154_5573)">
                    <path
                      d="M28.75 22.5L16.875 10.625L10.625 16.875L1.25 7.5M28.75 22.5H21.25M28.75 22.5V15"
                      stroke="#D41735"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_154_5573">
                      <rect width="30" height="30" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
