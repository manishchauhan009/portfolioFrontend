import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdWork,
  MdOutlinePostAdd,
  MdOutlineLogout,
} from "react-icons/md";
import { RiArticleLine, RiMessage3Line, RiFileUserLine } from "react-icons/ri";
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
    { name: "Projects", path: "/admin/projects", icon: <MdWork /> },
    { name: "Add Project", path: "/admin/add-project", icon: <HiPlusCircle /> },
    { name: "Blogs", path: "/admin/blogs", icon: <RiArticleLine /> },
    { name: "Add Blog", path: "/admin/add-blog", icon: <MdOutlinePostAdd /> },
    { name: "Messages", path: "/admin/contacts", icon: <RiMessage3Line /> },
    { name: "Resume", path: "/admin/resume", icon: <RiFileUserLine /> },
  ];

  return (
    <div
      className="flex flex-col h-full min-h-screen shadow-lg"
      style={{ backgroundColor: Theme.colors.base, color: Theme.colors.text }}
    >
      {/* Sidebar Header */}
      <div
        className="flex items-center justify-center py-6 text-2xl font-bold tracking-wide border-b"
        style={{
          borderColor: Theme.colors.border,
          background: "linear-gradient(90deg,#22d3ee,#a78bfa)",
          color: "#fff",
          boxShadow: Theme.shadows.glowPrimary,
        }}
      >
        ⚡ Admin Panel
      </div>

      {/* Navigation */}
      <ul className="flex-1 mt-6 px-3 space-y-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-xl font-medium transition-all duration-200
              ${
                location.pathname === item.path
                  ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-md"
                  : "hover:bg-[rgba(255,255,255,0.05)] hover:text-cyan-300"
              }`}
              style={{
                color:
                  location.pathname === item.path
                    ? "#fff"
                    : Theme.colors.subtle,
              }}
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
        className="flex items-center gap-3 py-3 px-4 transition-all duration-200 w-full border-t hover:bg-red-600 hover:text-white"
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
