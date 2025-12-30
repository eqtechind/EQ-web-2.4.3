"use client"; 

import Link from "next/link";
import React, { useState } from "react";
import { auth, googleProvider } from "@/firebase/investor";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  fetchSignInMethodsForEmail 
} from "firebase/auth";
import { useRouter } from "next/navigation";

const InvestorLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // Success state for popup
  const router = useRouter();

  // Handle email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true); // Show success popup

      // Redirect to KYC page after 3 seconds
      setTimeout(() => {
        router.push("/panprocess");
      }, 3000);
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("No account found. Please sign up first.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else {
        setError("Login failed. Check your email and password.");
      }
    }
  };

  // Handle Google Login (Only for Existing Users)
  const handleGoogleLogin = async () => {
    setError("");
    setSuccess(false);

    try {
      const emailFromGoogle = await signInWithPopup(auth, googleProvider);
      const email = emailFromGoogle.user.email;

      // Check if user is already signed up
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      
      if (signInMethods.length === 0) {
        setError("No account found with this email. Please sign up first.");
        return;
      }

      // Proceed with login if user exists
      setSuccess(true);
      setTimeout(() => {
        router.push("/panprocess");
      }, 2000);
    } catch (err) {
      setError("Google login failed. Try again.");
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col gap-6 items-center justify-center">
      {/* Login Box */}
      <div className="w-[60vh] flex flex-col gap-6 bg-white shadow-lg px-[10vh] pt-[5vh] rounded-xl pb-[10vh]">
        
        {/* Logo & Title */}
        <div className="flex flex-col items-center justify-center">
          <img 
            src="/eqvisor_logo_2.png" 
            alt="Eqvisor Logo" 
            className="w-[120px] h-[80px] object-contain"
          />
          <p className="text-lg font-semibold mt-2">Login to <span className="text-blue-500">Eqvisor</span></p>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Success Popup */}
        {success && (
          <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
            Redirecting you to KYC...
          </div>
        )}

        {/* Input Fields */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
            Login
          </button>
        </form>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-red-500 py-2 text-white hover:bg-red-600 transition mt-4"
        >
          <img src="/google_icon.svg" alt="Google" className="w-5 h-5" />
          Login with Google
        </button>

        {/* Links */}
        <div className="w-full text-center">
          <Link href="/reset-password" className="text-sm text-slate-500 hover:underline">
            Forgot user ID or Password?
          </Link>
        </div>
      </div>

      <div>
        Don&apos;t have an account? 
        <Link href="/Investor-signup" className="text-blue-600 hover:underline"> Signup now!</Link>
      </div>
    </div>
  );
};

export default InvestorLoginPage;