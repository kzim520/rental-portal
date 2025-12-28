"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: "/apply", label: "Apply" },
    { href: "/applications", label: "Admin" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-blue-400 border-b-2 border-yellow-500 shadow-md">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Brand */}
        <Link
          href="/"
          className="text-xl font-semibold text-yellow-500 hover:text-blue-800 transition-colors"
        >
          Tenth Street Rentals
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          {navItems.map(({ href, label }) => {
            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={`transition-colors ${
                  isActive
                    ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1"
                    : "text-yellow-500 hover:text-blue-700"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded hover:bg-gray-100 transition text-yellow-500"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            // ✖ Close Icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // ☰ Hamburger Icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-sm animate-slide-down">
          <div className="flex flex-col p-4 space-y-2 text-sm font-medium">
            {navItems.map(({ href, label }) => {
              const isActive =
                pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)} // close menu on click
                  className={`block py-2 px-2 rounded transition-colors ${
                    isActive
                      ? "text-blue-700 font-semibold bg-blue-50"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
