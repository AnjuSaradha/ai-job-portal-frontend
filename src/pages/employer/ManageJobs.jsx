import React, { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await api.get("/api/jobs/mine");
    setJobs(res.data.jobs);
    setLoading(false);
  }

  async function remove(id) {
    await api.delete(`/api/jobs/${id}`);
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="text-white text-2xl font-semibold">Manage Jobs</h2>
      <p className="text-white/60 text-sm mt-1">Your posted jobs.</p>

      {loading ? (
        <div className="text-white/60 mt-6">Loading...</div>
      ) : (
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {jobs.map((j) => (
            <div key={j._id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-white font-semibold">{j.title}</div>
              <div className="text-white/60 text-sm">{j.company} • {j.location}</div>
              <div className="mt-3 flex gap-2">
                <button onClick={() => remove(j._id)} className="px-3 py-2 rounded-xl bg-red-500/15 text-red-300 border border-red-500/20 hover:bg-red-500/20">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
