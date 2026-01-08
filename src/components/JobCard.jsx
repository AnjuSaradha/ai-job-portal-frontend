import React from "react";
import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-white font-semibold text-lg">{job.title}</h3>
          <p className="text-white/60 text-sm">{job.company} • {job.location}</p>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-orange-500/15 text-orange-300 border border-orange-500/20">
          {job.type || "Full-time"}
        </span>
      </div>

      <p className="text-white/70 text-sm mt-3 line-clamp-3">{job.description}</p>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-white/60 text-xs">{job.salaryRange || "Salary: Negotiable"}</div>
        <Link
          to={`/jobs/${job._id}`}
          className="text-sm px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white"
        >
          View
        </Link>
      </div>
    </div>
  );
}
