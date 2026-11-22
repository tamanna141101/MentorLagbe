
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Clock,
  ArrowRight,
  BookOpen,
  SlidersHorizontal,
} from "lucide-react";
import { tuitionData } from "@/lib/data/tuitions";

export default function TuitionsPage() {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All");
  const [location, setLocation] = useState("All");
  const [tuitionType, setTuitionType] = useState("All");

  const subjects = ["All", ...Array.from(new Set(tuitionData.map((item) => item.subject)))];
  const locations = ["All", ...Array.from(new Set(tuitionData.map((item) => item.location)))];
  const types = ["All", ...Array.from(new Set(tuitionData.map((item) => item.tuitionType)))];

  const filteredTuitions = useMemo(() => {
    return tuitionData.filter((tuition) => {
      const searchMatch =
        tuition.title.toLowerCase().includes(search.toLowerCase()) ||
        tuition.subject.toLowerCase().includes(search.toLowerCase()) ||
        tuition.classLevel.toLowerCase().includes(search.toLowerCase());

      const subjectMatch = subject === "All" || tuition.subject === subject;
      const locationMatch = location === "All" || tuition.location === location;
      const typeMatch = tuitionType === "All" || tuition.tuitionType === tuitionType;

      return searchMatch && subjectMatch && locationMatch && typeMatch;
    });
  }, [search, subject, location, tuitionType]);

  const resetFilters = () => {
    setSearch("");
    setSubject("All");
    setLocation("All");
    setTuitionType("All");
  };

  return (
    <div className="min-h-screen bg-[#f8faf9]">
      <section className="bg-[#102a26] py-16 text-white">
        <div className="container-custom">
          <p className="text-sm font-bold uppercase tracking-[2px] text-emerald-400">
            Find Your Opportunity
          </p>
          <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">
            Explore Tuition Opportunities
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            Discover suitable tuition opportunities and connect with students
            looking for qualified tutors.
          </p>
        </div>
      </section>

      <section className="container-custom py-12">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-7">
          <div className="mb-5 flex items-center gap-2 font-bold text-[#102a26]">
            <SlidersHorizontal size={19} />
            Search and Filter
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search tuition..."
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-emerald-600"
              />
            </div>

            <select
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-600"
            >
              {subjects.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Subjects" : item}
                </option>
              ))}
            </select>

            <select
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-600"
            >
              {locations.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Locations" : item}
                </option>
              ))}
            </select>

            <select
              value={tuitionType}
              onChange={(event) => setTuitionType(event.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-600"
            >
              {types.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Tuition Types" : item}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={resetFilters}
              className="text-sm font-bold text-emerald-700 hover:underline"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div className="mb-6 mt-10 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold text-[#102a26]">
              Available Tuitions
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Showing {filteredTuitions.length} opportunities
            </p>
          </div>
        </div>

        {filteredTuitions.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTuitions.map((tuition) => (
              <article
                key={tuition.id}
                className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    {tuition.tuitionType}
                  </span>
                  <span className="text-xs text-slate-400">{tuition.postedAt}</span>
                </div>

                <h3 className="mt-5 text-lg font-extrabold leading-7 text-[#102a26]">
                  {tuition.title}
                </h3>

                <div className="mt-4 space-y-3 text-sm text-slate-500">
                  <p className="flex items-center gap-2">
                    <BookOpen size={16} className="text-emerald-700" />
                    {tuition.subject} · {tuition.classLevel}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-emerald-700" />
                    {tuition.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={16} className="text-emerald-700" />
                    {tuition.daysPerWeek} days per week
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5 mt-6">
                  <div>
                    <p className="text-xs text-slate-400">Monthly Salary</p>
                    <p className="mt-1 text-lg font-extrabold text-emerald-700">
                      ৳{tuition.salary.toLocaleString("en-BD")}
                    </p>
                  </div>
                  <Link
                    href={`/tuitions/${tuition.id}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#102a26] px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700"
                  >
                    Details <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <Search className="mx-auto text-slate-400" size={35} />
            <h3 className="mt-4 text-xl font-bold text-[#102a26]">
              No tuition found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
            <button onClick={resetFilters} className="primary-button mt-5">
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
