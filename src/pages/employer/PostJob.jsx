import React, { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function PostJob() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    title: "", company: "", location: "", type: "Full-time", salaryRange: "", description: ""
  });
  const [err, setErr] = useState("");

  function set(k, v) { setForm((p) => ({ ...p, [k]: v })); }

  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      await api.post("/api/jobs", form);
      nav("/employer/manage");
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to post job");
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-white text-2xl font-semibold">Post a Job</h2>
        {err && <div className="mt-4 text-sm text-red-300 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">{err}</div>}

        <form onSubmit={submit} className="mt-6 grid md:grid-cols-2 gap-4">
          <input className="rounded-xl bg-slate-950/60 border border-white/10 px-3 py-2 text-white"
            placeholder="Title" value={form.title} onChange={(e) => set("title", e.target.value)} />
          <input className="rounded-xl bg-slate-950/60 border border-white/10 px-3 py-2 text-white"
            placeholder="Company" value={form.company} onChange={(e) => set("company", e.target.value)} />
          <input className="rounded-xl bg-slate-950/60 border border-white/10 px-3 py-2 text-white"
            placeholder="Location" value={form.location} onChange={(e) => set("location", e.target.value)} />
          <select className="rounded-xl bg-slate-950/60 border border-white/10 px-3 py-2 text-white"
            value={form.type} onChange={(e) => set("type", e.target.value)}>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
          <input className="md:col-span-2 rounded-xl bg-slate-950/60 border border-white/10 px-3 py-2 text-white"
            placeholder="Salary range (optional)" value={form.salaryRange} onChange={(e) => set("salaryRange", e.target.value)} />
          <textarea className="md:col-span-2 rounded-xl bg-slate-950/60 border border-white/10 px-3 py-2 text-white"
            rows={8} placeholder="Job description"
            value={form.description} onChange={(e) => set("description", e.target.value)} />
          <button className="md:col-span-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-medium py-2">
            Create Job
          </button>
        </form>
      </div>
    </div>
  );
}
