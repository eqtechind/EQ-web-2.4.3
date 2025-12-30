import React from "react";
import "../../styles/stat.css"
const Stat = () => {
  return (
    <div className="stat-container">
      <div className="stat-section">
        <div className="stat-card">
          <div>30+</div>
          <p>Awards</p>
        </div>
        <div  className="stat-card">
          <div>32+</div>
          <p>Investors</p>
        </div>
        <div  className="stat-card">
          <div>10K</div>
          <p>Startups</p>
        </div>
      </div>
    </div>
  );
};

export default Stat;
