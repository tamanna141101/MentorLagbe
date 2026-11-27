"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [message, setMessage] = useState("");

  if (isPending) return <p className="container-custom py-20">Loading...</p>;
  if (!session) return <p className="container-custom py-20"><Link href="/sign-in">Sign in</Link></p>;

  return (
    <main className="container-custom section-padding min-h-screen">
      <div className="mx-auto max-w-xl rounded-2xl border bg-white p-7">
        <h1 className="mb-6 text-3xl font-bold">My Profile</h1>
        <label className="mb-2 block font-medium">Full Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="mb-4 w-full rounded-lg border p-3" />
        <label className="mb-2 block font-medium">Email</label>
        <input value={session.user.email || ""} readOnly className="w-full rounded-lg border bg-gray-100 p-3" />
        <p className="mt-4 text-sm text-gray-500">Profile editing will be available after the profile update API is connected.</p>
        {message && <p className="mt-3">{message}</p>}
      </div>
    </main>
  );
}