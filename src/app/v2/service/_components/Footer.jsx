import React from "react";
import "../styles/Footer.css"
const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-section">
        <h1>EQvisor Fintech</h1>
        <div className="footer-menu">
          <ul>
            <li className="font-bold">Company</li>
            <li>About us</li>
            <li>Service</li>
            <li>Team</li>
          </ul>
          <ul>
            <li className="font-bold">Support</li>
            <li>Help Center</li>
            <li>Contact Us</li>
            <li>Teams</li>
          </ul>
          <ul>
            <li className="font-bold">Invest</li>
            <li>Opportunities</li>
            <li>EQFund</li>
            <li>EQRaise</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
