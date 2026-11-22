
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  BookOpen,
  Clock,
  CalendarDays,
  Wallet,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";
import { getTuitionById } from "@/lib/data/tuitions";
export const instant = false;

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TuitionDetailsPage({ params }: Props) {
  const { id } = await params;
  const tuition = getTuitionById(id);

  if (!tuition) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f8faf9]">
      <section className="bg-[#102a26] py-14 text-white">
        <div className="container-custom">
          <Link
            href="/tuitions"
            className="inline-flex items-center gap-2 text-sm text-emerald-300 hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Tuitions
          </Link>

          <div className="mt-8">
            <span className="rounded-full bg-emerald-400/15 px-4 py-2 text-xs font-bold text-emerald-300">
              {tuition.tuitionType}
            </span>

            <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
              {tuition.title}
            </h1>

            <p className="mt-4 flex items-center gap-2 text-slate-300">
              <MapPin size={17} />
              {tuition.location}
            </p>
          </div>
        </div>
      </section>

      <section className="container-custom grid gap-8 py-12 lg:grid-cols-[1fr_340px]">
        <div className="space-y-7">
          <div className="rounded-2xl border border-slate-100 bg-white p-7">
            <h2 className="text-xl font-extrabold text-[#102a26]">
              Tuition Overview
            </h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                  <BookOpen size={21} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Subject</p>
                  <p className="mt-1 font-bold text-[#102a26]">
                    {tuition.subject}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                  <GraduationCap size={21} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Class / Level</p>
                  <p className="mt-1 font-bold text-[#102a26]">
                    {tuition.classLevel}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                  <Clock size={21} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Days Per Week</p>
                  <p className="mt-1 font-bold text-[#102a26]">
                    {tuition.daysPerWeek} days
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                  <CalendarDays size={21} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Posted</p>
                  <p className="mt-1 font-bold text-[#102a26]">
                    {tuition.postedAt}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-7">
            <h2 className="text-xl font-extrabold text-[#102a26]">
              Description
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              {tuition.description}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-7">
            <h2 className="text-xl font-extrabold text-[#102a26]">
              Requirements
            </h2>

            <ul className="mt-5 space-y-4">
              {tuition.requirements.map((requirement) => (
                <li
                  key={requirement}
                  className="flex items-start gap-3 text-slate-600"
                >
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />
                  {requirement}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside>
          <div className="sticky top-24 rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              Monthly Salary
            </p>

            <div className="mt-2 flex items-center gap-2">
              <Wallet className="text-emerald-700" size={25} />
              <h2 className="text-3xl font-extrabold text-emerald-700">
                ৳{tuition.salary.toLocaleString("en-BD")}
              </h2>
            </div>

            <div className="my-6 border-t border-slate-100" />

            <p className="text-sm font-bold text-[#102a26]">
              Interested in this tuition?
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Sign in with your student account to apply for this tuition.
            </p>

            <Link
              href="/sign-in"
              className="primary-button mt-6 w-full"
            >
              Apply for Tuition
            </Link>

            <p className="mt-4 text-center text-xs leading-5 text-slate-400">
              You must be logged in as a student to apply.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
