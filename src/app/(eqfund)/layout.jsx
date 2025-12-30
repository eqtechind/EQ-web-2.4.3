"use client";
import React from "react";
import { motion } from "framer-motion";
import Header from "./_components/Header";

// Blue circle animation for the bottom-left
const blueCircleVariants = {
  animate: (delay) => ({
    x: [0, 30, -30, 0], // Moves horizontally
    y: [0, 20, -20, 0], // Moves vertically
    transition: {
      delay, // Custom delay for staggered animation
      duration: 8, // Total animation duration
      repeat: Infinity, // Loop animation
      repeatType: "reverse", // Smooth reverse
      ease: "easeInOut", // Smooth easing
    },
  }),
};

// Green circle animation for the top-right
const greenCircleVariants = {
  animate: (delay) => ({
    x: [0, -20, 20, 0], // Moves horizontally
    y: [0, -10, 10, 0], // Moves vertically
    transition: {
      delay,
      duration: 10,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  }),
};

const Layout = ({ children }) => {
  return (
    <div className="relative w-full h-full  ">
      <Header/>
      {/* Blue Circles - Bottom Left */}
      <div className="fixed top-0 w-full h-screen overflow-hidden">
        <motion.div
          className="absolute bottom-[-135vh] left-[-80vh] bg-[#1269f4] w-[200vh] h-[200vh] rotate-[100%] rounded-full"
          variants={blueCircleVariants}
          animate="animate"
          custom={1}
        ></motion.div>

        <motion.div
          className="absolute bottom-[-115vh] left-[-80vh] bg-[#085adb] w-[200vh] h-[200vh] rounded-full"
          variants={blueCircleVariants}
          animate="animate"
          custom={2}
        ></motion.div>

        <motion.div
          className="absolute bottom-[-150vh] left-[-80vh] bg-[#114393] w-[200vh] h-[200vh] rounded-full"
          variants={blueCircleVariants}
          animate="animate"
          custom={1.5}
        ></motion.div>

        <motion.div
          className="absolute bottom-[-190vh] left-[-100vh] bg-[#0363fb] w-[220vh] h-[220vh] rounded-full"
          variants={blueCircleVariants}
          animate="animate"
          custom={0.5}
        ></motion.div>

        {/* Green Circles - Top Right */}

        <motion.div
          className="absolute top-[-50vh] right-[-40vh] bg-[#baff9f] w-[150vh] h-[150vh] rounded-full"
          variants={greenCircleVariants}
          animate="animate"
          custom={2}
        ></motion.div>

        <motion.div
          className="absolute top-[-20vh] right-[-40vh] bg-[#75ff3e] w-[140vh] h-[140vh] rounded-full"
          variants={greenCircleVariants}
          animate="animate"
          custom={1.5}
        ></motion.div>

        <motion.div
          className="absolute top-[-45vh] right-[-100vh] bg-[#19ba4c] w-[140vh] h-[140vh] rounded-full"
          variants={greenCircleVariants}
          animate="animate"
          custom={0.5}
        ></motion.div>
        {/* Children */}
      </div>
      {children}
    </div>
  );
};

export default Layout;
