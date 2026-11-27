"use client";

import Link from "next/link";

export default function SavedTuitionsPage() {
  return (
    <main className="container-custom section-padding min-h-screen">
      <h1 className="mb-3 text-3xl font-bold">Saved Tuitions</h1>
      <p className="mb-6 text-gray-500">Your saved tuition opportunities will appear here.</p>
      <div className="rounded-xl border p-8 text-center">
        <p className="mb-4">You have not saved any tuitions yet.</p>
        <Link href="/tuitions" className="primary-button inline-block">Browse Tuitions</Link>
      </div>
    </main>
  );
}