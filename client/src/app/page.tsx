
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Users,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Search,
  CheckCircle2,
} from "lucide-react";

const subjects = [
  { name: "Mathematics", icon: "∑", count: "120+ Tutors" },
  { name: "English", icon: "文", count: "95+ Tutors" },
  { name: "Physics", icon: "⚛", count: "80+ Tutors" },
  { name: "Chemistry", icon: "⚗", count: "65+ Tutors" },
  { name: "Programming", icon: "</>", count: "50+ Tutors" },
  { name: "Biology", icon: "🧬", count: "70+ Tutors" },
];

const featuredTuitions = [
  {
    title: "Need an experienced Mathematics Tutor",
    level: "Class 9–10",
    subject: "Mathematics",
    location: "Uttara, Dhaka",
    salary: "৳6,000 / month",
    type: "Home Tuition",
  },
  {
    title: "Looking for an English Tutor",
    level: "Class 6–8",
    subject: "English",
    location: "Dhanmondi, Dhaka",
    salary: "৳5,000 / month",
    type: "Home Tuition",
  },
  {
    title: "Physics and Chemistry Tutor Needed",
    level: "HSC",
    subject: "Science",
    location: "Mirpur, Dhaka",
    salary: "৳8,000 / month",
    type: "Online / Home",
  },
];

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description:
      "Sign up as a student or tutor and complete your profile.",
  },
  {
    number: "02",
    title: "Explore Opportunities",
    description:
      "Find suitable tutors or browse tuition opportunities.",
  },
  {
    number: "03",
    title: "Connect & Grow",
    description:
      "Apply, connect and start your learning journey.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#102a26] text-white">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="container-custom relative grid min-h-[570px] items-center gap-12 py-20 md:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
              <GraduationCap size={17} />
              Bangladesh's Smart Tuition Platform
            </div>

            <h1 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Find the Right Tutor.
              <span className="mt-2 block text-emerald-400">
                Build Your Future.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-slate-300 md:text-lg">
              Connect with qualified tutors, discover tuition opportunities
              and make learning easier with MentorLagbe.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/tuitions"
                className="primary-button"
              >
                Find a Tutor <ArrowRight size={18} />
              </Link>

              <Link
                href="/sign-up"
                className="rounded-[10px] border border-white/30 px-6 py-3 font-bold text-white transition hover:bg-white hover:text-[#102a26]"
              >
                Become a Tutor
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-7 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-400" />
                Verified Profiles
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-400" />
                Easy Applications
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur">
              <div className="rounded-2xl bg-white p-6 text-[#14231f]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Your learning journey</p>
                    <h3 className="mt-1 text-xl font-extrabold">Start Today!</h3>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                    <BookOpen size={27} />
                  </div>
                </div>

                <div className="mt-7 space-y-4">
                  <div className="rounded-xl border border-slate-100 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-emerald-100 p-3 text-emerald-700">
                        <Users size={22} />
                      </div>
                      <div>
                        <p className="font-bold">Find Expert Tutors</p>
                        <p className="text-sm text-slate-500">
                          Learn from experienced educators
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-100 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-blue-100 p-3 text-blue-700">
                        <GraduationCap size={22} />
                      </div>
                      <div>
                        <p className="font-bold">Explore Tuitions</p>
                        <p className="text-sm text-slate-500">
                          Discover opportunities near you
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#102a26] p-4 text-white">
                    <p className="text-sm text-emerald-300">
                      Your next opportunity starts here.
                    </p>
                    <p className="mt-1 text-lg font-bold">
                      Learn. Teach. Grow.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-7 top-16 hidden rounded-xl bg-white p-4 text-[#14231f] shadow-xl sm:block">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-emerald-600" size={23} />
                <div>
                  <p className="text-sm font-bold">Trusted Platform</p>
                  <p className="text-xs text-slate-500">Learn with confidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-slate-100 bg-white">
        <div className="container-custom grid grid-cols-2 gap-8 py-10 text-center md:grid-cols-4">
          {[
            ["500+", "Registered Tutors"],
            ["1,200+", "Tuition Opportunities"],
            ["800+", "Happy Students"],
            ["64+", "Districts Covered"],
          ].map(([value, label]) => (
            <div key={label}>
              <h3 className="text-3xl font-extrabold text-[#087f5b]">
                {value}
              </h3>
              <p className="mt-2 text-sm text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subjects */}
      <section className="section-padding bg-[#f8faf9]">
        <div className="container-custom">
          <div className="text-center">
            <p className="section-label">Explore Subjects</p>
            <h2 className="section-title mt-3">
              Find Tutors by Subject
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-500">
              Choose your preferred subject and connect with the right tutor
              for your academic goals.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <Link
                href="/tuitions"
                key={subject.name}
                className="group rounded-2xl border border-slate-100 bg-white p-6 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-2xl font-bold text-emerald-700">
                    {subject.icon}
                  </div>
                  <ArrowRight className="text-slate-300 transition group-hover:text-emerald-600" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#102a26]">
                  {subject.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {subject.count}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tuitions */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="section-label">Latest Opportunities</p>
              <h2 className="section-title mt-3">
                Featured Tuitions
              </h2>
              <p className="mt-3 text-slate-500">
                Explore some of the latest tuition opportunities.
              </p>
            </div>

            <Link
              href="/tuitions"
              className="inline-flex items-center gap-2 font-bold text-emerald-700 hover:gap-3"
            >
              View All <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredTuitions.map((tuition) => (
              <div
                key={tuition.title}
                className="rounded-2xl border border-slate-100 p-6 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    {tuition.type}
                  </span>
                  <Star size={18} className="text-amber-400" />
                </div>

                <h3 className="mt-5 min-h-14 text-lg font-bold text-[#102a26]">
                  {tuition.title}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {tuition.level} · {tuition.subject}
                </p>

                <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm text-slate-500">
                  <p className="flex items-center gap-2">
                    <MapPin size={16} /> {tuition.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={16} /> Flexible schedule
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="font-extrabold text-emerald-700">
                    {tuition.salary}
                  </span>
                  <Link
                    href="/tuitions"
                    className="text-sm font-bold text-[#102a26] hover:text-emerald-700"
                  >
                    Details <ArrowRight className="inline" size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="section-padding bg-[#f8faf9]">
        <div className="container-custom">
          <div className="text-center">
            <p className="section-label">Simple Process</p>
            <h2 className="section-title mt-3">How MentorLagbe Works</h2>
            <p className="mt-4 text-slate-500">
              Getting started is simple. Follow three easy steps.
            </p>
          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-slate-100 bg-white p-8 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-xl font-extrabold text-emerald-700">
                  {step.number}
                </div>
                <h3 className="mt-6 text-xl font-bold text-[#102a26]">
                  {step.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#102a26] py-20 text-white">
        <div className="container-custom text-center">
          <p className="section-label text-emerald-400">
            Your Journey Starts Here
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold leading-tight md:text-5xl">
            Ready to Find Your Perfect Learning Match?
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-300">
            Join MentorLagbe today and take the next step towards your goals.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/sign-up" className="primary-button">
              Get Started <ArrowRight size={18} />
            </Link>
            <Link
              href="/tuitions"
              className="rounded-[10px] border border-white/30 px-6 py-3 font-bold hover:bg-white hover:text-[#102a26]"
            >
              Browse Tuitions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
