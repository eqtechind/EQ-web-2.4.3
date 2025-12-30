import React from "react";
import "./customer_care.css";

export default function Customer() {
    return (
        <div className="help-page" role="document">
            <header className="help-header" role="banner">
                <div className="container header-inner">
                    <a className="brand" href="#" aria-label="EQvisor home">
                        <span className="brand-mark" aria-hidden="true">●</span>
                        <span className="brand-text">EQvisor</span>
                    </a>

                    <nav aria-label="Primary">
                        <ul className="nav-list">
                            <li><a href="#">Dashboard</a></li>
                            <li><a href="#">My Profile</a></li>
                            <li><a href="#">EQRate</a></li>
                            <li><a href="#">Messages</a></li>
                            <li><a className="nav-accent" href="#">Customer Care</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="container main-content" role="main">
                <section className="card hero-card" aria-labelledby="help-title">
                    <h1 id="help-title" className="hero-title">
                        How may we<br />
                        <span className="hero-emphasis">help</span> you?
                    </h1>
                </section>

                <section className="contact-row" aria-label="Contact options">
                    <a className="contact-item" href="tel:+10000000000">
                        <svg
                            className="icon"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <path
                                d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.11 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72c.12.9.3 1.77.54 2.6a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.86 6.86l1.27-1.27a2 2 0 0 1 2.11-.45c.83.24 1.7.42 2.6.54A2 2 0 0 1 22 16.92z"
                                fill="currentColor"
                            />
                        </svg>
                        <span>Call us</span>
                    </a>

                    <a className="contact-item" href="#message">
                        <svg
                            className="icon"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <path
                                d="M21 6a2 2 0 0 0-2-2H5C3.89 4 3 4.9 3 6v12l4-4h12a2 2 0 0 0 2-2V6z"
                                fill="currentColor"
                            />
                        </svg>
                        <span>Message us</span>
                    </a>

                    <a className="contact-item" href="mailto:support@example.com">
                        <svg
                            className="icon"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <path
                                d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"
                                fill="currentColor"
                            />
                        </svg>
                        <span>Email us</span>
                    </a>
                </section>

                <section className="card company-card" aria-labelledby="company-title">
                    <h2 id="company-title" className="company-title">
                        EQvisor Fintech
                        <br />
                        <span className="company-sub">Pvt. Ltd.</span>
                    </h2>

                    <div className="links-grid" role="navigation" aria-label="Company links">
                        <ul className="link-col">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                        <ul className="link-col">
                            <li><a href="mailto:hello@eqvisor.example">Mail</a></li>
                            <li>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    Linkedin
                                </a>
                            </li>
                            <li>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    Instagram
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
}