"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

type Tuition = {
  _id: string;
  title: string;
  subject?: string;
  location?: string;
  status?: string;
};

export default function MyTuitionsPage() {
  const { data: session, isPending } = useSession();
  const [tuitions, setTuitions] = useState<Tuition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      setLoading(false);
      return;
    }

    apiFetch("/api/tuitions/my-tuitions")
      .then((result) => setTuitions(result.data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [session, isPending]);

  if (isPending || loading) {
    return <div className="container-custom py-20 text-center">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="container-custom py-20 text-center">
        Please <Link className="text-blue-600 underline" href="/sign-in">sign in</Link>.
      </div>
    );
  }

  return (
    <section className="container-custom section-padding min-h-screen">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Tuitions</h1>
          <p className="mt-2 text-gray-500">Manage your tuition posts.</p>
        </div>
        <Link href="/dashboard/tutor/post-tuition" className="primary-button">
          + Post Tuition
        </Link>
      </div>

      {error && <p className="rounded-lg bg-red-100 p-4 text-red-700">{error}</p>}

      {!error && tuitions.length === 0 && (
        <div className="rounded-2xl border p-10 text-center">
          <h2 className="text-xl font-semibold">No tuition posts found</h2>
          <p className="mt-2 text-gray-500">Create your first tuition post.</p>
          <Link href="/dashboard/tutor/post-tuition" className="primary-button mt-5 inline-block">
            Post Tuition
          </Link>
        </div>
      )}

      <div className="grid gap-5">
        {tuitions.map((tuition) => (
          <div key={tuition._id} className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex flex-wrap justify-between gap-3">
              <h2 className="text-xl font-semibold">{tuition.title}</h2>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm capitalize text-blue-700">
                {tuition.status || "Pending"}
              </span>
            </div>
            {tuition.subject && <p className="mt-2 text-gray-600">Subject: {tuition.subject}</p>}
            {tuition.location && <p className="mt-1 text-gray-600">Location: {tuition.location}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}