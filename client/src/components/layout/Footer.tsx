
import Link from "next/link";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#102a26] text-white">
      <div className="container-custom grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div>
          <Link href="/" className="mb-5 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#087f5b]">
              <GraduationCap size={25} />
            </div>
            <span className="text-xl font-extrabold">
              Mentor<span className="text-[#42d6a0]">Lagbe</span>
            </span>
          </Link>

          <p className="max-w-xs text-sm leading-7 text-gray-300">
            Connecting ambitious learners with passionate tutors.
            Your journey towards better learning starts here.
          </p>

          <div className="mt-6 flex gap-3">
            {[
              { label: "f", name: "Facebook" },
              { label: "in", name: "LinkedIn" },
              { label: "◎", name: "Instagram" },
              { label: "𝕏", name: "X" },
            ].map((social) => (
              <a
                key={social.name}
                href="#"
                aria-label={social.name}
                className="flex h-10 min-w-10 items-center justify-center rounded-lg bg-white/10 px-3 font-bold hover:bg-[#087f5b]"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="mb-5 font-bold">Quick Links</h3>
          <div className="flex flex-col gap-3 text-sm text-gray-300">
            <Link href="/">Home</Link>
            <Link href="/tuitions">Find Tutors</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/#how-it-works">How It Works</Link>
          </div>
        </div>

        {/* For everyone */}
        <div>
          <h3 className="mb-5 font-bold">For Everyone</h3>
          <div className="flex flex-col gap-3 text-sm text-gray-300">
            <Link href="/sign-up">Become a Student</Link>
            <Link href="/sign-up">Become a Tutor</Link>
            <Link href="/sign-in">Sign In</Link>
            <Link href="/pricing">Upgrade to Pro</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-5 font-bold">Contact Us</h3>

          <div className="flex flex-col gap-4 text-sm text-gray-300">
            <p className="flex items-center gap-3">
              <Mail size={17} className="text-[#42d6a0]" />
              support@mentorlagbe.com
            </p>

            <p className="flex items-center gap-3">
              <Phone size={17} className="text-[#42d6a0]" />
              +880 1700-000000
            </p>

            <p className="flex items-center gap-3">
              <MapPin size={17} className="text-[#42d6a0]" />
              Dhaka, Bangladesh
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-custom flex flex-col justify-between gap-3 py-6 text-center text-xs text-gray-400 md:flex-row md:text-left">
          <p>
            © 2026 MentorLagbe. All rights reserved.
          </p>
          <p>Designed for a smarter learning journey.</p>
        </div>
      </div>
    </footer>
  );
}

