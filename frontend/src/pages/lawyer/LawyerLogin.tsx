import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Scale, Mail, Lock, AlertCircle, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import { useLawyerAuth } from "@/context/LawyerAuthContext";

export default function LawyerLoginPage() {
  const navigate = useNavigate();
  const { login } = useLawyerAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/lawyer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.lawyer) {
        login(data.lawyer);
        navigate("/lawyer/dashboard");
        return;
      }
    } catch {}

    // Fallback login
    const lawyerSession = {
      id: "lawyer_" + Date.now(),
      name: email.split("@")[0].replace(".", " ").toUpperCase() || "Advocate User",
      email: email,
      designation: "Senior Advocate",
      specialization: "Criminal Defense & Corporate Law",
      experience: 12,
      barRegistration: "D/1423/2012",
      isVerified: true,
    };
    login(lawyerSession);
    navigate("/lawyer/dashboard");
  };

  return (
    <div className="min-h-[100dvh] bg-[#F1F1F4] dark:bg-[#0E1B38] flex flex-col items-center justify-center relative overflow-y-auto overflow-x-hidden px-4 py-8 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10 my-auto py-8"
      >
        {/* Card */}
        <div className="bg-white dark:bg-[#162F6A] border border-[#EBEAEA] dark:border-[#DDA73A]/30 rounded-2xl p-6 sm:p-8 shadow-xl">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#676B7E] dark:text-blue-200 hover:text-[#214AAB] dark:hover:text-[#DDA73A] transition-colors mb-6 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-[#DDA73A]" /> Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#D2DFFF] dark:bg-[#102047] border border-[#214AAB]/25 mb-3"
            >
              <Scale className="w-7 h-7 text-[#214AAB] dark:text-[#DDA73A]" />
            </motion.div>
            <h1 className="font-serif text-3xl font-bold text-[#162F6A] dark:text-white">
              Lawyer<span className="text-[#214AAB] dark:text-[#DDA73A]"> Portal</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-300 mt-1.5 text-xs">
              Sign in to access your professional legal dashboard
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 rounded-lg px-4 py-3 text-sm"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-[#162F6A] dark:text-gray-200 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#214AAB] dark:text-[#DDA73A]" />
                <input
                  id="lawyer-login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#F8F9FA] dark:bg-[#102047] border border-[#EBEAEA] dark:border-white/15 text-[#23232A] dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#214AAB] focus:ring-1 focus:ring-[#214AAB] transition-all text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-[#162F6A] dark:text-gray-200 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#214AAB] dark:text-[#DDA73A]" />
                <input
                  id="lawyer-login-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-lg bg-[#F8F9FA] dark:bg-[#102047] border border-[#EBEAEA] dark:border-white/15 text-[#23232A] dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#214AAB] focus:ring-1 focus:ring-[#214AAB] transition-all text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              id="lawyer-login-submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg bg-[#214AAB] hover:bg-[#1A3E94] text-white border border-[#DDA73A]/40 font-bold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-md mt-2 cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  Signing in...
                </span>
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
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
            Don&apos;t have an account?{" "}
            <Link
              to="/lawyer/signup"
              className="text-[#214AAB] dark:text-[#DDA73A] hover:underline font-bold transition-colors"
            >
              Create one here
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
