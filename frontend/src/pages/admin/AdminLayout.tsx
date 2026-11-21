import { useEffect } from "react";
import { useNavigate, useLocation, Link, Outlet } from "react-router-dom";
import { Scale, Users, Calendar, MessageSquare, LogOut, LayoutDashboard, Sliders, ArrowLeft } from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const session = localStorage.getItem("lexprime_admin_session");
    if (!session) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("lexprime_admin_session");
    navigate("/admin/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Site Controls", href: "/admin/dashboard/site-settings", icon: Sliders },
    { name: "Appointments", href: "/admin/dashboard/appointments", icon: Calendar },
    { name: "Enquiries", href: "/admin/dashboard/enquiries", icon: MessageSquare },
    { name: "Lawyers", href: "/admin/dashboard/lawyers", icon: Users },
  ];

  return (
    <div className="min-h-screen flex bg-[#F1F1F4] dark:bg-[#0E1B38] text-[#23232A] dark:text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#162F6A] border-r border-[#102047] text-white flex flex-col hidden md:flex fixed h-full z-10 shadow-xl">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <Scale className="h-8 w-8 text-[#DDA73A]" />
            <span className="font-serif text-xl font-bold tracking-wide text-white">
              Lex<span className="text-[#DDA73A]">Admin</span>
            </span>
          </Link>
          <Link
            to="/"
            title="Return to Public Website"
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-[#DDA73A] hover:text-white flex items-center justify-center transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-[#214AAB] text-white font-bold border-l-4 border-l-[#DDA73A] shadow-sm"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-[#DDA73A]" : "text-blue-200"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#DDA73A]" /> Back to Public Website
          </Link>

          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            <div className="w-9 h-9 rounded-xl bg-[#DDA73A]/20 border border-[#DDA73A]/40 flex items-center justify-center text-[#DDA73A] font-bold">
              A
            </div>
            <div>
              <p className="text-sm font-bold text-white">Super Admin</p>
              <p className="text-xs text-blue-200">LexPrime Firm</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-blue-200 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer text-xs font-semibold"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
