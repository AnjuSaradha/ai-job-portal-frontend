import React from "react";

export default function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-white/60 text-sm">{label}</div>
      <div className="text-white text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}
