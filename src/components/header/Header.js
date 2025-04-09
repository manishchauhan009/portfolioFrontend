import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import AdminHeader from "../admin/components/AdminHeader";

const HeaderPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isAdmin = /^\/admin\/.+/.test(location.pathname);

  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  }, [location.pathname]);

  if (isAdmin) {
    return <AdminHeader />;
  }

  // Reusable nav link style
  const navLinkClass =
    "relative text-lg font-medium text-white hover:text-yellow-900 transition duration-300";

  const navUnderline = `
    after:content-['']
    after:absolute
    after:left-0
    after:bottom-[-6px]
    after:h-[2px]
    after:w-0
    after:bg-white
    hover:after:w-full
    after:transition-all
    after:duration-300
  `;

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-[80px] bg-yellow-500/70 backdrop-blur-sm text-white z-50 shadow-xl flex items-center">
        <div className="flex justify-between items-center w-full px-6 sm:px-10">
          <Link to="/" className="text-2xl font-extrabold tracking-wide text-white hover:text-yellow-900 transition">
            <img src="/images/logo.png" alt="Manish Chauhan Logo" className="h-36 w-auto" />
          </Link>


          <div
            className="lg:hidden cursor-pointer text-white hover:text-yellow-900 transition"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={34} /> : <Menu size={34} />}
          </div>

          <nav className="hidden lg:flex gap-8">
            <Link to="/" className={`${navLinkClass} ${navUnderline}`}>Home</Link>
            <Link to="/about" className={`${navLinkClass} ${navUnderline}`}>About</Link>
            <Link to="/myjourney" className={`${navLinkClass} ${navUnderline}`}>My Journey</Link>
            <Link to="/skills" className={`${navLinkClass} ${navUnderline}`}>Skills</Link>
            <Link to="/projects" className={`${navLinkClass} ${navUnderline}`}>Projects</Link>
            <Link to="/contact" className={`${navLinkClass} ${navUnderline}`}>Contact</Link>
          </nav>
        </div>
      </header>

      {/* Mobile Navbar */}
      {menuOpen && (
        <div className="lg:hidden fixed top-0 right-0 h-screen w-3/4 max-w-xs bg-yellow-400/90 backdrop-blur-xl shadow-2xl z-50 transition-transform duration-500 ease-in-out animate-slide-in px-6 py-8">
          <div className="flex justify-end">
            <X
              size={34}
              className="cursor-pointer text-white hover:rotate-90 transition duration-300"
              onClick={() => setMenuOpen(false)}
            />
          </div>

          <nav className="mt-12 flex flex-col gap-6 text-white text-lg font-semibold">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/myjourney", label: "My Journey" },
              { to: "/skills", label: "Skills" },
              { to: "/projects", label: "Projects" },
              { to: "/contact", label: "Contact" },
            ].map((link, i) => (
              <Link
                key={i}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="hover:text-yellow-900 transition-transform hover:scale-105 transform duration-200"
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
