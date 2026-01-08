import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      nav("/jobs");
    } catch (e) {
      setErr(e?.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-white text-2xl font-semibold">Login</h2>
        <p className="text-white/60 text-sm mt-1">Access your dashboard.</p>

        {err && <div className="mt-4 text-sm text-red-300 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">{err}</div>}

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-white/70 text-sm">Email</label>
            <input
              className="mt-1 w-full rounded-xl bg-slate-950/60 border border-white/10 px-3 py-2 text-white outline-none focus:border-orange-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="text-white/70 text-sm">Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-xl bg-slate-950/60 border border-white/10 px-3 py-2 text-white outline-none focus:border-orange-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button className="w-full rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-medium py-2">
            Login
          </button>
        </form>

        <p className="text-white/60 text-sm mt-4">
          New here? <Link className="text-orange-300 hover:underline" to="/register">Create account</Link>
        </p>
      </div>
    </div>
  );
}
