//database needed

import Navbar from "../_components/Navbar";
import "./Contact.css";
const Contact = () => {
  return (
    <div className="w-full h-screen overflow-x-hidden .body bg-blue-500">
      <Navbar />
      <div className="about-main">
        <div className="contact-form-container">
          <h1 className="contact-title">Contact Us</h1>
          <form className="contact-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter your name*"
                className="form-input full-width"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Enter your email*"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Enter your phone number*"
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-group">
              <textarea
                placeholder="Message*"
                className="form-textarea"
                rows="4"
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Contact;
