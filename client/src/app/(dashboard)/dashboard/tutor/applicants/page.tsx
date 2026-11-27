"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import Link from "next/link";

export default function ApplicantsPage() {
  const { data: session, isPending } = useSession();
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPending || !session) return;
    apiFetch("/api/applications/tutor-applications")
      .then((res) => setData(res.data || []))
      .catch((err) => setError(err.message));
  }, [session, isPending]);

  if (isPending) return <p className="container-custom py-20">Loading...</p>;
  if (!session) return <p className="container-custom py-20"><Link href="/sign-in">Sign in</Link></p>;

  return (
    <main className="container-custom section-padding min-h-screen">
      <h1 className="mb-6 text-3xl font-bold">Applicants</h1>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      {!error && data.length === 0 && <p className="rounded-xl border p-8 text-center">No applicants found.</p>}
      <div className="grid gap-4">
        {data.map((item) => (
          <article key={item._id} className="rounded-xl border bg-white p-5">
            <h2 className="text-xl font-semibold">{item.tuition?.title || "Tuition Application"}</h2>
            <p className="mt-2">Student: {item.student?.name || item.studentName || "Student"}</p>
            <p className="mt-1">Status: {item.status || "Pending"}</p>
            {item.message && <p className="mt-2 text-gray-600">{item.message}</p>}
          </article>
        ))}
      </div>
    </main>
  );
}