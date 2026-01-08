import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import StatCard from "../../components/StatCard";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await api.get("/api/admin/stats");
      setStats(res.data);
    })();
  }, []);

  if (!stats) return <div className="p-6 text-white/60">Loading analytics...</div>;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="text-white text-2xl font-semibold">Admin Analytics</h2>
      <p className="text-white/60 text-sm mt-1">Platform overview.</p>

      <div className="grid md:grid-cols-4 gap-4 mt-6">
        <StatCard label="Users" value={stats.users} />
        <StatCard label="Jobs" value={stats.jobs} />
        <StatCard label="Applications" value={stats.applications} />
        <StatCard label="Employers" value={stats.employers} />
      </div>
    </div>
  );
}
