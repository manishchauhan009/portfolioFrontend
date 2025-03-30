// src/admin/components/AdminHeader.js
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ toggleSidebar, sidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  return (
    <header className="fixed top-0 left-0 w-full h-[70px] bg-gray-900 text-white flex items-center justify-between px-6 shadow-lg z-50">
      {/* Hamburger Icon for mobile */}
      <button
        id="hamburger"
        className="lg:hidden text-white p-2 rounded-md"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X size={32} /> : <Menu size={32} />}
      </button>

     

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
      >
        <FaSignOutAlt /> Logout
      </button>
    </header>
  );
};

export default AdminHeader;
