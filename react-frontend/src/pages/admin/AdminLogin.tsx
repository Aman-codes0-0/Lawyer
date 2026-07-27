import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Scale, Lock, User, AlertCircle } from "lucide-react";

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl border border-gray-100">
        <div className="text-center">
          <Scale className="mx-auto h-12 w-12 text-gold" />
          <h2 className="mt-6 text-3xl font-serif font-bold text-navy">
            Admin Portal
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to manage your firm's website
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-1">
                <User className="w-4 h-4 text-gold" /> Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded bg-gray-50 border border-gray-200 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                placeholder="admin@lexprime.com"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-1">
                <Lock className="w-4 h-4 text-gold" /> Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded bg-gray-50 border border-gray-200 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded shadow-sm text-lg font-bold text-navy bg-gold hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold transition-colors disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
