// "use client";
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselPagination,
// } from "@/components/ui/carousel"; // Assuming you have the carousel component
// import Notification from "../../_components/Notification";

// const CompanyCard = () => {
//   const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide state
//   const [api, setApi] = useState(null); // API to control the carousel programmatically

//   // Function to update the slide index
//   const handleSlideChange = (index) => {
//     setCurrentSlide(index); // Update the currentSlide state
//     if (api) {
//       api.scrollTo(index); // Move the carousel to the selected slide
//     }
//   };

//   // Listen for changes in the carousel selection and update currentSlide state
//   useEffect(() => {
//     // if (api) {
//     //   // When API is available, attach a callback for slide change event to update state
//     //   api.on("select", () => {
//     //     setCurrentSlide(api.selectedIndex); // Update current slide index on selection change
//     //   });
//     // }
//   }, [api]);

//   return (
//     <div className="min-h-screen box-border max-h-full bg-transparent flex flex-col lg:flex-row justify-center items-center p-4 gap-4">
//       {/* Main Container */}
//       <div className="w-full lg:w-[70%] border-2 border-transparent rounded-md relative z-10 bg-transparent h-auto lg:h-[100%] mb-4 lg:mb-10">
//         <div className="flex items-center px-4 lg:px-8 rounded-t-md h-10 w-full border-2 border-blue-500 bg-white text-black text-sm lg:text-base">
//           Google Crops
//         </div>

//         <div className="w-full h-[50vh] lg:h-[70vh] border-2 flex flex-grow-0 border-transparent">
//           {/* Carousel component */}
//           <Carousel
//             opts={{ loop: true }}
//             setApi={setApi}
//             className="relative h-full w-[100%]"
//           >
//             <CarouselContent className="h-full">
//               <CarouselItem className="h-[50vh] lg:h-[70vh]">
//                 <motion.div
//                   className="flex justify-center items-center bg-gray-300 h-full w-full"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <img
//                     src="/path/to/image1.jpg"
//                     alt="Image 1"
//                     className="w-full h-full object-cover"
//                   />
//                 </motion.div>
//               </CarouselItem>
//               <CarouselItem className="h-[50vh] lg:h-[70vh]">
//                 <motion.div
//                   className="flex justify-center items-center bg-gray-300 h-full w-full"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <img
//                     src="/path/to/image2.jpg"
//                     alt="Image 2"
//                     className="w-full h-full object-cover"
//                   />
//                 </motion.div>
//               </CarouselItem>
//               <CarouselItem className="h-[50vh] lg:h-[70vh]">
//                 <motion.div
//                   className="flex justify-center items-center bg-gray-300 h-full w-full"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <img
//                     src="/path/to/image3.jpg"
//                     alt="Image 3"
//                     className="w-full h-full object-cover"
//                   />
//                 </motion.div>
//               </CarouselItem>
//             </CarouselContent>

//             {/* Pagination (Circle Buttons) */}
//             <CarouselPagination
//               numSlides={3}
//               currentSlide={currentSlide}
//               onPaginationClick={handleSlideChange}
//             />
//           </Carousel>
//         </div>
//         <div className="flex flex-col lg:flex-row items-center mt-[4px] px-4 lg:px-8 rounded-md h-auto w-full shadow-md bg-white text-black py-4 lg:py-0">
//           <div className="w-full lg:w-[80%] min-h-[20vh] text-sm lg:text-base">
//             Google Crops Google Crops<br />
//             Google Crops
//           </div>
//           <div className="w-full lg:w-auto mt-4 lg:mt-0">
//             <button className="bg-green-500 w-full lg:w-[20vh] h-10 rounded-md text-white text-sm lg:text-base">
//               Invest
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Notification Sidebar */}
//       <div className="w-full lg:w-auto h-auto lg:h-[100%]">
//         <Notification />
//       </div>
//     </div>
//   );
// };

// export default CompanyCard;

import React from 'react'

const page = () => {
  return (
    <div>
      
    </div>
  )
}

export default page
