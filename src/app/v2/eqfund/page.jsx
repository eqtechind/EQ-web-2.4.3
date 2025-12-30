"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, BarChart3, MessageCircle } from "lucide-react";
import Navbar from "./_components/Navbar";

export default function Dashboard() {
  const [showAnalytics, setShowAnalytics] = useState(true);
  const [showMessages, setShowMessages] = useState(true);
  const [togglePositions, setTogglePositions] = useState({
    analytics: { x: 100, y: 100 },
    messages: { x: 1100, y: 500 }
  });
  const [isDragging, setIsDragging] = useState({ analytics: false, messages: false });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (type, e) => {
    setIsDragging({ ...isDragging, [type]: true });
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging.analytics || isDragging.messages) {
      const type = isDragging.analytics ? 'analytics' : 'messages';
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Constrain to viewport bounds
      const maxX = window.innerWidth - 60; // Button width
      const maxY = window.innerHeight - 60; // Button height
      
      setTogglePositions(prev => ({
        ...prev,
        [type]: {
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY))
        }
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging({ analytics: false, messages: false });
  };

  useEffect(() => {
    if (isDragging.analytics || isDragging.messages) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <div className="w-full h-[100vh] bg-black overflow-hidden ">
        <Navbar/>

    <div className="w-full  bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Floating Toggle Buttons */}
      {!showAnalytics && (
        <div 
          className="absolute z-10 cursor-move select-none"
          style={{
            left: togglePositions.analytics.x,
            top: togglePositions.analytics.y,
            transform: 'translate(-50%, -50%)'
          }}
          onMouseDown={(e) => handleMouseDown('analytics', e)}
        >
          <button
            onClick={() => setShowAnalytics(true)}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors"
          >
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </button>
        </div>
      )}
      
      {!showMessages && (
        <div 
          className="absolute z-10 cursor-move select-none"
          style={{
            left: togglePositions.messages.x,
            top: togglePositions.messages.y,
            transform: 'translate(-50%, -50%)'
          }}
          onMouseDown={(e) => handleMouseDown('messages', e)}
        >
          <button
            onClick={() => setShowMessages(true)}
            className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-blue-600" />
          </button>
        </div>
      )}

      {/* Center - Main Investment */}
      <div className=" w-full max-w-3xl overflow-x-hidden  h-[80vh]" style={{
        scrollbarWidth: 'none',
        '-ms-overflow-style': 'none',
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }}>
        
      <div className="bg-white rounded-xl shadow-md w-full max-w-3xl mb-6 overflow-hidden">
        <div className="p-4 border-b flex items-center gap-4">
            <div className="bg-green-400 h-8 w-8 rounded-full"></div>
           <div>
          <h3 className="font-bold text-lg">Hala Mobility</h3>
          <p className="text-sm text-gray-500">
            Logistics Made Easy, Anywhere, Everywhere
          </p>
           </div>
        </div>
        <div className="relative w-full h-[320px]">
          <Image
            src="https://framerusercontent.com/images/ktripXKl5hy6IZenWByzkDwoG2c.png?width=1200&height=686"
            alt="Hala Mobility"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4 flex justify-end">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            invest now
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md w-full max-w-3xl overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="font-bold text-lg">Hala Mobility</h3>
          <p className="text-sm text-gray-500">
            Logistics Made Easy, Anywhere, Everywhere
          </p>
        </div>
        <div className="relative w-full h-[320px]">
          <Image
            src="https://framerusercontent.com/images/ktripXKl5hy6IZenWByzkDwoG2c.png?width=1200&height=686"
            alt="Hala Mobility"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4 flex justify-end">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            invest now
          </button>
        </div>
      </div>
      </div>


      {/* Floating Analytics */}
      {showAnalytics && (
        <div className="absolute top-6 left-6 bg-white rounded-xl p-6 shadow-md w-64 z-20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              📊 Analytics
            </h2>
            <button
              onClick={() => setShowAnalytics(false)}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          <div>
            <p className="text-gray-500">Total Investments:</p>
            <p className="text-2xl font-bold text-blue-600">$ 400,000</p>
          </div>
          <div className="mt-3">
            <p className="text-gray-500">Total Profits:</p>
            <p className="text-xl font-semibold text-blue-500">$ 250,000</p>
          </div>
          <p className="mt-4 text-gray-700">
            You have invested in{" "}
            <span className="text-blue-600 font-semibold">20</span> startups
          </p>
        </div>
      )}

      {/* Floating Messages */}
      {showMessages && (
        <div className="absolute top-6 right-6 bg-white rounded-xl p-4 shadow-md w-72 z-20">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-lg">Messages</h2>
            <button
              onClick={() => setShowMessages(false)}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <div className="flex flex-col gap-3 max-h-[250px] overflow-y-auto">
            <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <p className="font-semibold">Slash AI</p>
              <p className="text-xs text-gray-400">July 19</p>
              <p className="text-sm text-gray-600 truncate">
                Hey Austin, as we discussed earlier the profits are stagnant...
              </p>
            </div>

            <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <p className="font-semibold">Hala Mobility</p>
              <p className="text-xs text-gray-400">July 16</p>
              <p className="text-sm text-gray-600 truncate">
                We have successfully reached our estimated goals for this month...
              </p>
            </div>

            <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <p className="font-semibold">Greg Drones</p>
              <p className="text-xs text-gray-400">July 15</p>
              <p className="text-sm text-gray-600 truncate">
                Thank you Austin for the opportunity you have provided us...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>

  );
}
