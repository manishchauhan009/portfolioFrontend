import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaPlus,
  FaEnvelope,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when clicking outside (for mobile)
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && !e.target.closest(".sidebar") && !e.target.closest(".hamburger-btn")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/admin"); // Redirect to login
  };

  return (
    <>
      {/* 🍔 Hamburger Button (Mobile Only) */}
      <button
        className="hamburger-btn md:hidden fixed top-5 left-5 z-50 text-white bg-gray-900 p-3 rounded-md shadow-lg transition-all hover:bg-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* 🏠 Sidebar */}
      <nav
        className={`sidebar fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}
      >
        {/* 🔷 Admin Panel Header */}
        <div className="p-6 text-xl font-semibold border-b border-gray-700 text-center bg-gray-800">
          Admin Panel
        </div>

        {/* 🔗 Navigation Links */}
        <ul className="flex-1 mt-4 space-y-3 px-3">
          <li>
            <Link to="/admin/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition">
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/projects" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition">
              <FaProjectDiagram /> Manage Projects
            </Link>
          </li>
          <li>
            <Link to="/admin/add-project" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition">
              <FaPlus /> Add Project
            </Link>
          </li>
          <li>
            <Link to="/admin/contacts" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition">
              <FaEnvelope /> Contact Messages
            </Link>
          </li>
        </ul>

        {/* 🚪 Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 py-3 px-4 text-red-500 hover:bg-red-600 hover:text-white transition w-full border-t border-gray-700"
        >
          <FaSignOutAlt /> Logout
        </button>
      </nav>

      {/* 🔲 Overlay (Mobile Only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
