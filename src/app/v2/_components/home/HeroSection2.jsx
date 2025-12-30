import React from "react";
import "../../styles/HeroSection.css";
import Image from "next/image";
const HeroSection2 = () => {
  return (
    <div className="hero-section-2-container">
      <div className="container">
        <div className="container-card">
          <video
            src="https://framerusercontent.com/assets/P0EUBjiPjR5r3Z6w2O9q1jNHp8.mp4"
            loop={true}
            preload="auto"
            poster="https://framerusercontent.com/images/kOK21kgklWdq8zz2Spt4NAG88.png"
            muted=""
            playsInline=""
            style={{cursor:"auto",width:"140vh",height:"50vh",borderRadius:"20px",display:"block",objectFit:"cover",backgroundColor:"rgba(0, 0, 0, 0)",objectPosition:"50% 50%"}}
            autoPlay
          ></video>
          <div>
            <h1>Grow</h1>
            <p>
              as a startup, find a place where the possibilities are limitless.
            </p>
            <button>Read More</button>
          </div>
        </div>
        <div className="container-card">
        <video
            src="https://framerusercontent.com/assets/psQVa3qtZINuYseMQuqzYS2SF4c.mp4"
            loop={true}
            preload="auto"
            poster="https://framerusercontent.com/images/kOK21kgklWdq8zz2Spt4NAG88.png"
            
            playsInline=""
            style={{cursor:"auto",width:"140vh",height:"50vh",borderRadius:"20px",display:"block",objectFit:"cover",backgroundColor:"rgba(0, 0, 0, 0)",objectPosition:"50% 50%"}}
            autoPlay
          ></video>
          <div>
            <h1>Easy</h1>
            <p>to find growing startups to invent in as an investor.</p>
            <button>Read More</button>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default HeroSection2;
