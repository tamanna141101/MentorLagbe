"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

export default function AdminTuitionsPage() {
  const { data: session, isPending } = useSession();
  const [tuitions, setTuitions] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPending || !session) return;
    apiFetch("/api/tuitions")
      .then((res) => setTuitions(res.data || []))
      .catch((err) => setError(err.message));
  }, [session, isPending]);

  if (isPending) return <main className="container-custom py-20">Loading...</main>;
  if (!session) return <main className="container-custom py-20"><Link href="/sign-in">Sign in</Link></main>;

  return (
    <main className="container-custom section-padding min-h-screen">
      <h1 className="mb-6 text-3xl font-bold">Manage Tuitions</h1>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <div className="grid gap-4">
        {tuitions.map((tuition) => (
          <article key={tuition._id} className="rounded-xl border bg-white p-5">
            <div className="flex flex-wrap justify-between gap-3">
              <h2 className="text-xl font-semibold">{tuition.title}</h2>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm capitalize text-blue-700">
                {tuition.status || "Approved"}
              </span>
            </div>
            <p className="mt-2 text-gray-600">{tuition.subject || "Tuition"}</p>
            <p className="mt-1 text-gray-500">{tuition.location || ""}</p>
          </article>
        ))}
        {!error && tuitions.length === 0 && (
          <p className="rounded-xl border p-8 text-center">No tuitions found.</p>
        )}
      </div>
    </main>
  );
}