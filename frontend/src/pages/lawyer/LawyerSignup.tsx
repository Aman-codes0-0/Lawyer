import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  const navigate = useNavigate();
  const { login } = useLawyerAuth();

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

    const newLawyer = {
      id: "lawyer_" + Date.now(),
      name: form.name,
      email: form.email,
      designation: form.designation || "Senior Advocate",
      specialization: form.specialization || "Corporate Law",
      experience: parseInt(form.experience) || 5,
      barRegistration: form.barRegistration,
      education: form.education,
      languages: form.languages,
      isVerified: true,
      password: form.password,
    };

    try {
      await fetch("/api/lawyer/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLawyer),
      });
    } catch {}

    login(newLawyer);
    setSuccess(true);
    setTimeout(() => navigate("/lawyer/dashboard"), 1200);
  };

  const inputCls =
    "w-full pl-10 pr-4 py-3 rounded-lg bg-[#F8F9FA] dark:bg-[#102047] border border-[#EBEAEA] dark:border-white/15 text-[#23232A] dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#214AAB] focus:ring-1 focus:ring-[#214AAB] transition-all text-sm";
  const selectCls =
    "w-full pl-10 pr-4 py-3 rounded-lg bg-[#F8F9FA] dark:bg-[#102047] border border-[#EBEAEA] dark:border-white/15 text-[#23232A] dark:text-white focus:outline-none focus:border-[#214AAB] focus:ring-1 focus:ring-[#214AAB] transition-all text-sm appearance-none";
  const labelCls = "block text-xs font-bold text-[#162F6A] dark:text-gray-200 uppercase tracking-wider mb-1.5";

  return (
    <div className="min-h-[100dvh] bg-[#F1F1F4] dark:bg-[#0E1B38] flex flex-col items-center justify-center relative overflow-y-auto overflow-x-hidden px-4 py-8 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-2xl relative z-10 my-auto py-8"
      >
        <div className="bg-white dark:bg-[#162F6A] border border-[#EBEAEA] dark:border-[#214AAB]/30 rounded-2xl p-6 sm:p-10 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#D2DFFF] dark:bg-[#102047] border border-[#214AAB]/25 mb-3"
            >
              <Scale className="w-7 h-7 text-[#214AAB] dark:text-[#214AAB]" />
            </motion.div>
            <h1 className="font-serif text-3xl font-bold text-[#162F6A] dark:text-white">
              Advocate<span className="text-[#214AAB] dark:text-[#214AAB]"> Registration</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-300 mt-1.5 text-xs">
              Enroll your advocate credentials in the LexPrime legal registry
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
              <p className="text-xs uppercase tracking-widest text-[#214AAB] dark:text-[#214AAB] font-bold mb-3">Personal Information</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full name */}
                <div>
                  <label className={labelCls}>Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#214AAB] dark:text-[#214AAB]" />
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
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#214AAB] dark:text-[#214AAB]" />
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
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#214AAB] dark:text-[#214AAB]" />
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
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm password */}
                <div>
                  <label className={labelCls}>Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#214AAB] dark:text-[#214AAB]" />
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
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                    >
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200 dark:bg-white/10" />

            {/* Section: Professional */}
            <div>
              <p className="text-xs uppercase tracking-widest text-[#214AAB] dark:text-[#214AAB] font-bold mb-3">Professional Details</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Designation */}
                <div>
                  <label className={labelCls}>Designation</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#214AAB] dark:text-[#214AAB]" />
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
                    <Award className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#214AAB] dark:text-[#214AAB]" />
                    <select
                      id="signup-specialization"
                      required
                      value={form.specialization}
                      onChange={update("specialization")}
                      className={selectCls}
                    >
                      <option value="" disabled className="bg-white dark:bg-[#162F6A]">Select specialization</option>
                      {SPECIALIZATIONS.map((s) => (
                        <option key={s} value={s} className="bg-white dark:bg-[#162F6A] text-[#23232A] dark:text-white">{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className={labelCls}>Years of Experience</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#214AAB] dark:text-[#214AAB]" />
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
                    <Award className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#214AAB] dark:text-[#214AAB]" />
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
                    <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#214AAB] dark:text-[#214AAB]" />
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
                    <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#214AAB] dark:text-[#214AAB]" />
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
            <button
              type="submit"
              id="lawyer-signup-submit"
              disabled={loading || success}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg bg-[#214AAB] hover:bg-[#1A3E94] text-white border border-[#214AAB]/40 font-bold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-md mt-2 cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  Creating account...
                </span>
              ) : (
                <>
                  Register Advocate Profile <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
            <span className="text-xs text-gray-400 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
          </div>

          <p className="text-center text-xs text-gray-600 dark:text-gray-300">
            Already registered?{" "}
            <Link to="/lawyer/login" className="text-[#214AAB] dark:text-[#214AAB] hover:underline font-bold transition-colors">
              Sign in to Portal
            </Link>
          </p>
        </div>

        <p className="text-center mt-6 text-xs text-gray-500">
          <Link to="/" className="hover:text-[#214AAB] transition-colors">
            ← Back to Legal Portal
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
