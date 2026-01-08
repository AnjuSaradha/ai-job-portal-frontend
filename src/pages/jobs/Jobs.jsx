import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import JobCard from "../../components/JobCard";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await api.get("/api/jobs", { params: { q } });
    setJobs(res.data.jobs);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div>
          <h2 className="text-white text-2xl font-semibold">Jobs</h2>
          <p className="text-white/60 text-sm">Search and apply with AI scoring.</p>
        </div>

        <div className="flex gap-2">
          <input
            className="w-full md:w-80 rounded-xl bg-slate-950/60 border border-white/10 px-3 py-2 text-white outline-none focus:border-orange-400"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search title, company, location..."
          />
          <button onClick={load} className="rounded-xl bg-white/10 hover:bg-white/15 text-white px-4">
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-white/60 mt-6">Loading jobs...</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {jobs.map((j) => <JobCard key={j._id} job={j} />)}
        </div>
      )}
    </div>
  );
}
