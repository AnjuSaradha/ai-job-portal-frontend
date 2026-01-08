import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Jobs from "./pages/jobs/Jobs";
import JobDetails from "./pages/jobs/JobDetails";
import Apply from "./pages/jobs/Apply";

import ProtectedRoute from "./auth/ProtectedRoute";
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import PostJob from "./pages/employer/PostJob";
import ManageJobs from "./pages/employer/ManageJobs";

import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />

        <Route
          path="/jobs/:id/apply"
          element={
            <ProtectedRoute roles={["jobseeker"]}>
              <Apply />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/employer"
          element={
            <ProtectedRoute roles={["employer"]}>
              <EmployerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer/post"
          element={
            <ProtectedRoute roles={["employer"]}>
              <PostJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer/manage"
          element={
            <ProtectedRoute roles={["employer"]}>
              <ManageJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div className="p-6 text-white/60">Not found</div>} />
      </Routes>
    </div>
  );
}
