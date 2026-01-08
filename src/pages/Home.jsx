import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            AI-Powered <span className="text-orange-400">Job Portal</span>
          </h1>
          <p className="text-white/70 mt-4">
            MERN + Tailwind portal with role-based access, resume upload, AI scoring, job matching and admin analytics.
          </p>

          <div className="mt-6 flex gap-3">
            <Link to="/jobs" className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-black font-medium">
              Browse Jobs
            </Link>

            {!user && (
              <Link to="/register" className="px-4 py-2 rounded-lg border border-white/15 text-white hover:bg-white/5">
                Create Account
              </Link>
            )}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white/70 text-sm">
              ✅ Resume upload + scoring
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white/70 text-sm">
              ✅ Employer job posting
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white/70 text-sm">
              ✅ Admin analytics
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white/70 text-sm">
              ✅ Email notifications
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6">
          <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6">
            <div className="text-white/60 text-sm">Mobile preview (placeholder)</div>
            <div className="mt-4 mx-auto w-[300px] h-[560px] rounded-[32px] border border-white/10 bg-slate-900/50 p-4">
              <div className="rounded-2xl bg-white/5 p-4 text-white">
                <div className="text-sm text-white/60">Welcome</div>
                <div className="text-lg font-semibold mt-1">Find your next job</div>
                <div className="mt-3 space-y-2">
                  <div className="h-14 rounded-xl bg-white/5" />
                  <div className="h-14 rounded-xl bg-white/5" />
                  <div className="h-14 rounded-xl bg-white/5" />
                </div>
              </div>
              <div className="mt-4 h-16 rounded-2xl bg-white/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
