
"use client";


import Image from "next/image";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home1() {
  
  redirect("/v2");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Add a small delay to ensure loader is visible
    const redirectTimer = setTimeout(() => {
      router.push("/v2");
    }, 100);

    return () => clearTimeout(redirectTimer);
  }, []);

  // Show loader while redirecting
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          {/* Spinner */}
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          </div>
          
          {/* Loading text */}
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading...</h2>
          <p className="text-gray-500">Redirecting you to the platform</p>
          
          {/* Optional: Add your logo */}
          <div className="mt-8">
            <Image 
              src="https://framerusercontent.com/images/KAm3suQ5rGv5sucbc1VcV7jT74.png" 
              alt="Eqvisor Logo" 
              width={120} 
              height={40}
              className="mx-auto opacity-80"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="home-section w-full h-[auto]">
        {/* //home section  */}
        {/* <Navbar />

        <HomeContainer />
        <FinancialSection />
        <ImageContainer /> */}
        {/* <AboutUs /> */}
        {/* <QuerySection />
        <AlwaysConnected />
        <Footer />
        <Home/> */}
      </div>
    </>
  );
}
