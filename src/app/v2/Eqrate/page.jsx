//database needed

import React from "react"
import "./Eqrate.css"
import Link from "next/link"

export default function EQRate() {
  return (
    <main className="f">
      <div className="eqv-wrap">
        <header>
          <div className="header-box">
            <div className="logo-title">
              <span className="logo-text">EQvisor</span>
            </div>
            <nav className="about-nav">
              <a href="/v2/startup/dashboard" className="nav-link">Go To Home Page</a>
              <a href="/v2/contact" className="nav-link">Contact Us</a>
              <a href="#" className="nav-link">LogOut</a>
            </nav>
            <div className="header_line eqv-rule--header" aria-hidden="true" />
            <div className="logo-title">
              <span className="logo-text">EQRate</span>
            </div>
          </div>
        </header>
        <div className="about-page">

          <div className="about-main">
            <div className="hero-box">
              <span className="reassure">Reassure</span>
              <span className="innovating">
                <span className="investors">Investors</span> <span>by</span>
              </span>
              <div className="getting-ready">Getting Rated.</div>
            </div>

            <div className="eqv-rule eqv-rule--header" aria-hidden="true" />


            <div className="eqv-cta-row">
              <button className="eqv-btn eqv-btn--primary"><Link href={"/v2/eqrate/form"}> Let&apos;s get Started</Link></button>
              <button className="eqv-btn eqv-btn--primary">Skip for Now</button>
            </div>
            <div className="footer">
              <div className="footer-box">
                <span className="footer-title">EQvisor Fintech Pvt. Ltd.</span>
              </div>
              <div className="main-subtitle-box">
                <div className="subtitle-box">
                  <div className="subtitle"><span>Subtile</span></div>
                  <div className="link-box">
                    <a href="#" className="f-link">Link</a>
                    <a href="#" className="f-link">Link</a>
                    <a href="#" className="f-link">Link</a>
                  </div>
                </div>
                <div className="subtitle-box">
                  <div className="subtitle"><span>Subtile</span></div>
                  <div className="link-box">
                    <a href="#" className="f-link">Link</a>
                    <a href="#" className="f-link">Link</a>
                    <a href="#" className="f-link">Link</a>
                  </div>
                </div>
                <div className="subtitle-box">
                  <div className="subtitle"><span>Subtile</span></div>
                  <div className="link-box">
                    <a href="#" className="f-link">Link</a>
                    <a href="#" className="f-link">Link</a>
                    <a href="#" className="f-link">Link</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
