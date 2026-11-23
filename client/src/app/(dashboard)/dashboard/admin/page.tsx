
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import {
  ShieldCheck, Users, BookOpen, CreditCard,
  ArrowRight, LogOut, Settings,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
    router.refresh();
  };

  if (isPending) return <div className="p-20 text-center">Loading...</div>;
  if (!session) {
    router.push("/sign-in");
    return null;
  }

  const items = [
    { title: "Manage Users", description: "Review and manage platform users.", icon: Users, href: "/dashboard/admin/users" },
    { title: "Manage Tuitions", description: "Review tuition posts and moderation.", icon: BookOpen, href: "/dashboard/admin/tuitions" },
    { title: "Transactions", description: "Review payment and transaction records.", icon: CreditCard, href: "/dashboard/admin/transactions" },
    { title: "Admin Settings", description: "View your account information.", icon: Settings, href: "/dashboard/profile" },
  ];

  return (
    <main className="min-h-screen bg-[#f8faf9] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <section className="mb-8 rounded-3xl bg-[#102a26] p-8 text-white sm:p-10">
          <div className="mb-4 flex items-center gap-2 text-emerald-400">
            <ShieldCheck size={22} />
            <span className="text-sm font-bold tracking-widest">ADMIN PANEL</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            Welcome, {session.user.name || "Administrator"}!
          </h1>
          <p className="mt-3 max-w-xl leading-7 text-slate-300">
            Manage MentorLagbe users, tuition posts and platform activities.
          </p>
        </section>

        <section className="mb-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Signed in as</p>
          <h2 className="mt-1 text-lg font-bold text-[#102a26]">
            {session.user.name || "Administrator"}
          </h2>
          <p className="text-sm text-slate-500">{session.user.email}</p>
        </section>

        <section className="grid gap-5 sm:grid-cols-2">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.title} href={item.href}
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Icon size={25} />
                </div>
                <h3 className="text-lg font-bold text-[#102a26]">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{item.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
                  Open <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </section>

        <div className="mt-8 flex justify-end">
          <button onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-100">
            <LogOut size={17} /> Sign Out
          </button>
        </div>
      </div>
    </main>
  );
}
