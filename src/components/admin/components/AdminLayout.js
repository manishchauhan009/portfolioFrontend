import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen mt-[-0.6rem]">
      {/* Fixed Admin Header */}
      <AdminHeader toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

      {/* Main Content Area: using margin-top to offset header */}
      <div className="flex flex-1 ">
        {/* Sidebar (slides in on mobile, fixed on desktop) */}
        <div
          id="sidebar"
          className={`fixed lg:relative  left-0 h-full w-56 bg-gray-900 text-white shadow-lg transition-transform duration-300 z-20
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        >
          <Sidebar toggleSidebar={toggleSidebar} />
        </div>

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-56" : "ml-0 lg:ml-56"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
