import { useEffect, useState } from "react";
import { FaProjectDiagram, FaEnvelope } from "react-icons/fa";
import axios from "axios";

const Dashboard = () => {
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalMessages, setTotalMessages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, messagesRes] = await Promise.all([
          axios.get(`${backendURL}/api/projects/count`),
          axios.get(`${backendURL}/api/contacts/count`)
        ]);
        setTotalProjects(projectsRes.data.count || 0);
        setTotalMessages(messagesRes.data.count || 0);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [backendURL]);

  if (loading) return <p className="text-gray-400 p-6 text-center">Loading dashboard...</p>;
  if (error) return <p className="text-red-500 p-6 text-center">{error}</p>;

  return (
    <div className="admin-container min-h-screen bg-gray-900 text-white pt-8 px-4 sm:px-6 lg:px-16">
      {/* Header */}
      <header className="admin-header flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
          Admin Dashboard
        </h2>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Total Projects */}
        <div className="bg-gray-800 p-5 rounded-xl shadow-lg flex items-center gap-4 transition-transform hover:scale-[1.03]">
          <FaProjectDiagram className="text-yellow-400 text-3xl sm:text-4xl flex-shrink-0" />
          <div className="flex flex-col">
            <h3 className="text-base sm:text-lg font-medium">Total Projects</h3>
            <p className="text-xl sm:text-2xl font-bold">{totalProjects}</p>
          </div>
        </div>

        {/* Total Messages */}
        <div className="bg-gray-800 p-5 rounded-xl shadow-lg flex items-center gap-4 transition-transform hover:scale-[1.03]">
          <FaEnvelope className="text-yellow-400 text-3xl sm:text-4xl flex-shrink-0" />
          <div className="flex flex-col">
            <h3 className="text-base sm:text-lg font-medium">Total Messages</h3>
            <p className="text-xl sm:text-2xl font-bold">{totalMessages}</p>
          </div>
        </div>
      </div>

      {/* Placeholder for additional content */}
      {/* <div className="admin-main bg-gray-850 p-6 rounded-xl shadow-xl border border-gray-700 w-full">
        <Outlet />
      </div> */}
    </div>
  );
};

export default Dashboard;
