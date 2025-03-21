import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-white z-50 shadow-lg" id="header">
        <div className="flex justify-between items-center px-10 py-5">
          <Link to="/" className="text-2xl font-extrabold tracking-wide">
            Portfolio
          </Link>

          {/* Mobile Menu Button */}
          <div className="lg:hidden cursor-pointer transition-transform duration-300" onClick={toggleMenu}>
            {menuOpen ? <X size={36} className="hover:rotate-180 transition-transform duration-300" /> : <Menu size={36} />}
          </div>

          {/* Desktop Navbar */}
          <nav className="hidden lg:flex gap-10">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Project", path: "/project" },
              { name: "Contact", path: "/contact" },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="text-lg font-medium relative hover:text-black transition-colors"
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-0 h-1 bg-white transition-all duration-300 hover:w-full"></span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Navbar */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-screen bg-yellow-500 bg-opacity-90 w-3/4 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } shadow-lg p-6 z-30`}
      >
        <div className="flex justify-end">
          <X size={36} className="cursor-pointer" onClick={toggleMenu} />
        </div>

        <nav className="mt-10 flex flex-col space-y-6">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Project", path: "/project" },
            { name: "Contact", path: "/contact" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="text-lg font-medium text-white hover:text-gray-300 transition-colors"
              onClick={toggleMenu} // Close menu after clicking a link
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

export default Header;
