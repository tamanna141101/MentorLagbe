"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

type Application = {
  _id: string;
  status: string;
  message?: string;
  tuition?: {
    _id: string;
    title: string;
    subject?: string;
    location?: string;
  };
};

export default function MyApplicationsPage() {
  const { data: session, isPending } = useSession();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      setLoading(false);
      return;
    }

    apiFetch("/api/applications/my-applications")
      .then((result) => {
        setApplications(result.data || []);
      })
      .catch((err) => {
        setError(err.message || "Failed to load applications");
      })
      .finally(() => setLoading(false));
  }, [session, isPending]);

  if (isPending || loading) {
    return (
      <div className="container-custom py-20 text-center">
        Loading your applications...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-2xl font-bold">Please sign in first</h1>
        <Link href="/sign-in" className="primary-button mt-5 inline-block">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <section className="container-custom section-padding min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Applications</h1>
        <p className="mt-2 text-gray-500">
          Track the tuition applications you have submitted.
        </p>
      </div>

      {error && (
        <p className="mb-5 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </p>
      )}

      {!error && applications.length === 0 && (
        <div className="rounded-2xl border p-10 text-center">
          <h2 className="text-xl font-semibold">No applications yet</h2>
          <p className="mt-2 text-gray-500">
            Explore available tuitions and apply for one.
          </p>
          <Link href="/tuitions" className="primary-button mt-5 inline-block">
            Browse Tuitions
          </Link>
        </div>
      )}

      <div className="grid gap-5">
        {applications.map((application) => (
          <div
            key={application._id}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">
                {application.tuition?.title || "Tuition"}
              </h2>

              <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium capitalize text-blue-700">
                {application.status || "Pending"}
              </span>
            </div>

            {application.tuition?.subject && (
              <p className="mt-3 text-gray-600">
                Subject: {application.tuition.subject}
              </p>
            )}

            {application.tuition?.location && (
              <p className="mt-1 text-gray-600">
                Location: {application.tuition.location}
              </p>
            )}

            {application.message && (
              <p className="mt-3 text-gray-500">
                Message: {application.message}
              </p>
            )}

            {application.tuition?._id && (
              <Link
                href={`/tuitions/${application.tuition._id}`}
                className="mt-5 inline-block font-semibold text-blue-600 hover:underline"
              >
                View Tuition →
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}