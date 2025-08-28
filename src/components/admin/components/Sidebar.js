import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdWork,
  MdOutlinePostAdd,
  MdOutlineLogout,
} from "react-icons/md";
import { RiArticleLine, RiMessage3Line } from "react-icons/ri";
import { HiPlusCircle } from "react-icons/hi2";
import Theme from "../../styles/Theme";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <MdDashboard /> },
    { name: "Manage Projects", path: "/admin/projects", icon: <MdWork /> },
    { name: "Add Project", path: "/admin/add-project", icon: <HiPlusCircle /> },
    { name: "Manage Blogs", path: "/admin/blogs", icon: <RiArticleLine /> },
    { name: "Add Blog", path: "/admin/add-blog", icon: <MdOutlinePostAdd /> },
    { name: "Contact Messages", path: "/admin/contacts", icon: <RiMessage3Line /> },
  ];

  return (
    <div
      className="flex flex-col h-full min-h-screen relative z-20 shadow-lg"
      style={{ backgroundColor: Theme.colors.base, color: Theme.colors.text }}
    >
      {/* Sidebar Header */}
      <div
        className="flex items-center justify-center py-6 text-2xl font-bold border-b"
        style={{
          borderColor: Theme.colors.border,
          background: "linear-gradient(90deg,#06b6d4,#9333ea)",
          color: "#fff",
          boxShadow: Theme.shadows.glowPrimary,
        }}
      >
        ⚡ Admin Panel
      </div>

      {/* Navigation */}
      <ul className="flex-1 mt-6 space-y-2 px-3">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200
              ${
                location.pathname === item.path
                  ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-md"
                  : "hover:bg-gray-800 hover:text-cyan-300"
              }`}
              style={{ color: Theme.colors.subtle }}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 py-3 px-4 transition w-full border-t hover:bg-red-600 hover:text-white"
        style={{
          borderColor: Theme.colors.border,
          color: "#ef4444",
        }}
      >
        <MdOutlineLogout className="text-xl" /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
