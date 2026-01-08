import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm transition ${
      isActive ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/5"
    }`;

  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold text-white">
          JobPortal<span className="text-orange-400">AI</span>
        </Link>

        <div className="flex items-center gap-2">
          <NavLink to="/jobs" className={linkClass}>Jobs</NavLink>

          {user?.role === "employer" && (
            <NavLink to="/employer" className={linkClass}>Employer</NavLink>
          )}
          {user?.role === "admin" && (
            <NavLink to="/admin" className={linkClass}>Admin</NavLink>
          )}

          {!user ? (
            <>
              <NavLink to="/login" className={linkClass}>Login</NavLink>
              <NavLink to="/register" className={linkClass}>Register</NavLink>
            </>
          ) : (
            <button
              onClick={logout}
              className="px-3 py-2 rounded-lg text-sm bg-orange-500/90 hover:bg-orange-500 text-white transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
