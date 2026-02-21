import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  if (!user) return null;

  const isAdmin = user.role === "admin";

  /* ================= USER NAV ================= */
  const userNavItems = [
    { path: "/", label: "My Dashboard", icon: "🏠" },
    { path: "/analysis", label: "Resume Analysis", icon: "📊" },
    { path: "/skill-gap", label: "Skill Gap", icon: "🎯" },
    { path: "/jobs", label: "Job Matches", icon: "💼" },
    { path: "/tailored-resumes", label: "Tailored Resumes", icon: "📝" },
    { path: "/voice-chat", label: "Voice Chat", icon: "🎤" },
  ];

  /* ================= ADMIN NAV ================= */
  const adminNavItems = [
    { path: "/admin", label: "Admin Dashboard", icon: "📈" },
    { path: "/admin/resumes", label: "Review Resumes", icon: "📄" },
    { path: "/admin/career-pivots", label: "Career Pivots", icon: "🔁" },
    { path: "/admin/users", label: "Manage Users", icon: "👥" },
    { path: "/admin/voice-messages", label: "Voice Messages", icon: "🎙️" },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <div className="w-64 bg-white dark:bg-gray-900 h-screen shadow-2xl flex flex-col">
      {/* PROFILE */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">
            {isAdmin ? "A" : user.username?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800 dark:text-white truncate w-32">
              {isAdmin ? "ADMIN" : user.username}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
              {isAdmin ? "Administrator" : "User"}
            </p>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
              ${
                location.pathname === item.path
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-600"
              }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-semibold text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={logout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold text-sm transition-all"
        >
          <span>🚪</span>
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}