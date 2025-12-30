"use client";

import React from "react";
import { usePathname } from "next/navigation";
import "../StartUpEqf.css";

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/v2/startup/dashboard", label: "Go to Dashboard" },
    { href: "/v2/startup/eqfund", label: "Funding" },
    { href: "/v2/startup/history", label: "History" },
    { href: "/v2/contact", label: "Contact Us" },
  ];

  return (
    <header className="eqf-header" role="banner">
      <div className="eqf-brand eqf-brand-left" aria-label="EQvisor">
        EQvisor
      </div>

      <nav className="eqf-nav" aria-label="Primary">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`eqf-link ${
              pathname === link.href ? "eqf-link-active" : ""
            }`}
            aria-current={pathname === link.href ? "page" : undefined}
          >
            {link.label}
          </a>
        ))}

        <div className="eqf-nav-progress-inline" aria-hidden="true" />

        <div className="eqf-brand eqf-brand-right" aria-label="EQFund">
          EQFund
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
