
"use client";

import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import {
  GraduationCap,
  BookOpen,
  User,
  LogOut,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center max-w-md w-full">
          <GraduationCap className="mx-auto text-emerald-600 mb-4" size={42} />
          <h1 className="text-2xl font-bold text-gray-900">
            Sign in required
          </h1>
          <p className="text-gray-500 mt-2">
            Please sign in to access your dashboard.
          </p>
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
          >
            Sign In <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    );
  }

  const role = (session.user as typeof session.user & { role?: string }).role || "student";

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-emerald-600 font-semibold text-sm">
              MENTORLAGBE
            </p>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">
              Welcome to Dashboard
            </h1>
            <p className="text-gray-500 mt-2">
              Manage your tuition and mentorship activities.
            </p>
          </div>

          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-7 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center">
              <GraduationCap className="text-emerald-700" size={28} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {session.user.name || "User"}
              </h2>
              <p className="text-gray-500">{session.user.email}</p>
              <p className="text-sm text-emerald-600 font-semibold capitalize mt-1">
                {role} Account
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/tuitions"
            className="bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-lg transition"
          >
            <BookOpen className="text-emerald-600 mb-4" size={30} />
            <h3 className="text-xl font-bold text-gray-900">
              Browse Tuitions
            </h3>
            <p className="text-gray-500 mt-2">
              Explore available tuition opportunities.
            </p>
            <span className="flex items-center gap-2 text-emerald-600 font-semibold mt-5">
              Explore <ArrowRight size={18} />
            </span>
          </Link>

          <Link
            href="/dashboard/profile"
            className="bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-lg transition"
          >
            <User className="text-emerald-600 mb-4" size={30} />
            <h3 className="text-xl font-bold text-gray-900">
              My Profile
            </h3>
            <p className="text-gray-500 mt-2">
              View and manage your profile.
            </p>
            <span className="flex items-center gap-2 text-emerald-600 font-semibold mt-5">
              View Profile <ArrowRight size={18} />
            </span>
          </Link>

          {role === "admin" && (
            <Link
              href="/dashboard/admin"
              className="bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-lg transition"
            >
              <ShieldCheck className="text-emerald-600 mb-4" size={30} />
              <h3 className="text-xl font-bold text-gray-900">
                Admin Panel
              </h3>
              <p className="text-gray-500 mt-2">
                Manage users and tuition approvals.
              </p>
              <span className="flex items-center gap-2 text-emerald-600 font-semibold mt-5">
                Open Admin <ArrowRight size={18} />
              </span>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
