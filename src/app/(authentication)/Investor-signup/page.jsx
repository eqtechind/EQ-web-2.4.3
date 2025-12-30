"use client"; 

import Link from "next/link";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {auth, googleProvider } from "@/firebase/investor"; // Ensure correct import
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Handle Email/Password Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      setTimeout(() => {
        router.push("/process-investor/panprocess-investor");
      }, 3000);
    } catch (err) {
      setError("Signup failed. Email might be in use or invalid.");
    }
  };

  // Handle Google Signup
  const handleGoogleSignup = async () => {
    setError("");
    setSuccess(false);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google Auth User:", result.user);
      setSuccess(true);
      setTimeout(() => {
        router.push("/process-investor/panprocess-investor");
      }, 2000);
    } catch (err) {
      console.error("Google Signup Error:", err);
      setError("Google Signup failed. Try again.");
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col gap-6 items-center justify-center">
      <div className="w-[60vh] flex flex-col gap-6 bg-white shadow-lg px-[10vh] pt-[5vh] rounded-xl pb-[10vh]">
        
        {/* Logo & Title */}
        <div className="flex flex-col items-center justify-center">
          <img 
            src="/eqvisor_logo_2.png" 
            alt="Eqvisor Logo" 
            className="w-[120px] h-[80px] object-contain"
          />
          <p className="text-lg font-semibold mt-2">
            Signup to <span className="text-blue-500">Eqvisor</span>
          </p>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Success Popup */}
        {success && (
          <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
            Signed Up Successfully! Redirecting...
          </div>
        )}

        {/* Email/Password Signup Form */}
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input 
            className="rounded-xl w-full h-[6vh] border border-gray-300 pl-2 outline-none"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            className="rounded-xl w-full h-[6vh] border border-gray-300 pl-2 outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="submit"
            className="w-full rounded-xl bg-blue-500 py-2 text-white hover:bg-blue-600 transition"
          >
            Signup
          </button>
        </form>

        {/* Google Signup Button */}
        <button
          onClick={handleGoogleSignup}
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-red-500 py-2 text-white hover:bg-red-600 transition mt-4"
        >
          <img src="/google_icon.svg" alt="Google" className="w-5 h-5" />
          Sign up with Google
        </button>

        {/* Links */}
        <div className="w-full text-center">
          Already have an account?
          <Link href="/Investor-login" className="text-blue-600 hover:underline"> Login</Link>
        </div>
      </div>

      <div>
        <Link href="/" className="text-blue-600 hover:underline">Back to Home Page</Link>
      </div>
    </div>
  );
};

export default SignupPage;
