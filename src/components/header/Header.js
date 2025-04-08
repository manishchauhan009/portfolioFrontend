import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import AdminHeader from "../admin/components/AdminHeader"; // Make sure this is correct!

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

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-[80px] bg-gradient-to-r from-yellow-500 to-yellow-400 text-white z-50 shadow-lg flex items-center">
        <div className="flex justify-between items-center w-full px-10">
          <Link to="/" className="text-2xl font-extrabold tracking-wide">
            Portfolio
          </Link>

          <div className="lg:hidden cursor-pointer" onClick={() => setMenuOpen((prev) => !prev)}>
            {menuOpen ? <X size={36} /> : <Menu size={36} />}
          </div>

          <nav className="hidden lg:flex gap-10">
            <Link to="/" className="text-lg font-medium hover:text-black">Home</Link>
            <Link to="/about" className="text-lg font-medium hover:text-black">About</Link>
            <Link to="/myjourney" className="text-lg font-medium hover:text-black">My Journey</Link>
            <Link to="/skills" className="text-lg font-medium hover:text-black">Skills</Link>
            <Link to="/projects" className="text-lg font-medium hover:text-black">Projects</Link>
            <Link to="/contact" className="text-lg font-medium hover:text-black">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Mobile Navbar */}
      {menuOpen && (
        <div className="lg:hidden fixed top-0 right-0 h-screen w-3/4 bg-yellow-500 bg-opacity-95 shadow-lg p-6 z-30">
          <div className="flex justify-end">
            <X size={36} className="cursor-pointer" onClick={() => setMenuOpen(false)} />
          </div>
          <nav className="mt-10 flex flex-col space-y-6">
            <Link to="/" className="text-lg font-medium text-white hover:text-gray-300">Home</Link>
            <Link to="/about" className="text-lg font-medium text-white hover:text-gray-300">About</Link>
            <Link to="/myjourney" className="text-lg font-medium text-white hover:text-gray-300">My Journey</Link>
            <Link to="/skills" className="text-lg font-medium text-white hover:text-gray-300">Skills</Link>
            <Link to="/projects" className="text-lg font-medium text-white hover:text-gray-300">Projects</Link>
            <Link to="/contact" className="text-lg font-medium text-white hover:text-gray-300">Contact</Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default HeaderPage;
