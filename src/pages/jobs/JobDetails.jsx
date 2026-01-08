import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../auth/AuthContext";

export default function JobDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await api.get(`/api/jobs/${id}`);
      setJob(res.data.job);
    })();
  }, [id]);

  if (!job) return <div className="p-6 text-white/60">Loading...</div>;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-white text-2xl font-semibold">{job.title}</h2>
            <p className="text-white/60">{job.company} • {job.location}</p>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-orange-500/15 text-orange-300 border border-orange-500/20">
            {job.type || "Full-time"}
          </span>
        </div>

        <div className="mt-4 text-white/80 whitespace-pre-wrap">{job.description}</div>

        <div className="mt-6 flex gap-3">
          {user?.role === "jobseeker" ? (
            <Link to={`/jobs/${id}/apply`} className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-medium">
              Apply + AI Score
            </Link>
          ) : (
            <div className="text-white/60 text-sm">
              Login as Job Seeker to apply.
            </div>
          )}

          <Link to="/jobs" className="px-4 py-2 rounded-xl border border-white/15 text-white hover:bg-white/5">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
