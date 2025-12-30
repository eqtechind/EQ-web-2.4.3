"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef();

  // Close popup if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar-container">
      <div className="navbar-section">
        <div className="menu">
          <div className="logo">
            <Image
              src={
                "https://framerusercontent.com/images/KAm3suQ5rGv5sucbc1VcV7jT74.png"
              }
              alt="logo"
              width={48}
              height={48}
            />
            EQvisor
          </div>

          <div className="menu-items">
            <div className="menu-item">
              <Link
                href={"/v2"}
                className={isActive("/v2") ? "active" : ""}
              >
                Home
              </Link>
            </div>
            <div className="menu-item">
              <Link
                href={"/v2/about"}
                className={isActive("/v2/about") ? "active" : ""}
              >
                About Us
              </Link>
            </div>
            <div className="menu-item">
              <Link
                href={"/v2/service"}
                className={isActive("/v2/service") ? "active" : ""}
              >
                Service
              </Link>
            </div>
            <div className="menu-item">
              <Link
                href={"/v2/contact"}
                className={isActive("/v2/contact") ? "active" : ""}
              >
                Contact
              </Link>
            </div>

            <div className="menu-item login-container" ref={popupRef}>
              <button className="login-btn" onClick={() => setShowPopup(!showPopup)}>
                Login
              </button>

              {showPopup && (
                <div className="login-popup">
                  <Link href="/Startup-login" className="popup-option">
                    Startup
                  </Link>
                  <Link href="/Investor-login" className="popup-option">
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
