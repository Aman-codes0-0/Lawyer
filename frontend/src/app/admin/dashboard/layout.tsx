"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Scale, Users, Calendar, MessageSquare, Settings, LogOut, LayoutDashboard } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Appointments", href: "/admin/dashboard/appointments", icon: Calendar },
    { name: "Enquiries", href: "/admin/dashboard/enquiries", icon: MessageSquare },
    { name: "Lawyers", href: "/admin/dashboard/lawyers", icon: Users },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white flex flex-col hidden md:flex fixed h-full z-10">
        <div className="p-6">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <Scale className="h-8 w-8 text-gold" />
            <span className="font-serif text-xl font-bold tracking-wide">
              Lex<span className="text-gold">Admin</span>
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded transition-colors ${
                  isActive ? "bg-gold text-navy font-bold" : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
              A
            </div>
            <div>
              <p className="text-sm font-bold text-white">Admin</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded text-red-400 hover:bg-white/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
