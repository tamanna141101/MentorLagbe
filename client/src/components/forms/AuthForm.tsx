
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  GraduationCap,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
} from "lucide-react";

import { signIn, signUp } from "@/lib/auth-client";

type AuthMode = "sign-in" | "sign-up";

const authSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["student", "tutor"]).optional(),
});

type AuthValues = z.infer<typeof authSchema>;

type Props = {
  mode: AuthMode;
};

export default function AuthForm({ mode }: Props) {
  const isSignUp = mode === "sign-up";
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "student",
    },
  });

  const onSubmit = async (data: AuthValues) => {
    if (isSignUp && (!data.name || data.name.trim().length < 2)) {
      toast.error("Please enter your full name (at least 2 characters).");
      return;
    }

    try {
      if (isSignUp) {
        const { error } = await signUp.email({
          name: data.name!.trim(),
          email: data.email,
          password: data.password,
          callbackURL: "/dashboard",
        });

        if (error) {
          toast.error(error.message || "Registration failed.");
          return;
        }

        toast.success("Account created successfully!");
      } else {
        const { error } = await signIn.email({
          email: data.email,
          password: data.password,
          callbackURL: "/dashboard",
        });

        if (error) {
          toast.error(error.message || "Login failed.");
          return;
        }

        toast.success("Login successful!");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      setSocialLoading(true);

      const { error } = await signIn.social({
        provider,
        callbackURL: "/dashboard",
      });

      if (error) {
        toast.error(error.message || `${provider} login failed.`);
        setSocialLoading(false);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Social login failed."
      );
      setSocialLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-[#14231f] outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100";

  return (
    <div className="min-h-[calc(100vh-150px)] bg-[#f8faf9] px-4 py-14">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl lg:grid-cols-2">

        {/* Left Panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-[#102a26] p-10 text-white lg:flex">
          <div className="absolute -right-24 -top-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />

          <Link href="/" className="relative flex items-center gap-3">
            <div className="rounded-xl bg-emerald-500 p-2">
              <GraduationCap size={27} />
            </div>
            <span className="text-2xl font-extrabold">
              Mentor<span className="text-emerald-400">Lagbe</span>
            </span>
          </Link>

          <div className="relative my-12">
            <p className="text-sm font-bold uppercase tracking-[2px] text-emerald-400">
              Learn. Teach. Grow.
            </p>

            <h2 className="mt-5 text-4xl font-extrabold leading-tight">
              Your Next Learning Opportunity Starts Here.
            </h2>

            <p className="mt-6 leading-8 text-slate-300">
              Connect with qualified tutors, explore tuition opportunities
              and build a better future with MentorLagbe.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Connect with qualified tutors",
                "Discover learning opportunities",
                "Manage your academic journey",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    ✓
                  </span>
                  <span className="text-sm text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="relative text-sm text-slate-400">
            Empowering students and tutors, together.
          </p>
        </div>

        {/* Form Panel */}
        <div className="p-6 sm:p-10 lg:p-12">
          <div className="mb-8 lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <GraduationCap className="text-emerald-700" size={30} />
              <span className="text-xl font-extrabold text-[#102a26]">
                Mentor<span className="text-emerald-600">Lagbe</span>
              </span>
            </Link>
          </div>

          <div>
            <p className="section-label">
              {isSignUp ? "Join MentorLagbe" : "Welcome Back"}
            </p>

            <h1 className="mt-3 text-3xl font-extrabold text-[#102a26]">
              {isSignUp ? "Create Your Account" : "Sign In to Your Account"}
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              {isSignUp
                ? "Create your account and start your journey with us."
                : "Enter your credentials to access your account."}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            {isSignUp && (
              <>
                <div>
                  <label className="mb-2 block text-sm font-bold text-[#102a26]">
                    Full Name
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      {...register("name")}
                      placeholder="Enter your full name"
                      className={inputClass}
                    />
                  </div>

                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-[#102a26]">
                    Select Your Role
                  </label>

                  <select
                    {...register("role")}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-emerald-600"
                  >
                    <option value="student">Student — Find a Tutor</option>
                    <option value="tutor">Tutor — Offer Tuition</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="mb-2 block text-sm font-bold text-[#102a26]">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="example@email.com"
                  className={inputClass}
                />
              </div>

              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-[#102a26]">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`${inputClass} pr-12`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}

              <p className="mt-2 text-xs text-slate-400">
                Password must contain at least 8 characters.
              </p>
            </div>

            {!isSignUp && (
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-emerald-700 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || socialLoading}
              className="primary-button w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Please wait..."
                : isSignUp
                  ? "Create Account"
                  : "Sign In"}

              <ArrowRight size={18} />
            </button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium text-slate-400">
              OR CONTINUE WITH
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={socialLoading || isSubmitting}
              onClick={() => handleSocialLogin("google")}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-bold text-[#14231f] transition hover:bg-slate-50 disabled:opacity-50"
            >
              <span className="text-lg font-extrabold text-blue-600">G</span>
              Google
            </button>

            <button
              type="button"
              disabled={socialLoading || isSubmitting}
              onClick={() => handleSocialLogin("github")}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-bold text-[#14231f] transition hover:bg-slate-50 disabled:opacity-50"
            >
              <span className="text-lg">⌘</span>
              GitHub
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <Link
              href={isSignUp ? "/sign-in" : "/sign-up"}
              className="font-bold text-emerald-700 hover:underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </Link>
          </p>

          <p className="mt-5 text-center text-xs text-slate-400">
            By continuing, you agree to MentorLagbe's Terms of Service and
            Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
