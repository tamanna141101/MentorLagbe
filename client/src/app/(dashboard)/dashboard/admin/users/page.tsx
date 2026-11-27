"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

export default function AdminUsersPage() {
  const { data: session, isPending } = useSession();
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPending || !session) return;
    apiFetch("/api/admin/users")
      .then((res) => setUsers(res.data || []))
      .catch((err) => setError(err.message));
  }, [session, isPending]);

  if (isPending) return <main className="container-custom py-20">Loading...</main>;
  if (!session) return <main className="container-custom py-20"><Link href="/sign-in">Sign in</Link></main>;

  return (
    <main className="container-custom section-padding min-h-screen">
      <h1 className="mb-6 text-3xl font-bold">Manage Users</h1>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      {!error && users.length === 0 && (
        <p className="rounded-xl border p-8 text-center">No users found or users API is unavailable.</p>
      )}
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Role</th></tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id || user.id} className="border-t">
                <td className="p-4">{user.name || "—"}</td>
                <td className="p-4">{user.email || "—"}</td>
                <td className="p-4 capitalize">{user.role || "student"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}