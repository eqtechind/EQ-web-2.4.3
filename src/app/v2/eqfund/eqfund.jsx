// page.jsx
import React from "react"
import "./eqfund.css"

export default function EqFund() {
    const requested = 250000
    const collected = 175000
    const progress = Math.min(100, Math.round((collected / requested) * 100))

    const completedRounds = [
        { name: "EQFund", collected: 100000, ended: "23/02/2025" },
        { name: "EQRaise", collected: 45000, ended: "17/12/2024" },
        { name: "EQRaise", collected: 95000, ended: "08/09/2024" },
        { name: "EQFund", collected: 125000, ended: "14/06/2024" },
    ]

    const investors = [
        { initials: "AL", name: "Austin Loyd", amount: 35000, equity: 0.7 },
        { initials: "SB", name: "Shravan Bhoyar", amount: 20000, equity: 0.5 },
        { initials: "AJ", name: "Aayush Joshi", amount: 20000, equity: 0.5 },
        { initials: "PS", name: "Priya Sharma", amount: 12000, equity: 0.3 },
    ]

    const formatMoney = (n) =>
        "$" + n.toLocaleString(undefined, { maximumFractionDigits: 0 })

    return (
        <div className="eqfund">
            <header className="eqfund-header" role="banner">
                <div className="header-left">
                    <div className="brand">EQvisor</div>
                    <nav className="nav" aria-label="Primary">
                        <a href="#">Go to Dashboard</a>
                        <a href="#" className="active">Funding</a>
                        <a href="#">History</a>
                        <a href="#">Contact Us</a>
                    </nav>
                </div>
                <div className="header-right">
                    <div className="product">EQFund</div>
                </div>
            </header>

            <div className="nav-underline" aria-hidden="true" />

            <main className="eqfund-main">
                {/* Left Panel */}
                <section className="panel" aria-labelledby="active-round">
                    <h2 id="active-round" className="panel-title">
                        Active Round
                    </h2>

                    <article className="round-card active" aria-label="Active Round">
                        <div className="avatar-square" aria-hidden="true" />
                        <div className="round-meta">
                            <div className="round-name">EQFund</div>
                            <div className="round-sub">
                                <span className="label">Funds Requested:</span>{" "}
                                <span className="blue-highlight">{formatMoney(requested)}</span>
                            </div>
                            <div className="round-sub">
                                <span className="label">Started on:</span> 19/04/2025
                            </div>
                        </div>
                        <button className="icon-btn" aria-label="More options">
                            <KebabIcon />
                        </button>
                    </article>

                    <h3 className="panel-title small">Completed Rounds</h3>
                    <ul className="round-list">
                        {completedRounds.map((r, i) => (
                            <li key={i} className="round-item">
                                <article className="round-card">
                                    <div className="avatar-square" aria-hidden="true" />
                                    <div className="round-meta">
                                        <div className="round-name">{r.name}</div>
                                        <div className="round-sub">
                                            <span className="label green">Funds Collected:</span>{" "}
                                            <span className="green">{formatMoney(r.collected)}</span>
                                        </div>
                                        <div className="round-sub">
                                            <span className="label">Ended on:</span> {r.ended}
                                        </div>
                                    </div>
                                    <button className="icon-btn" aria-label="More options">
                                        <KebabIcon />
                                    </button>
                                </article>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Right Panel */}
                <section className="panel" aria-labelledby="about-round">
                    <h2 id="about-round" className="panel-title">
                        About Round
                    </h2>

                    <div className="progress">
                        <div className="progress-track" aria-hidden="true">
                            <div
                                className="progress-fill"
                                style={{ width: progress + "%" }}
                                aria-hidden="true"
                            />
                        </div>
                        <p className="funds-label">
                            Funds collected: <strong>{formatMoney(collected)}</strong>
                        </p>
                    </div>

                    <div className="investors">
                        <div className="investors-header">People who invested:</div>
                        <ul className="investor-list">
                            {investors.map((inv, idx) => (
                                <li key={idx} className="investor-item">
                                    <div className="investor-card">
                                        <div className="avatar-circle" aria-hidden="true">
                                            {inv.initials}
                                        </div>
                                        <div className="investor-meta">
                                            <div className="investor-name">{inv.name}</div>
                                            <div className="investor-sub">
                                                Amount invested: {formatMoney(inv.amount)}, Equity:{" "}
                                                {inv.equity}%
                                            </div>
                                        </div>
                                        <button
                                            className="icon-btn"
                                            aria-label={`Message ${inv.name}`}
                                        >
                                            <ChatIcon />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    )
}

function KebabIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
        >
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
        </svg>
    )
}

function ChatIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
        >
            <path d="M21 12a8 8 0 0 1-8 8H7l-4 3 1.5-5A8 8 0 1 1 21 12z" />
        </svg>
    )
}