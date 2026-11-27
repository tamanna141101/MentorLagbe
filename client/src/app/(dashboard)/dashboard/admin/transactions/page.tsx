"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

export default function AdminTransactionsPage() {
  const { data: session, isPending } = useSession();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPending || !session) return;
    apiFetch("/api/payments")
      .then((res) => setTransactions(res.data || []))
      .catch((err) => setError(err.message));
  }, [session, isPending]);

  if (isPending) return <main className="container-custom py-20">Loading...</main>;
  if (!session) return <main className="container-custom py-20"><Link href="/sign-in">Sign in</Link></main>;

  return (
    <main className="container-custom section-padding min-h-screen">
      <h1 className="mb-6 text-3xl font-bold">Transactions</h1>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Transaction ID</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-4">{item._id}</td>
                <td className="p-4">৳{item.amount ?? "—"}</td>
                <td className="p-4 capitalize">{item.status || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!error && transactions.length === 0 && (
        <p className="mt-4 rounded-xl border p-8 text-center">No transactions found.</p>
      )}
    </main>
  );
}