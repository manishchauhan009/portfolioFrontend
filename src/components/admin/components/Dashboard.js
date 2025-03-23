import { Outlet } from "react-router-dom";
import { FaProjectDiagram, FaEnvelope, FaUsers } from "react-icons/fa";

const Dashboard = () => {
  // Static data (Replace with API calls later)
  const totalProjects = 12;
  const totalMessages = 58;
  const totalUsers = 342;

  return (
    <div className="admin-container min-h-screen bg-gray-900 text-white pt-24 sm:px-12 lg:px-20">
      {/* Header */}
      <header className="admin-header flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center gap-4">
          <FaProjectDiagram className="text-yellow-400 text-4xl" />
          <div>
            <h3 className="text-xl font-semibold">Total Projects</h3>
            <p className="text-3xl font-bold">{totalProjects}</p>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center gap-4">
          <FaEnvelope className="text-yellow-400 text-4xl" />
          <div>
            <h3 className="text-xl font-semibold">Total Messages</h3>
            <p className="text-3xl font-bold">{totalMessages}</p>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center gap-4">
          <FaUsers className="text-yellow-400 text-4xl" />
          <div>
            <h3 className="text-xl font-semibold">Total Users</h3>
            <p className="text-3xl font-bold">{totalUsers}</p>
          </div>
        </div>
      </div>

      {/* <div className="admin-main bg-gray-800 p-6 rounded-lg shadow-lg">
        <Outlet /> 
      </div> */}
    </div>
  );
};

export default Dashboard;
