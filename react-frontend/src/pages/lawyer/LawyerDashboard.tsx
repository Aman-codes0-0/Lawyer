import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Scale, Award, Briefcase, BookOpen, Globe,
  LogOut, Calendar, Mail, Shield, ChevronRight,
  LayoutDashboard, User, Phone, Bell, Settings,
  TrendingUp, FileText, Clock, Star,
} from "lucide-react";
import { useLawyerAuth } from "@/context/LawyerAuthContext";

/* ─── Sidebar Nav Items ──────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "profile",  label: "My Profile", icon: User },
  { id: "cases",    label: "Appointments", icon: Calendar },
  { id: "docs",     label: "Documents", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

/* ─── Stat Card ──────────────────────────────────────────────────── */
function KpiCard({
  icon: Icon,
  label,
  value,
  sub,
  color = "gold",
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  color?: "gold" | "emerald" | "blue" | "purple";
  delay?: number;
}) {
  const colors = {
    gold:    { bg: "bg-gold/10",    border: "border-gold/20",    text: "text-gold",    ring: "ring-gold/20" },
    emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400", ring: "ring-emerald-400/20" },
    blue:    { bg: "bg-blue-500/10",  border: "border-blue-500/20",  text: "text-blue-400",  ring: "ring-blue-400/20" },
    purple:  { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400", ring: "ring-purple-400/20" },
  }[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-4 sm:p-6 hover:bg-white/[0.06] transition-colors group"
    >
      {/* Glow */}
      <div className={`absolute -top-6 -right-6 w-24 h-24 ${colors.bg} rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity`} />

      <div className="relative">
        <div className={`inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl ${colors.bg} border ${colors.border} mb-3 sm:mb-4`}>
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${colors.text}`} />
        </div>
        <p className="text-xl sm:text-2xl font-bold text-white tracking-tight break-words">{value || "—"}</p>
        <p className="text-xs sm:text-sm text-gray-400 mt-0.5">{label}</p>
        {sub && <p className={`text-[10px] sm:text-xs font-semibold mt-1 sm:mt-2 ${colors.text}`}>{sub}</p>}
      </div>
    </motion.div>
  );
}

/* ─── Profile Field Row ──────────────────────────────────────────── */
function ProfileRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-3.5 border-b border-white/5 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/15 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-3.5 h-3.5 text-gold" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
        <p className="text-sm text-white font-medium mt-0.5 break-words">{value || "—"}</p>
      </div>
    </div>
  );
}

/* ─── Activity Item ──────────────────────────────────────────────── */
function ActivityItem({ icon: Icon, title, time, color }: { icon: React.ElementType; title: string; time: string; color: string }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${color}`}>
        <Icon className="w-3.5 h-3.5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-200 font-medium truncate">{title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{time}</p>
      </div>
    </div>
  );
}

/* ─── Main Dashboard ─────────────────────────────────────────────── */
export default function LawyerDashboardPage() {
  const navigate = useNavigate();
  const { lawyer, isLoggedIn, isLoading, logout } = useLawyerAuth();
  const [activeNav, setActiveNav] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) navigate("/lawyer/login");
  }, [isLoading, isLoggedIn, navigate]);

  const handleLogout = async () => { await logout(); navigate("/lawyer/login"); };

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-gold/20 border-t-gold animate-spin" />
          <p className="text-gray-500 text-sm">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn || !lawyer) return null;

  const initials = lawyer.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const l = lawyer as typeof lawyer & { education?: string; languages?: string };

  return (
    <div className="min-h-[100dvh] bg-[#050505] flex">

      {/* ── Sidebar ── */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 flex flex-col w-64 bg-[#0a0a0a] border-r border-white/5
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0 lg:flex
      `}>
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-6 py-5 border-b border-white/5">
          <Scale className="w-7 h-7 text-gold" />
          <span className="font-serif text-xl font-bold text-white">
            Lex<span className="text-gold">Prime</span>
          </span>
        </div>

        {/* Avatar */}
        <div className="px-4 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/50 to-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
              <span className="text-gold font-serif font-bold text-sm">{initials}</span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">{lawyer.name}</p>
              <p className="text-gray-500 text-xs truncate">{lawyer.designation}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveNav(id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer
                ${activeNav === id
                  ? "bg-gold/10 text-gold border border-gold/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"}
              `}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </button>
          ))}
        </nav>

        {/* Sign out */}
        <div className="px-3 py-4 border-t border-white/5">
          <button
            id="lawyer-dashboard-logout"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Sign Out
          </button>
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all mt-0.5">
            <Scale className="w-4 h-4 shrink-0" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Sidebar backdrop (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#050505]/80 backdrop-blur-sm sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-gray-400 hover:text-white cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-white font-semibold text-base capitalize">
                {activeNav === "overview" ? "Dashboard" : NAV_ITEMS.find(n => n.id === activeNav)?.label}
              </h1>
              <p className="text-gray-500 text-xs">
                {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-gold rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold/40 to-gold/10 border border-gold/30 flex items-center justify-center">
              <span className="text-gold font-bold text-xs">{initials}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* ── OVERVIEW TAB ── */}
          {activeNav === "overview" && (
            <>
              {/* Welcome Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/10 via-gold/5 to-transparent p-5 sm:p-6"
              >
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-gold/10 rounded-full blur-3xl" />
                <div className="absolute -right-4 top-1/2 -translate-y-1/2">
                  <Scale className="w-24 h-24 text-gold/5" />
                </div>
                <div className="relative">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold mb-3
                    ${lawyer.isVerified
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                      : "border-amber-500/40 bg-amber-500/10 text-amber-400"}`
                  }>
                    <Shield className="w-3 h-3" />
                    {lawyer.isVerified ? "Verified Professional" : "Pending Verification"}
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-1">
                    Good morning, {lawyer.name.split(" ")[0]} 👋
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {lawyer.designation} &bull; {lawyer.specialization}
                  </p>
                </div>
              </motion.div>

              {/* KPI Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <KpiCard icon={Briefcase} label="Years of Experience" value={`${lawyer.experience ?? 0}+`} sub="Years active" color="gold" delay={0.05} />
                <KpiCard icon={Star} label="Specialization" value={lawyer.specialization.split(" ")[0]} sub={lawyer.specialization} color="blue" delay={0.1} />
                <KpiCard icon={Award} label="Bar Registration" value="Active" sub={lawyer.barRegistration ?? ""} color="emerald" delay={0.15} />
                <KpiCard icon={TrendingUp} label="Profile Status" value={lawyer.isVerified ? "Verified" : "Pending"} sub="Verification status" color="purple" delay={0.2} />
              </div>

              {/* Two-col grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Profile Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="lg:col-span-2 rounded-2xl border border-white/8 bg-white/[0.03] p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold">Profile Summary</h3>
                    <button
                      onClick={() => setActiveNav("profile")}
                      className="text-xs text-gold hover:text-gold-light font-medium flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      View all <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="space-y-0">
                    <ProfileRow icon={Mail}     label="Email"           value={lawyer.email} />
                    <ProfileRow icon={Briefcase} label="Designation"     value={lawyer.designation} />
                    <ProfileRow icon={BookOpen}  label="Education"       value={l.education ?? ""} />
                    <ProfileRow icon={Globe}     label="Languages"       value={l.languages ?? ""} />
                  </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] p-6"
                >
                  <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-0">
                    <ActivityItem icon={User}     title="Account active"       time="Just now"         color="bg-gold/10 text-gold" />
                    <ActivityItem icon={Shield}   title="Verified Member"      time="Active"           color="bg-emerald-500/10 text-emerald-400" />
                    <ActivityItem icon={Clock}    title="Profile synced"       time="Up to date"       color="bg-blue-500/10 text-blue-400" />
                    <ActivityItem icon={Bell}     title="No new notifications" time="All caught up"     color="bg-emerald-500/10 text-emerald-400" />
                  </div>
                </motion.div>
              </div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {[
                  { id: "qa-consultation", icon: Calendar, label: "Book a Consultation", desc: "Schedule a client meeting", href: "/book-consultation", badge: null },
                  { id: "qa-team",         icon: User,     label: "View Team Page",        desc: "See your public profile",   href: "/team",              badge: "Public" },
                  { id: "qa-practice",     icon: Award,    label: "Our Experts",           desc: "Connect with attorneys",    href: "/team",              badge: null },
                ].map(({ id, icon: Icon, label, desc, href, badge }) => (
                  <Link
                    key={id} id={id} to={href}
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/8 bg-white/[0.03] hover:border-gold/25 hover:bg-white/[0.06] transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 group-hover:bg-gold/15 transition-colors">
                      <Icon className="w-4.5 h-4.5 text-gold" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-white font-medium truncate">{label}</p>
                        {badge && <span className="shrink-0 text-xs px-1.5 py-0.5 rounded bg-gold/15 text-gold font-medium">{badge}</span>}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gold transition-colors shrink-0" />
                  </Link>
                ))}
              </motion.div>
            </>
          )}

          {/* ── PROFILE TAB ── */}
          {activeNav === "profile" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl space-y-6">
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/40 to-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                  <span className="text-gold font-serif text-2xl font-bold">{initials}</span>
                </div>
                <div>
                  <h2 className="text-white text-xl font-bold font-serif">{lawyer.name}</h2>
                  <p className="text-gray-400 text-sm mt-0.5">{lawyer.designation} &bull; {lawyer.specialization}</p>
                  <div className={`mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold
                    ${lawyer.isVerified ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" : "border-amber-500/40 bg-amber-500/10 text-amber-400"}`}>
                    <Shield className="w-3 h-3" />
                    {lawyer.isVerified ? "Verified" : "Pending Verification"}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6">
                <h3 className="text-white font-semibold mb-1">Professional Information</h3>
                <p className="text-gray-500 text-xs mb-4">Your registered professional details</p>
                <div>
                  <ProfileRow icon={Mail}     label="Email Address"    value={lawyer.email} />
                  <ProfileRow icon={Briefcase} label="Designation"      value={lawyer.designation} />
                  <ProfileRow icon={Award}    label="Specialization"   value={lawyer.specialization} />
                  <ProfileRow icon={TrendingUp} label="Experience"       value={`${lawyer.experience ?? 0} years`} />
                  <ProfileRow icon={BookOpen}  label="Education"        value={l.education ?? ""} />
                  <ProfileRow icon={Globe}     label="Languages"        value={l.languages ?? ""} />
                  <ProfileRow icon={Phone}     label="Bar Registration" value={lawyer.barRegistration ?? ""} />
                </div>
              </div>

              <p className="text-xs text-gray-600 text-center">To update your details, contact the admin panel.</p>
            </motion.div>
          )}

          {/* ── OTHER TABS (placeholder) ── */}
          {(activeNav === "cases" || activeNav === "docs" || activeNav === "settings") && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex-1 flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4">
                  {(() => { const I = NAV_ITEMS.find(n => n.id === activeNav)!.icon; return <I className="w-7 h-7 text-gold" />; })()}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2 capitalize">
                  {NAV_ITEMS.find(n => n.id === activeNav)?.label}
                </h3>
                <p className="text-gray-500 text-sm">This section is coming soon.</p>
              </div>
            </motion.div>
          )}

        </main>
      </div>
    </div>
  );
}
