import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Scale, Lock, User, AlertCircle, ArrowLeft } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (email === "admin@lexprime.com" && password === "admin123") {
      localStorage.setItem("lexprime_admin_session", JSON.stringify({ email }));
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials. Try admin@lexprime.com / admin123");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F1F4] dark:bg-[#07172F] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#214AAB]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#DDA73A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-6 bg-white dark:bg-[#162F6A] p-8 sm:p-10 rounded-2xl shadow-xl border border-[#EBEAEA] dark:border-white/10 relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#676B7E] dark:text-blue-200 hover:text-[#214AAB] dark:hover:text-[#DDA73A] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#DDA73A]" /> Back to Home
        </Link>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#162F6A] text-[#DDA73A] shadow-md mb-4">
            <Scale className="h-8 w-8" />
          </div>
          <h2 className="mt-2 text-3xl font-serif font-bold text-[#162F6A] dark:text-white">
            Admin <span className="text-[#DDA73A]">Portal</span>
          </h2>
          <p className="mt-2 text-sm text-[#676B7E] dark:text-blue-100">
            Sign in to manage your legal firm's platform
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-600 p-3.5 rounded-xl flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-[#162F6A] dark:text-gray-200 flex items-center gap-2 mb-1.5">
                <User className="w-4 h-4 text-[#214AAB] dark:text-[#DDA73A]" /> Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0E1B38] border border-[#EBEAEA] dark:border-white/20 text-[#23232A] dark:text-white placeholder-gray-400 focus:bg-white focus:border-[#214AAB] focus:ring-1 focus:ring-[#214AAB] outline-none transition-all text-sm"
                placeholder="admin@lexprime.com"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#162F6A] dark:text-gray-200 flex items-center gap-2 mb-1.5">
                <Lock className="w-4 h-4 text-[#214AAB] dark:text-[#DDA73A]" /> Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#0E1B38] border border-[#EBEAEA] dark:border-white/20 text-[#23232A] dark:text-white placeholder-gray-400 focus:bg-white focus:border-[#214AAB] focus:ring-1 focus:ring-[#214AAB] outline-none transition-all text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3.5 px-4 rounded-xl shadow-md text-base font-bold text-white bg-[#214AAB] hover:bg-[#162F6A] focus:outline-none transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Signing in..." : "Sign In to Admin"}
            </button>
          </div>

          <div className="text-center pt-2 border-t border-[#EBEAEA] dark:border-white/10">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#676B7E] dark:text-blue-200 hover:text-[#214AAB] dark:hover:text-[#DDA73A] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Website Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
