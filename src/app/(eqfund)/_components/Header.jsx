"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`flex z-[1000] sticky top-0 items-center justify-between px-4 md:px-6 py-4 flex-wrap transition-all duration-300 ${isScrolled ? 'bg-black/50 backdrop-blur-md' : 'bg-transparent'}`}>
      {/* Logo and Mobile Menu Button */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <img src="/eqvisor_logo_2.png" alt="Logo" className="h-8 md:h-12" />
          <span className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${isScrolled ? 'text-white' : 'text-black'}`}>EQFund</span>
        </motion.div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M3 6H21M3 18H21" stroke={isScrolled ? "#FFFFFF" : "#000000"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Navigation Section */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center w-full md:w-auto space-y-4 md:space-y-0 md:space-x-8 mt-4 md:mt-0`}
      >
        <Link href="/eqfund/home" className={`text-sm justify-start flex gap-2 items-center font-medium transition-colors duration-300 ${isScrolled ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-600'}`}>
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.625 20.125V13.5631C8.625 12.9591 9.13987 12.4695 9.775 12.4695H13.225C13.8601 12.4695 14.375 12.9591 14.375 13.5631V20.125M10.8335 3.07737L3.35855 8.13244C3.05518 8.3376 2.875 8.66971 2.875 9.02372V18.4845C2.875 19.3905 3.64731 20.125 4.6 20.125H18.4C19.3527 20.125 20.125 19.3905 20.125 18.4845V9.02372C20.125 8.66971 19.9448 8.3376 19.6415 8.13245L12.1665 3.07737C11.7674 2.80754 11.2326 2.80754 10.8335 3.07737Z" stroke="url(#paint0_linear_38_18)" strokeWidth="2" strokeLinecap="round"/>
            <defs>
              <linearGradient id="paint0_linear_38_18" x1="11.5" y1="2.875" x2="11.5" y2="20.125" gradientUnits="userSpaceOnUse">
                <stop offset="0.47" stopColor="#75FF3E"/>
                <stop offset="1" stopColor="#2A7CFD"/>
              </linearGradient>
            </defs>
          </svg>
          Home
        </Link>
        <Link href="/eqfund/portfolio" className={`text-sm flex gap-2 items-center font-medium transition-colors duration-300 ${isScrolled ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-600'}`}>
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.7751 7.47539C10.298 5.1708 12.359 3.45039 14.8219 3.45039C17.6799 3.45039 19.9969 5.76732 19.9969 8.62539C19.9969 11.2728 18.0089 13.4559 15.4443 13.7633M6.3251 5.75039L8.6251 3.45039L6.3251 1.15039M1.7251 8.05039V6.51706C1.7251 4.82338 3.09809 3.45039 4.79176 3.45039H7.09177M16.6751 17.2504L14.3751 19.5504L16.6751 21.8504M21.2751 14.9504V16.4837C21.2751 18.1774 19.9021 19.5504 18.2084 19.5504H15.9084M12.0751 15.5254C12.0751 18.3835 9.75817 20.7004 6.9001 20.7004C4.04202 20.7004 1.7251 18.3835 1.7251 15.5254C1.7251 12.6673 4.04202 10.3504 6.9001 10.3504C9.75817 10.3504 12.0751 12.6673 12.0751 15.5254Z" stroke="url(#paint0_linear_38_27)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="paint0_linear_38_27" x1="11.5001" y1="1.15039" x2="11.5001" y2="21.8504" gradientUnits="userSpaceOnUse">
                <stop offset="0.365" stopColor="#75FF3E"/>
                <stop offset="1" stopColor="#2A7CFD"/>
              </linearGradient>
            </defs>
          </svg>
          Portfolio
        </Link>
        <Link href="/eqfund/message" className={`text-sm flex gap-2 items-center font-medium transition-colors duration-300 ${isScrolled ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-600'}`}>
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.2083 10.0622V5.74967C18.2083 4.69113 17.3502 3.83301 16.2917 3.83301H4.79167C3.73312 3.83301 2.875 4.69113 2.875 5.74968V13.2497C2.875 14.3082 3.73312 15.1663 4.79167 15.1663H6.29167V19.1663L10.2917 15.1663H10.5417M15.4896 17.6247L17.9896 20.1247V17.6247H18.2083C19.2669 17.6247 20.125 16.7666 20.125 15.708V12.458C20.125 11.3995 19.2669 10.5413 18.2083 10.5413H12.4583C11.3998 10.5413 10.5417 11.3995 10.5417 12.458V15.708C10.5417 16.7666 11.3998 17.6247 12.4583 17.6247H15.4896Z" stroke="url(#paint0_linear_38_40)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="paint0_linear_38_40" x1="11.5" y1="3.83301" x2="11.5" y2="20.1247" gradientUnits="userSpaceOnUse">
                <stop offset="0.105" stopColor="#75FF3E"/>
                <stop offset="1" stopColor="#2A7CFD"/>
              </linearGradient>
            </defs>
          </svg>
          Messages
        </Link>
      </motion.nav>

      {/* Search and Profile Section */}
      <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex items-center space-x-4 md:space-x-6 mt-4 md:mt-0 w-full md:w-auto`}>
        <motion.div className={`flex items-center px-4 py-2 rounded-md shadow-md transition-colors duration-300 ${isScrolled ? 'bg-black/50 backdrop-blur-md' : 'bg-white'}`}>
          <svg width="24" height="24" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.8638 22.0104L26.3499 26.3504M14.7249 9.30039C17.293 9.30039 19.3749 11.3823 19.3749 13.9504M24.9032 14.7771C24.9032 20.3699 20.3694 24.9037 14.7766 24.9037C9.18377 24.9037 4.6499 20.3699 4.6499 14.7771C4.6499 9.18425 9.18377 4.65039 14.7766 4.65039C20.3694 4.65039 24.9032 9.18425 24.9032 14.7771Z" stroke="url(#paint0_linear_38_14)" strokeWidth="2" strokeLinecap="round"/>
            <defs>
              <linearGradient id="paint0_linear_38_14" x1="15.4999" y1="4.65039" x2="15.4999" y2="26.3504" gradientUnits="userSpaceOnUse">
                <stop offset="0.285" stopColor="#75FF3E"/>
                <stop offset="1" stopColor="#2A7CFD"/>
              </linearGradient>
            </defs>
          </svg>
          <input type="text" placeholder="Search" className={`w-full outline-none text-sm bg-transparent transition-colors duration-300 ${isScrolled ? 'text-white placeholder-gray-400' : 'text-black placeholder-gray-500'}`}/>
        </motion.div>

        <Popover>
          <PopoverTrigger>
            <div className={`flex items-center space-x-2 px-3 py-2 rounded-md ${isScrolled ? 'text-white' : 'text-black'}`}>
              <div className="h-6 w-6 bg-gray-200 rounded-md"></div>
              <span className="text-sm font-medium hidden md:block">My Profile</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10L12.0008 14.58L17 10" stroke={isScrolled ? "#FFFFFF" : "#1269F4"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </PopoverTrigger>
          <PopoverContent className="bg-black text-white">
            <div className="w-full flex gap-4">
              <div className="w-10 h-10 rounded-md bg-slate-600"></div>
              <div className="text-sm">
                <p>Eqvisor</p>
                <p>Om salunke</p>
              </div>
            </div>
            <div className="flex gap-4 items-center text-sm h-4 mt-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="text-blue-500">Edit Profile Picture</div>
            </div>
            <div className="flex gap-4 items-center text-sm h-4 mt-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="text-blue-500">Edit Profile Picture</div>
            </div>
            <div className="h-20"></div>
            <div className="text-[13px]">You started investments with EQvisor since Feb, 2024.</div>
            <div className="flex justify-between px-4 pt-2">
              <span>Logout</span>
              <span>Delete Account</span>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
