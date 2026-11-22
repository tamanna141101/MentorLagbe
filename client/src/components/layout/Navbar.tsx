
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Find Tutors", href: "/tuitions" },
  { name: "Pricing", href: "/pricing" },
  { name: "How It Works", href: "/#how-it-works" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e5ece8] bg-white/95 backdrop-blur-md">
      <nav className="container-custom flex h-[76px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#087f5b] text-white">
            <GraduationCap size={25} />
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-[#102a26]">
              Mentor<span className="text-[#087f5b]">Lagbe</span>
            </h1>
            <p className="text-[10px] font-medium tracking-[1.5px] text-gray-500">
              LEARN. GROW. SUCCEED.
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-gray-600 hover:text-[#087f5b]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/sign-in"
            className="px-4 py-2 text-sm font-bold text-[#102a26] hover:text-[#087f5b]"
          >
            Sign In
          </Link>

          <Link href="/sign-up" className="primary-button text-sm">
            Get Started <ArrowRight size={16} />
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-[#102a26] md:hidden"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white p-5 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-semibold text-gray-700"
              >
                {link.name}
              </Link>
            ))}

            <hr className="border-gray-100" />

            <Link
              href="/sign-in"
              onClick={() => setMobileOpen(false)}
              className="font-semibold text-[#102a26]"
            >
              Sign In
            </Link>

            <Link
              href="/sign-up"
              onClick={() => setMobileOpen(false)}
              className="primary-button"
            >
              Create Account <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
