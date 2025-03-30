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
    <div className="flex h-screen w-full overflow-hidden ">
      {/* Sidebar (fixed on mobile, always visible on large screens) */}
      <div
        className={`fixed lg:relative left-0 h-full pt-16 w-56 bg-gray-900 text-white shadow-lg transition-transform duration-300 z-50
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col flex-1 h-screen w-full pt-16">
        {/* Fixed Admin Header */}
        <AdminHeader toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

        {/* Main Content - No extra margin/padding */}
        <div className="flex-1 w-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
