"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scale, Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight,
  User, Briefcase, BookOpen, Award, Globe, CheckCircle2,
} from "lucide-react";
import { useLawyerAuth } from "@/context/LawyerAuthContext";

const SPECIALIZATIONS = [
  "Corporate Law", "Criminal Law", "Family Law", "Civil Litigation",
  "Intellectual Property", "Real Estate Law", "Tax Law", "Employment Law",
  "Constitutional Law", "Environmental Law", "Cyber Law", "Banking & Finance",
];

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  designation: string;
  specialization: string;
  experience: string;
  education: string;
  barRegistration: string;
  languages: string;
}

export default function LawyerSignupPage() {
  const router = useRouter();
  const { refresh } = useLawyerAuth();

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    designation: "",
    specialization: "",
    experience: "",
    education: "",
    barRegistration: "",
    languages: "English",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/lawyer/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          designation: form.designation,
          specialization: form.specialization,
          experience: form.experience,
          education: form.education,
          barRegistration: form.barRegistration,
          languages: form.languages,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      await refresh();
      setTimeout(() => router.push("/lawyer/dashboard"), 1500);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const inputCls =
    "w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/40 transition-all text-sm";
  const selectCls =
    "w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/40 transition-all text-sm appearance-none";
  const labelCls = "block text-sm font-semibold text-gray-300 mb-1.5";

  return (
    <div className="min-h-[100dvh] bg-navy flex flex-col items-center justify-center relative overflow-y-auto overflow-x-hidden px-4 py-8 sm:py-20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl relative z-10 my-auto py-8"
      >
        <div className="glass border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 border border-gold/30 mb-4"
            >
              <Scale className="w-8 h-8 text-gold" />
            </motion.div>
            <h1 className="font-serif text-3xl font-bold text-white">
              Join <span className="text-gold">LexPrime</span>
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              Create your lawyer account and manage your professional presence
            </p>
          </div>

          {/* Success state */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg px-4 py-4 text-sm font-medium"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                Account created! Redirecting to your dashboard...
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Section: Personal */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gold/70 font-semibold mb-3">Personal Information</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full name */}
                <div>
                  <label className={labelCls}>Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      id="signup-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={update("name")}
                      className={inputCls}
                      placeholder="Adv. John Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className={labelCls}>Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      id="signup-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={update("email")}
                      className={inputCls}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className={labelCls}>Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={form.password}
                      onChange={update("password")}
                      className={`${inputCls} pr-12`}
                      placeholder="Min. 8 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm password */}
                <div>
                  <label className={labelCls}>Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      id="signup-confirm-password"
                      type={showConfirm ? "text" : "password"}
                      required
                      value={form.confirmPassword}
                      onChange={update("confirmPassword")}
                      className={`${inputCls} pr-12`}
                      placeholder="Repeat password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/5" />

            {/* Section: Professional */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gold/70 font-semibold mb-3">Professional Details</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Designation */}
                <div>
                  <label className={labelCls}>Designation</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      id="signup-designation"
                      type="text"
                      required
                      value={form.designation}
                      onChange={update("designation")}
                      className={inputCls}
                      placeholder="e.g. Senior Advocate"
                    />
                  </div>
                </div>

                {/* Specialization */}
                <div>
                  <label className={labelCls}>Specialization</label>
                  <div className="relative">
                    <Award className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <select
                      id="signup-specialization"
                      required
                      value={form.specialization}
                      onChange={update("specialization")}
                      className={selectCls}
                    >
                      <option value="" disabled className="bg-navy">Select specialization</option>
                      {SPECIALIZATIONS.map((s) => (
                        <option key={s} value={s} className="bg-navy">{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className={labelCls}>Years of Experience</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      id="signup-experience"
                      type="number"
                      required
                      min="0"
                      max="60"
                      value={form.experience}
                      onChange={update("experience")}
                      className={inputCls}
                      placeholder="e.g. 5"
                    />
                  </div>
                </div>

                {/* Bar Registration */}
                <div>
                  <label className={labelCls}>Bar Registration No.</label>
                  <div className="relative">
                    <Award className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      id="signup-bar-registration"
                      type="text"
                      required
                      value={form.barRegistration}
                      onChange={update("barRegistration")}
                      className={inputCls}
                      placeholder="e.g. BAR/DL/2015/12345"
                    />
                  </div>
                </div>

                {/* Education */}
                <div>
                  <label className={labelCls}>Education</label>
                  <div className="relative">
                    <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      id="signup-education"
                      type="text"
                      required
                      value={form.education}
                      onChange={update("education")}
                      className={inputCls}
                      placeholder="e.g. LLB, Delhi University"
                    />
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <label className={labelCls}>Languages</label>
                  <div className="relative">
                    <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      id="signup-languages"
                      type="text"
                      value={form.languages}
                      onChange={update("languages")}
                      className={inputCls}
                      placeholder="e.g. English, Hindi"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              id="lawyer-signup-submit"
              disabled={loading || success}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg bg-gold text-navy font-bold text-base hover:bg-gold-light transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-gold/20 mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Creating account...
                </span>
              ) : (
                <>
                  Create Account <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-gray-500 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/lawyer/login" className="text-gold hover:text-gold-light font-semibold transition-colors">
              Sign in here
            </Link>
          </p>
        </div>

        <p className="text-center mt-6 text-xs text-gray-600">
          <Link href="/" className="hover:text-gray-400 transition-colors">
            ← Back to LexPrime
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
