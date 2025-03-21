import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="admin-container mt-48">
      {/* Main Content Area */}
      <div className="admin-content">
        <header className="admin-header">
          <h2>Admin Panel</h2>
        </header>
        <div className="admin-main">
          <Outlet /> {/* This will render nested routes inside Dashboard */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
