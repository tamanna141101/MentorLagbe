
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import {
  GraduationCap,
  BookOpen,
  ClipboardList,
  UserRound,
  ArrowRight,
  LogOut,
  Search,
  Clock3,
} from "lucide-react";

export default function StudentDashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
    router.refresh();
  };

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#f8faf9]">
        <p className="font-medium text-emerald-700">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  if (!session) {
    router.push("/sign-in");
    return null;
  }

  const cards = [
    {
      title: "Available Tuitions",
      value: "Explore",
      description: "Find tuition opportunities",
      icon: BookOpen,
      href: "/tuitions",
    },
    {
      title: "My Applications",
      value: "0",
      description: "Applications submitted",
      icon: ClipboardList,
      href: "/dashboard/student/my-applications",
    },
    {
      title: "My Profile",
      value: "View",
      description: "Manage your account",
      icon: UserRound,
      href: "/dashboard/profile",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f8faf9] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Welcome Header */}
        <section className="mb-8 overflow-hidden rounded-3xl bg-[#102a26] p-7 text-white shadow-lg sm:p-10">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">
            <div>
              <div className="mb-4 flex items-center gap-2 text-sm font-bold tracking-widest text-emerald-400">
                <GraduationCap size={21} />
                STUDENT DASHBOARD
              </div>

              <h1 className="text-3xl font-extrabold sm:text-4xl">
                Welcome, {session.user.name || "Student"}!
              </h1>

              <p className="mt-3 max-w-xl leading-7 text-slate-300">
                Find the right tutor, explore learning opportunities
                and keep track of your academic journey.
              </p>
            </div>

            <Link
              href="/tuitions"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 font-bold text-white transition hover:bg-emerald-400"
            >
              Find a Tutor
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* Account Information */}
        <section className="mb-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <UserRound size={28} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#102a26]">
                {session.user.name || "Student"}
              </h2>
              <p className="text-sm text-slate-500">
                {session.user.email}
              </p>
            </div>

            <span className="ml-auto rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-emerald-700">
              Student
            </span>
          </div>
        </section>

        {/* Dashboard Cards */}
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.title}
                href={card.href}
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Icon size={25} />
                </div>

                <h3 className="text-lg font-bold text-[#102a26]">
                  {card.title}
                </h3>

                <p className="mt-2 text-2xl font-extrabold text-emerald-700">
                  {card.value}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {card.description}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
                  Open
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </span>
              </Link>
            );
          })}
        </section>

        {/* Recent Applications */}
        <section className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-extrabold text-[#102a26]">
                Recent Applications
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Keep track of your tuition applications.
              </p>
            </div>

            <ClipboardList className="text-emerald-600" size={26} />
          </div>

          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm">
              <Clock3 size={26} />
            </div>

            <h3 className="mt-4 font-bold text-[#102a26]">
              No applications yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Once you apply for a tuition, your application
              information will appear here.
            </p>

            <Link
              href="/tuitions"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
            >
              <Search size={17} />
              Browse Tuitions
            </Link>
          </div>
        </section>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            Logged in as {session.user.email}
          </p>

          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
          >
            <LogOut size={17} />
            Sign Out
          </button>
        </div>
      </div>
    </main>
  );
}
