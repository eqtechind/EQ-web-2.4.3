"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef();

  // Close popup when clicked outside
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
    <div className="service-navbar-container cursor-pointer ">
      <div className="service-navbar-section">
        <div className="menu">
          <div className="logo">
            <Image
              src={
                "https://framerusercontent.com/images/U4HZ0n51V5im9Xn3de193jRPOxM.png"
              }
              alt="logo"
              width={48}
              height={48}
            />
            EQvisor
          </div>

          <div className="service-menu-items">
            <div className="service-menu-item">
              <Link href={"/v2"} className={isActive("/v2") ? "service-active" : ""}>
                Home
              </Link>
            </div>
            <div className="service-menu-item">
              <Link href={"/v2/about"} className={isActive("/v2/about") ? "service-active" : ""}>
                About Us
              </Link>
            </div>
            <div className="service-menu-item">
              <Link
                href={"/v2/service"}
                className={isActive("/v2/service") ? "service-active" : ""}
              >
                Service
              </Link>
            </div>
            <div className="service-menu-item">
              <Link
                href={"/v2/contact"}
                className={isActive("/v2/contact") ? "service-active" : ""}
              >
                Contact
              </Link>
            </div>

            <div className="service-menu-item login-container" ref={popupRef}>
              <button className="service-login-btn" onClick={() => setShowPopup(!showPopup)}>
                Login
              </button>

              {showPopup && (
                <div className="login-popup">
                  <Link href="/login/startup" className="popup-option">
                    Startup
                  </Link>
                  <Link href="/login/investor" className="popup-option">
                    Investor
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
