import Navbar from '../_components/Navbar';
import './About.css';

 const About = () => {
    return (<>
        <header>
           <Navbar/>
        </header>
        <div className="about-page">

            <div className="about-main">
                <div className="story-box">
                    <span className="our-story">Our Story.</span>
                    <div className="innovating">
                        Innovating <span className="fintech">fintech</span>
                    </div>
                    <div className="for-you">for you.</div>
                </div>
                
                <div className="content-container">
                   <div className="content-block">
                        <h2 className="content-heading">Who We Are</h2>
                        <p className="content-text">
                            We are a passionate fintech startup focused on making financial services smarter, simpler, and more accessible for everyone. Our team brings together years of experience from diverse backgrounds to build products that empower businesses and individuals to manage their money with ease and security.
                        </p>
                    </div>
                    <div className="separator-line"></div>
                
                    <div className="content-block">
                        <h2 className="content-heading">Why Us?</h2>
                        <p className="content-text">
                            Our mission is to break traditional barriers in finance by introducing innovative digital solutions. We believe that technology should work for everyone, and our platform is designed to put users in control, whether it&apos;s saving, investing, or transacting securely. With Xavier Borate at the helm, we are committed to transparency, trust, and continuous improvement, striving to become a trusted partner in your financial journey.
                        </p>
                    </div>
                    <footer>
                        <div class="footer">
                            <div class="footer-heading">EQvisor Fintech</div>
                            <div class="footer-container">
                                <div class="footer-column">
                                    <h3>Company</h3>
                                    <ul>
                                        <li><a href="#">About</a></li>
                                        <li><a href="#">Careers</a></li>
                                        <li><a href="#">Contact</a></li>
                                    </ul>
                                </div>
            
                                    <div class="footer-column">
                                        <h3>Product</h3>
                                        <ul>
                                            <li><a href="#">Features</a></li>
                                            <li><a href="#">Pricing</a></li>
                                            <li><a href="#">Sign Up</a></li>
                                        </ul>
                                    </div>
            
                        <div class="footer-column">
                            <h3>Resources</h3>
                            <ul>
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">Support</a></li>
                                <li><a href="#">Press</a></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </footer>
                </div>
                
            </div>
        </div>
    </>
    )
}

export default About