import React from "react";
import { Link } from "react-router-dom";

export default function EmployerDashboard() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-white text-2xl font-semibold">Employer Dashboard</h2>
        <p className="text-white/60 text-sm mt-1">Post and manage your jobs.</p>

        <div className="mt-6 flex gap-3">
          <Link to="/employer/post" className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-medium">
            Post a Job
          </Link>
          <Link to="/employer/manage" className="px-4 py-2 rounded-xl border border-white/15 text-white hover:bg-white/5">
            Manage Jobs
          </Link>
        </div>
      </div>
    </div>
  );
}
