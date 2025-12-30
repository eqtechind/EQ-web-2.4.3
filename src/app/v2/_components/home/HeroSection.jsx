"use client";
import React, { useState, useRef, useEffect } from "react";
import "../../styles/HeroSection.css";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef();

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="hero-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">A Startup for Startups.</h1>

          <div className="hero-video-section">
            <video
              src={"https://framerusercontent.com/assets/pFaCmYJZzuees2JHLcCxAbNMeIg.mp4"}
              className="hero-video"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          <p>The bridge between big ideas and bold investments</p>

          <div className="get-started-container" ref={popupRef}>
            <button
              className="get-started-btn"
              onClick={() => setShowPopup(!showPopup)}
            >
              Get Started
            </button>

            {showPopup && (
              <div className="get-started-popup">
                <Link href="/Startup-signup" className="popup-option">
                  Startup
                </Link> 
                <Link href="/Investor-signup" className="popup-option">
                  Investor
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="hero-sub-section">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="none"
          >
            <path
              d="M 18 3.96 C 18 1.773 16.227 0 14.04 0 L 3.96 0 C 1.773 0 0 1.773 0 3.96 L 0 14.17 C 0 16.357 1.773 18.129 3.96 18.129 L 14.04 18.129 C 16.227 18.129 18 19.902 18 22.089 L 18 32.04 C 18 34.227 19.773 36 21.96 36 L 32.04 36 C 34.227 36 36 34.227 36 32.04 L 36 21.83 C 36 19.643 34.227 17.87 32.04 17.87 L 21.96 17.87 C 19.773 17.87 18 16.097 18 13.91 Z"
              fill="rgb(138, 173, 255)"
            ></path>
          </svg>
          EQFund
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="none"
            overflow="visible"
          >
            <path
              d="M 18 36 C 16.813 36 15.719 35.703 14.719 35.109 C 13.75 34.547 12.969 33.781 12.375 32.813 C 11.813 31.812 11.531 30.719 11.531 29.531 C 11.531 28.031 11.875 26.781 12.563 25.781 C 13.25 24.781 14.313 23.609 15.75 22.266 C 16.813 21.297 17.344 20.375 17.344 19.5 L 17.344 18.656 L 16.5 18.656 C 15.531 18.656 14.203 19.625 12.516 21.563 C 10.859 23.5 8.844 24.469 6.469 24.469 C 5.281 24.469 4.188 24.188 3.187 23.625 C 2.219 23.031 1.437 22.25 0.844 21.281 C 0.281 20.281 0 19.187 0 18 C 0 16.813 0.281 15.734 0.844 14.766 C 1.437 13.766 2.219 12.984 3.187 12.422 C 4.188 11.828 5.281 11.531 6.469 11.531 C 8.812 11.531 10.812 12.484 12.469 14.391 C 14.125 16.297 15.469 17.25 16.5 17.25 L 17.344 17.25 L 17.344 16.5 C 17.344 15.625 16.813 14.703 15.75 13.734 L 14.672 12.75 C 13.891 12.031 13.172 11.172 12.516 10.172 C 11.859 9.141 11.531 7.906 11.531 6.469 C 11.531 5.281 11.813 4.203 12.375 3.234 C 12.969 2.234 13.75 1.453 14.719 0.891 C 15.719 0.297 16.813 0 18 0 C 19.187 0 20.266 0.297 21.234 0.891 C 22.234 1.484 23.016 2.266 23.578 3.234 C 24.172 4.203 24.469 5.281 24.469 6.469 C 24.469 8.812 23.516 10.812 21.609 12.469 C 19.703 14.125 18.75 15.469 18.75 16.5 L 18.75 17.25 L 19.5 17.25 C 20.562 17.25 21.906 16.297 23.531 14.391 C 25.125 12.484 27.125 11.531 29.531 11.531 C 30.719 11.531 31.797 11.828 32.766 12.422 C 33.766 12.984 34.547 13.75 35.109 14.719 C 35.703 15.688 36 16.781 36 18 C 36 19.187 35.703 20.281 35.109 21.281 C 34.547 22.25 33.766 23.031 32.766 23.625 C 31.797 24.188 30.719 24.469 29.531 24.469 C 28.063 24.469 26.797 24.109 25.734 23.391 C 24.703 22.672 23.547 21.625 22.266 20.25 C 21.297 19.187 20.375 18.656 19.5 18.656 L 18.75 18.656 L 18.75 19.5 C 18.75 20.656 19.703 22 21.609 23.531 C 23.516 25.062 24.469 27.062 24.469 29.531 C 24.469 30.719 24.172 31.812 23.578 32.813 C 23.016 33.781 22.25 34.547 21.281 35.109 C 20.312 35.703 19.219 36 18 36 Z"
              fill="rgb(138, 173, 255)"
            ></path>
          </svg>
          EQRaise
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
