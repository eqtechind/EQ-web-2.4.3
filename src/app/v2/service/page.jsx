"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./_components/Navbar";
import "./styles/Service.css";
import Image from "next/image";
import Footer from "./_components/Footer";
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <div
      className="fixed cursor-none pointer-events-none z-50 transition-transform duration-100 ease-out"
      style={{
        left: mousePosition.x - 8,
        top: mousePosition.y - 8,
        transition:"all .1s ease",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="w-6 h-6 bg-[#A5FF8A] rounded-full shadow-lg"></div>
    </div>
  );
};

const Page = () => {
  const cardData = [
    {
      id: 1,
      img: "https://framerusercontent.com/images/SmKpJArNfpH0J4YgHNcqsyxuyEA.jpg",
      title: "EQfund.",
      description:
        "A diversified investment pool for growth. Minimize risk, maximize returns.",
    },
    {
      id: 2,
      img: "https://framerusercontent.com/images/nx1N5SwYxk5Cxjvz4pfNEO3FYKQ.jpg",
      title: "EQRaise.",
      description:
        "Enhance your funding experience with direct private equity investment.",
    },
    {
      id: 3,
      img: "https://framerusercontent.com/images/H0GrbHxwUWuqZBEI4TZIMPtI.jpg",
      title: "Transparency..",
      description:
        "All activity is visible, every transaction is traceable. Trust by design.",
    },
  ];
  return (
    <div className="cursor-none bg-black">
      <CustomCursor />
      <Navbar />
      <div className="section-one-container py-8 ">
        <div className="section-one-section">
          <h1 className="section-one-title text-white">
            <span className="text-[#A5FF8A] gap-2">Corporate</span>.Minimal.
            Bold.
          </h1>
          <h1 className="section-one-title small-size text-[#777777] text-[2rem] gap-2">
            Investing.Crowdfunding.Simplicity.
          </h1>
        </div>
      </div>
      <div className="section-two-container">
        <div className="section-two-section">
          <div className="section-two-card-container">
            {cardData.map((data, index) => (
              <div className="section-two-card" key={index + 1}>
                <img src={data.img} />
                <h1>{data.title}</h1>
                <p>{data.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="section-three-container">
        <div className="section-three-section">
          <h1>
            <span className="text-[#A5FF8A]">Start</span> your journey.
          </h1>
          <p className="text-[#777777]">
            Join our network of smart{" "}
            <span className="text-[#8AADFF]">investors.</span>
          </p>
          <button>Sign Up</button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Page;
