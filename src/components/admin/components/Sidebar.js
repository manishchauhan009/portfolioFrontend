import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaPlus,
  FaEnvelope,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

const Sidebar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  return (
    <div className="flex flex-col h-full  min-h-screen relative z-20">
      {/* Sidebar Header with Close Button for mobile */}
      <div className="flex items-center justify-between p-6 text-xl font-semibold border-b border-gray-700 bg-gray-800 ">
        <span>Admin Panel</span>
        {/* Close button appears only on mobile */}
        {/* <button className="lg:hidden" onClick={toggleSidebar}>
          <FaTimes size={24} />
        </button> */}
      </div>

      {/* Navigation Links */}
      <ul className="flex-1 mt-4 space-y-3 px-3">
        <li>
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition"
          >
            <FaTachometerAlt /> Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/admin/projects"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition"
          >
            <FaProjectDiagram /> Manage Projects
          </Link>
        </li>
        <li>
          <Link
            to="/admin/add-project"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition"
          >
            <FaPlus /> Add Project
          </Link>
        </li>
       
        <li>
          <Link
            to="/admin/contacts"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition"
          >
            <FaEnvelope /> Contact Messages
          </Link>
        </li>
      </ul>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 py-3 px-4 text-red-500 hover:bg-red-600 hover:text-white transition w-full border-t border-gray-700"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
