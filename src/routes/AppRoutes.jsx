import { Routes, Route, Navigate } from "react-router-dom";

import UserDashboard from "../pages/UserDashboard";
import ResumeAnalysis from "../pages/ResumeAnalysis";
import SkillGap from "../pages/SkillGap";
import Jobs from "../pages/Jobs";
import TailoredResumes from "../pages/TailoredResumes";
import TailoredResumeView from "../pages/TailoredResumeView";
import VoiceChat from "../pages/VoiceChat";            // ✅ ADD

import AdminDashboard from "../pages/AdminDashboard";
import AdminResumeView from "../pages/AdminResumeView";
import AdminResumeAnalysis from "../pages/AdminResumeAnalysis";
import AdminSkillGap from "../pages/AdminSkillGap";
import AdminUserView from "../pages/AdminUserView";
import CareerVault from "../pages/CareerVault";
import AdminCareerPivots from "../pages/AdminCareerPivots";
import AdminVoiceMessage  from "../pages/AdminVoiceMessages"; // ✅ ADD

import UserLogin from "../pages/UserLogin";
import AdminLogin from "../pages/AdminLogin";
import Signup from "../pages/Signup";

import useAuthStore from "../store/authStore";

export default function AppRoutes() {
  const { user } = useAuthStore();
  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/" /> : <UserLogin />}
      />
      <Route
        path="/signup"
        element={isLoggedIn ? <Navigate to="/" /> : <Signup />}
      />
      <Route
        path="/admin/login"
        element={isAdmin ? <Navigate to="/admin" /> : <AdminLogin />}
      />

      {/* ================= USER ================= */}
      <Route
        path="/"
        element={isLoggedIn ? <UserDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/analysis"
        element={isLoggedIn ? <ResumeAnalysis /> : <Navigate to="/login" />}
      />
      <Route
        path="/skill-gap"
        element={isLoggedIn ? <SkillGap /> : <Navigate to="/login" />}
      />
      <Route
        path="/jobs"
        element={isLoggedIn ? <Jobs /> : <Navigate to="/login" />}
      />
      <Route
        path="/tailored-resumes"
        element={isLoggedIn ? <TailoredResumes /> : <Navigate to="/login" />}
      />
      <Route
        path="/tailored-resumes/:id"
        element={isLoggedIn ? <TailoredResumeView /> : <Navigate to="/login" />}
      />

      {/* 🎙 USER VOICE CHAT */}
      <Route
        path="/voice-chat"
        element={isLoggedIn ? <VoiceChat /> : <Navigate to="/login" />}
      />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" />}
      />
      <Route
        path="/admin/resumes"
        element={isAdmin ? <AdminResumeView /> : <Navigate to="/admin/login" />}
      />
      <Route
        path="/admin/resumes/:resumeId/analysis"
        element={isAdmin ? <AdminResumeAnalysis /> : <Navigate to="/admin/login" />}
      />
      <Route
        path="/admin/resumes/:resumeId/skill-gap"
        element={isAdmin ? <AdminSkillGap /> : <Navigate to="/admin/login" />}
      />
      <Route
        path="/admin/users"
        element={isAdmin ? <AdminUserView /> : <Navigate to="/admin/login" />}
      />
      <Route
        path="/admin/vault"
        element={isAdmin ? <CareerVault /> : <Navigate to="/admin/login" />}
      />
      <Route
        path="/admin/career-pivots"
        element={isAdmin ? <AdminCareerPivots /> : <Navigate to="/admin/login" />}
      />

      {/* 🎙 ADMIN VOICE MESSAGES */}
      <Route
        path="/admin/voice-messages"
        element={isAdmin ? <AdminVoiceMessage /> : <Navigate to="/admin/login" />}
      />

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}