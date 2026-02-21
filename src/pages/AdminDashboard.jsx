import { useEffect, useState } from "react";
import api from "../services/api";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import Heatmap from "../components/Heatmap";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalResumes: 0,
    tailoredResumes: 0,
    careerPaths: 0,
  });

  const { logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error("FAILED TO FETCH ADMIN STATS", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          logout();
          navigate("/login");
        }
      }
    };
    fetchStats();
  }, [logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="p-6 space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition"
        >
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Total Users" value={stats.totalUsers} color="indigo" />
        <StatCard label="Total Resumes" value={stats.totalResumes} color="green" />
        <StatCard label="Tailored CVs" value={stats.tailoredResumes} color="yellow" />
        <StatCard label="Career Paths" value={stats.careerPaths} color="pink" />
      </div>

      {/* 🔥 ADMIN ACTIONS (REAL FEATURES) */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-semibold">Admin Actions</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ActionButton
            label="Review Resumes"
            onClick={() => navigate("/admin/resumes")}
          />
          <ActionButton
            label="Manage Career Pivots"
            onClick={() => navigate("/admin/career-pivots")}
          />
          <ActionButton
  label="Skill Gap Analytics"
  onClick={() => navigate("/admin/resumes?mode=skill-gap")}
/>

<ActionButton
  label="AI Resume Analytics"
  onClick={() => navigate("/admin/resumes?mode=analysis")}
/>
        </div>
      </div>

      {/* HEATMAP */}
      <Heatmap />

      {/* FOOTER NOTE */}
      <div className="bg-indigo-50 dark:bg-gray-800 p-4 rounded-lg border border-indigo-100 dark:border-gray-700">
        <p className="text-sm text-indigo-800 dark:text-indigo-300">
          <strong>Note:</strong> All analytics are generated dynamically from
          real resume and skill data stored in the platform.
        </p>
      </div>
    </div>
  );
}

/* ---------------- SMALL REUSABLE COMPONENTS ---------------- */

function StatCard({ label, value, color }) {
  return (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow border-l-8 border-${color}-500`}>
      <p className="text-xs text-gray-400 uppercase font-bold">{label}</p>
      <p className={`text-4xl font-black text-${color}-600`}>
        {value}
      </p>
    </div>
  );
}

function ActionButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded shadow text-sm font-medium"
    >
      {label}
    </button>
  );
}