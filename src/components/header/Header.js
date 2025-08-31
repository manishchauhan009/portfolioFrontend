// src/components/HeaderPage.js
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import AdminHeader from "../admin/components/AdminHeader";
import Theme from "../styles/Theme";

const HeaderPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isAdmin = /^\/admin\/.+/.test(location.pathname);

  if (isAdmin) {
    return <AdminHeader />;
  }

  // Reusable nav link style
  const navLinkClass = `
    relative text-base font-medium text-[${Theme.colors.text}] 
    hover:text-[${Theme.colors.primary}] transition duration-300
    after:content-[''] after:absolute after:left-0 after:bottom-[-6px]
    after:h-[2px] after:w-0 after:bg-[${Theme.colors.primary}]
    hover:after:w-full after:transition-all after:duration-300
  `;

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/myjourney", label: "My Journey" },
    { to: "/skills", label: "Skills" },
    { to: "/projects", label: "Projects" },
    { to: "/blogs", label: "Blogs" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header
        className="fixed top-0 left-0 w-full h-[80px] z-50 shadow-md flex items-center"
        style={{
          background: Theme.colors.surface,
          borderBottom: `1px solid ${Theme.colors.border}`,
        }}
      >
        <div className="flex justify-between items-center w-full px-6 sm:px-12">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide flex items-center gap-2"
          >
            {/* <img
              src="/images/logo.png"
              alt="Manish Chauhan Logo"
              className="h-12 w-auto"
            /> */}
            <span style={{ color: Theme.colors.primary }}>Manish Chauhan</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-8">
            {navLinks.map((link, i) => (
              <Link key={i} to={link.to} className={navLinkClass}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Icon */}
          <div
            className="lg:hidden cursor-pointer transition"
            style={{ color: Theme.colors.text }}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={34} /> : <Menu size={34} />}
          </div>
        </div>
      </header>

      {/* Mobile Navbar */}
      {menuOpen && (
        <div
          className="lg:hidden fixed top-0 right-0 h-screen w-3/4 max-w-xs px-6 py-8 shadow-2xl z-50 transition-transform duration-500 ease-in-out"
          style={{
            background: Theme.colors.surface,
            borderLeft: `1px solid ${Theme.colors.border}`,
          }}
        >
          <div className="flex justify-end">
            <X
              size={34}
              className="cursor-pointer hover:rotate-90 transition duration-300"
              style={{ color: Theme.colors.primary }}
              onClick={() => setMenuOpen(false)}
            />
          </div>

          <nav className="mt-12 flex flex-col gap-6 text-lg font-semibold">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="transition-transform hover:scale-105 duration-200"
                style={{ color: Theme.colors.text }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default HeaderPage;
