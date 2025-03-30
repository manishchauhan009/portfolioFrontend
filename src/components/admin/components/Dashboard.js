import { Outlet } from "react-router-dom";
import { FaProjectDiagram, FaEnvelope, FaUsers } from "react-icons/fa";

const Dashboard = () => {
  // Static data (Replace with API calls later)
  const totalProjects = 6;
  const totalMessages = 15;

  return (
    <div className="admin-container min-h-screen bg-gray-900 text-white pt-8 sm:px-8 lg:px-16">
      {/* Header */}
      <header className="admin-header flex justify-center sm:justify-between items-center mb-6 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold w-full text-center sm:text-left">
          Admin Dashboard
        </h2>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 w-full">
        {/* Total Projects */}
        <div className="bg-gray-800 p-5 sm:p-6 rounded-xl shadow-md flex items-center gap-4 w-full transition-transform transform hover:scale-105">
          <FaProjectDiagram className="text-yellow-400 text-3xl sm:text-4xl" />
          <div>
            <h3 className="text-lg sm:text-xl font-semibold">Total Projects</h3>
            <p className="text-2xl sm:text-3xl font-bold">{totalProjects}</p>
          </div>
        </div>

        {/* Total Messages */}
        <div className="bg-gray-800 p-5 sm:p-6 rounded-xl shadow-md flex items-center gap-4 w-full transition-transform transform hover:scale-105">
          <FaEnvelope className="text-yellow-400 text-3xl sm:text-4xl" />
          <div>
            <h3 className="text-lg sm:text-xl font-semibold">Total Messages</h3>
            <p className="text-2xl sm:text-3xl font-bold">{totalMessages}</p>
          </div>
        </div>

      
      </div>

      {/* Admin Content Area */}
      <div className="admin-main bg-gray-800 p-5 sm:p-6 rounded-xl shadow-md w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
