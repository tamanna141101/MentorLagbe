"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function PostTuitionPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    subject: "",
    location: "",
    salary: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await apiFetch("/api/tuitions", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          salary: Number(form.salary),
        }),
      });

      setSuccess("Tuition posted successfully!");
      setForm({
        title: "",
        subject: "",
        location: "",
        salary: "",
        description: "",
      });

      setTimeout(() => router.push("/dashboard/tutor/my-tuitions"), 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not post tuition");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) return <div className="container-custom py-20">Loading...</div>;

  if (!session) {
    return (
      <div className="container-custom py-20 text-center">
        Please <Link href="/sign-in" className="text-blue-600 underline">sign in</Link>.
      </div>
    );
  }

  return (
    <section className="container-custom section-padding min-h-screen">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold">Post a Tuition</h1>
        <p className="mb-8 text-gray-500">Share your tuition requirements with students.</p>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border bg-white p-6 shadow-sm">
          {[
            ["title", "Tuition Title", "e.g. Need a Mathematics Tutor"],
            ["subject", "Subject", "e.g. Mathematics"],
            ["location", "Location", "e.g. Dhaka"],
            ["salary", "Monthly Salary (BDT)", "e.g. 5000"],
          ].map(([name, label, placeholder]) => (
            <div key={name}>
              <label className="mb-2 block font-medium">{label}</label>
              <input
                required
                type={name === "salary" ? "number" : "text"}
                min={name === "salary" ? "1" : undefined}
                value={form[name as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                placeholder={placeholder}
                className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          ))}

          <div>
            <label className="mb-2 block font-medium">Description</label>
            <textarea
              required
              rows={5}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Write tuition details..."
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {error && <p className="rounded-lg bg-red-100 p-3 text-red-700">{error}</p>}
          {success && <p className="rounded-lg bg-green-100 p-3 text-green-700">{success}</p>}

          <button
            disabled={loading}
            type="submit"
            className="primary-button w-full disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Tuition"}
          </button>
        </form>
      </div>
    </section>
  );
}
