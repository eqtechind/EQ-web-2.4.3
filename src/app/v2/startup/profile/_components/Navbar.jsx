"use client";
import { instrumentSans } from "@/app/layout";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/v2/startup/dashboard" },
    { name: "My Profile", href: "/v2/startup/profile" },
    { name: "EQRate", href: "/v2/eqrate" },
    { name: "Messages", href: "/v2/messages" },
    { name: "Customer Care", href: "/v2/startup/customercare" },
  ];

  return (
    <nav className="w-full bg-white  px-8 py-3 flex items-center justify-between" style={{
        fontFamily:instrumentSans.style.fontFamily,
        fontWeight:600
    }}>
      {/* Logo + Brand */}
      <div className="flex items-center gap-2">
        <Image
          src="https://framerusercontent.com/images/KAm3suQ5rGv5sucbc1VcV7jT74.png?width=500&height=500" // replace with your logo path
          alt="EQvisor Logo"
          width={40}
          height={40}
        />
        <h1 className="text-lg font-semibold">EQvisor</h1>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-6 text-sm">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`hover:text-blue-500 ${
              pathname === item.href
                ? "text-blue-600 "
                : "text-black"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
