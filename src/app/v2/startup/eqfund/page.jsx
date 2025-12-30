"use client"
import React from "react"
import "./StartUpEqf.css"
import Navbar from "./_components/Navbar"

export default function StartUpEqfund() {
    const captionText =
        "At our core, we’re reimagining logistics to make the movement of goods faster, smarter, and more reliable. By combining technology with efficiency-driven operations, we’re helping businesses streamline their supply chains, reduce costs, and deliver better customer experiences. Our mission is simple: to bridge the gap between businesses and their customers with seamless logistics solutions built for the future."

    const onUpdate = () => {
        alert("Caption updated")
    }

    const onChangeDeck = () => {
        alert("Open file picker to change pitch deck")
    }

    const onSaveDeck = () => {
        alert("Pitch deck changes saved")
    }

    const onSaveFunding = (e) => {
        e.preventDefault()
        alert("Funding round saved")
    }

    const onUploadFunding = () => {
        alert("Funding round uploaded")
    }

    return (
        <div className="eqf-page">
           <Navbar/>

            <main className="eqf-main" role="main">
                <section className="eqf-intro">
                    <h1 className="eqf-title">Preview</h1>
                    <p className="eqf-subtitle">
                        Investors see your startup in the format given below. The data and
                        pitch deck can be edited as per your liking!
                    </p>
                </section>

                <section className="eqf-grid">
                    {/* Left: Edit Caption */}
                    <aside className="eqf-card eqf-side">
                        <h3 className="eqf-card-title">Edit Caption:</h3>
                        <textarea
                            className="eqf-textarea"
                            defaultValue={captionText}
                            aria-label="Edit caption"
                        />
                        <button className="eqf-btn eqf-btn-primary" onClick={onUpdate}>
                            Update
                        </button>
                    </aside>

                    {/* Center: Startup Preview Card */}
                    <article className="eqf-card eqf-preview">
                        <header className="eqf-startup-header">
                            <div className="eqf-avatar" aria-hidden="true">
                                H
                            </div>
                            <div className="eqf-company">
                                <strong className="eqf-company-name">Hala Mobility</strong>
                                <span className="eqf-company-tagline">
                                    Logistics Made Easy, Anywhere, Everywhere
                                </span>
                            </div>
                        </header>

                        <div className="eqf-cover">
                            {/* Must use Source URL provided */}
                            <img
                                src="https://framerusercontent.com/images/ktripXKl5hy6IZenWByzkDwoG2c.png?width=1200&height=686"
                                alt="Hala Mobility logistics visual showing trucks and city blocks"
                                loading="lazy"
                            />
                        </div>

                        <div className="eqf-desc-cta">
                            <p className="eqf-desc">
                                At our core, we’re reimagining logistics to make the movement of
                                goods faster, smarter, and more reliable. By combining
                                technology with efficiency-driven operations, we’re helping
                                businesses streamline their supply chains, reduce costs, and
                                deliver better customer experiences. Our mission is simple: to
                                bridge the gap between businesses and their customers with
                                seamless logistics solutions built for the future.
                            </p>
                            <button className="eqf-btn eqf-btn-primary">invest now</button>
                        </div>
                    </article>

                    {/* Right: Edit Pitch Deck */}
                    <aside className="eqf-card eqf-side">
                        <h3 className="eqf-card-title">Edit Pitch Deck:</h3>
                        <button
                            className="eqf-btn eqf-btn-primary eqf-btn-block"
                            onClick={onChangeDeck}
                        >
                            Change Pitch Deck
                        </button>
                        <button
                            className="eqf-btn eqf-btn-primary eqf-btn-block"
                            onClick={onSaveDeck}
                        >
                            Save Changes
                        </button>
                    </aside>
                </section>

                {/* Funding Round Box */}
                <section className="eqf-funding">
                    <h2 className="eqf-funding-title">Funding Round</h2>
                    <p className="eqf-funding-sub">Fill up the details of the funding round!</p>

                    <div className="eqf-funding-card">
                        <form onSubmit={onSaveFunding}>
                            <label className="eqf-field-label">Enter the Funding Round Amount (in Rupees):</label>
                            <input className="eqf-input" type="number" placeholder="Enter Funding Amount" />

                            <label className="eqf-field-label">Enter Equity Dilution (in %):</label>
                            <input className="eqf-input" type="number" placeholder="Enter Equity Dilution" />

                            <div className="eqf-sep" aria-hidden="true" />

                            <button type="submit" className="eqf-btn eqf-btn-primary eqf-btn-block">Save</button>
                        </form>
                    </div>

                    <div className="eqf-funding-actions">
                        <div>
                            <h3 className="eqf-funding-title small">Save and Upload Funding Round</h3>
                            <p className="eqf-funding-sub small">Once you upload the funding request it cannot be edited. Kindly verify the details before entering.</p>
                        </div>
                        <div className="eqf-action-buttons">
                            <button className="eqf-btn eqf-btn-ghost">Save</button>
                            <button className="eqf-btn eqf-btn-primary" onClick={onUploadFunding}>Upload</button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

