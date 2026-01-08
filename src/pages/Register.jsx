import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "jobseeker" });
  const [err, setErr] = useState("");

  function set(k, v) { setForm((p) => ({ ...p, [k]: v })); }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      await register(form);
      nav("/jobs");
    } catch (e) {
      setErr(e?.response?.data?.message || "Register failed");
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-white text-2xl font-semibold">Create account</h2>
        <p className="text-white/60 text-sm mt-1">Choose your role.</p>

        {err && <div className="mt-4 text-sm text-red-300 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">{err}</div>}

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-white/70 text-sm">Name</label>
            <input
              className="mt-1 w-full rounded-xl bg-slate-950/60 border border-white/10 px-3 py-2 text-white outline-none focus:border-orange-400"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-white/70 text-sm">Email</label>
            <input
              className="mt-1 w-full rounded-xl bg-slate-950/60 border border-white/10 px-3 py-2 text-white outline-none focus:border-orange-400"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="text-white/70 text-sm">Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-xl bg-slate-950/60 border border-white/10 px-3 py-2 text-white outline-none focus:border-orange-400"
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
              placeholder="min 6 chars"
            />
          </div>
          <div>
            <label className="text-white/70 text-sm">Role</label>
            <select
              className="mt-1 w-full rounded-xl bg-slate-950/60 border border-white/10 px-3 py-2 text-white outline-none focus:border-orange-400"
              value={form.role}
              onChange={(e) => set("role", e.target.value)}
            >
              <option value="jobseeker">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>
            <p className="text-white/50 text-xs mt-1">Admin account will be created from DB manually for safety.</p>
          </div>

          <button className="w-full rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-medium py-2">
            Register
          </button>
        </form>

        <p className="text-white/60 text-sm mt-4">
          Already have an account? <Link className="text-orange-300 hover:underline" to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
