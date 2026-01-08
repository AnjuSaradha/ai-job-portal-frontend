import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function Apply() {
  const { id } = useParams();
  const nav = useNavigate();
  const [resume, setResume] = useState(null);
  const [cover, setCover] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr(""); setMsg("");

    if (!resume) return setErr("Please upload your resume (PDF).");

    const fd = new FormData();
    fd.append("resume", resume);
    fd.append("coverLetter", cover);

    try {
      const res = await api.post(`/api/applications/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMsg(`Applied! AI Score: ${res.data.aiScore}/100 (${res.data.aiLabel})`);
      setTimeout(() => nav("/jobs"), 1500);
    } catch (e) {
      setErr(e?.response?.data?.message || "Apply failed");
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-white text-2xl font-semibold">Apply</h2>
        <p className="text-white/60 text-sm mt-1">Upload resume and get AI score.</p>

        {err && <div className="mt-4 text-sm text-red-300 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">{err}</div>}
        {msg && <div className="mt-4 text-sm text-green-300 bg-green-500/10 border border-green-500/20 p-3 rounded-xl">{msg}</div>}

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="text-white/70 text-sm">Resume (PDF)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setResume(e.target.files?.[0] || null)}
              className="mt-2 block w-full text-white/70"
            />
          </div>

          <div>
            <label className="text-white/70 text-sm">Cover letter (optional)</label>
            <textarea
              value={cover}
              onChange={(e) => setCover(e.target.value)}
              rows={6}
              className="mt-1 w-full rounded-xl bg-slate-950/60 border border-white/10 px-3 py-2 text-white outline-none focus:border-orange-400"
              placeholder="Write a short cover message..."
            />
          </div>

          <button className="w-full rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-medium py-2">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
