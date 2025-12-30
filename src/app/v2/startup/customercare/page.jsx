"use client";
import { Phone, MessageSquare, Mail } from "lucide-react";
import Navbar from "../profile/_components/Navbar";

export default function HelpPage() {

  return (
    <div className="min-h-screen bg-white px-6 ">
      {/* Leave space for Navbar */}
      <Navbar/>
      <div className="h-16"></div>

      {/* Hero Section */}
      <div className="bg-gray-100 rounded-lg text-center py-10 px-6 mb-12">
        <h1 className="text-[6rem]   font-bold px-[10vh]" style={{
            lineHeight:1
        }}>
          How may we<br></br> <span className="text-black font-extrabold">help</span> you?
        </h1>
      </div>

      {/* Contact Options */}
      <div className="flex justify-between gap-12 mb-12 text-sm sm:text-base px-20">
        <div className="flex gap-2  items-center h-6">
          <Phone className="w-6 h-6 " />
          <span>Call us</span>
        </div>
        <div className="flex gap-2  items-center">
          <MessageSquare className="w-6 h-6 " />
          <span>Message us</span>
        </div>
        <div className="flex gap-2  items-center">
          <Mail className="w-6 h-6 " />
          <span>Email us</span>
        </div>
      </div>

      {/* Company Info */}
      <div className="bg-gray-100 rounded-lg p-[10vh] text-start">
        <h2 className="text-6xl font-bold">EQvisor Fintech</h2>
        <p className="text-4xl font-semibold mb-6">Pvt. Ltd.</p>

        <div className="grid grid-cols-2 gap-y-3 text-sm sm:text-base justify-items-start">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Mail</a>
          <a href="#" className="hover:underline">About Us</a>
          <a href="#" className="hover:underline">LinkedIn</a>
          <a href="#" className="hover:underline">Services</a>
          <a href="#" className="hover:underline">Instagram</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </div>
      </div>
    </div>
  );
}
