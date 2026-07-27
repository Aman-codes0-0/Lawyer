"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Scale, Sun, Moon, UserCircle2, LogOut, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import { useLawyerAuth } from "@/context/LawyerAuthContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lawyerDropdown, setLawyerDropdown] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { lawyer, isLoggedIn, logout } = useLawyerAuth();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLawyerDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLawyerLogout = async () => {
    await logout();
    setLawyerDropdown(false);
    router.push("/lawyer/login");
  };

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { nameKey: "nav_home" as const, href: "/" },
    { nameKey: "nav_about" as const, href: "/about" },
    { nameKey: "nav_team" as const, href: "/team" },
    { nameKey: "nav_blog" as const, href: "/blog" },
    { nameKey: "nav_contact" as const, href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3"
          : "bg-gradient-to-b from-[#050505]/90 via-[#050505]/60 to-transparent backdrop-blur-sm py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group pr-4 shrink-0 min-h-[48px]">
            <Scale className="h-8 w-8 sm:h-9 sm:w-9 text-gold group-hover:text-white transition-colors" />
            <span className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Lex<span className="text-gold">Prime</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.nameKey}
                href={link.href}
                className="text-gray-200 hover:text-gold transition-colors font-medium text-sm lg:text-base uppercase tracking-wider whitespace-nowrap"
              >
                {t(link.nameKey)}
              </Link>
            ))}

            {/* Language Toggle */}
            {mounted && (
              <button
                onClick={() => setLang(lang === "en" ? "hi" : "en")}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/20 text-white hover:border-gold hover:text-gold transition-all text-sm font-bold"
                aria-label="Toggle language"
                id="lang-toggle-desktop"
              >
                <span className={lang === "en" ? "text-gold" : "text-white/60"}>EN</span>
                <span className="text-white/30 mx-0.5">|</span>
                <span className={lang === "hi" ? "text-gold" : "text-white/60"}>हि</span>
              </button>
            )}

            {/* Dark Mode Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-gold hover:text-gold transition-all"
                aria-label="Toggle dark mode"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === "dark" ? (
                    <motion.span
                      key="sun"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-4 h-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="moon"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-4 h-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            )}

            <Link
              href="/book-consultation"
              className="glow-effect bg-gold hover:bg-gold-light text-navy px-8 py-3 rounded font-bold text-lg transition-all transform hover:scale-105"
            >
              {t("nav_consult")}
            </Link>

            {/* Lawyer Portal */}
            <div className="relative" ref={dropdownRef}>
              {!isLoggedIn ? (
                <Link
                  href="/lawyer/login"
                  id="nav-lawyer-login"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/20 text-gray-200 hover:border-gold hover:text-gold transition-all text-sm font-semibold"
                >
                  <UserCircle2 className="w-4 h-4" />
                  Lawyer Login
                </Link>
              ) : (
                <button
                  id="nav-lawyer-avatar"
                  onClick={() => setLawyerDropdown(!lawyerDropdown)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gold/30 bg-gold/10 text-gold hover:bg-gold/20 transition-all text-sm font-semibold"
                >
                  <UserCircle2 className="w-4 h-4" />
                  <span className="max-w-[100px] truncate">{lawyer?.name.split(" ")[0]}</span>
                </button>
              )}
              <AnimatePresence>
                {lawyerDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-52 glass border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-white font-semibold text-sm truncate">{lawyer?.name}</p>
                      <p className="text-gray-500 text-xs truncate">{lawyer?.designation}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/lawyer/dashboard"
                        id="nav-lawyer-dashboard"
                        onClick={() => setLawyerDropdown(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-gold hover:bg-white/5 transition-all"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        My Dashboard
                      </Link>
                      <button
                        id="nav-lawyer-logout"
                        onClick={handleLawyerLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-red-400 hover:bg-white/5 transition-all"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2 sm:gap-3">
            {/* Language Toggle Mobile */}
            {mounted && (
              <button
                onClick={() => setLang(lang === "en" ? "hi" : "en")}
                className="flex items-center justify-center gap-1 min-h-[48px] min-w-[48px] rounded-full border border-white/20 text-white text-xs font-bold"
                aria-label="Toggle language"
                id="lang-toggle-mobile"
              >
                <span className={lang === "en" ? "text-gold" : "text-white/60"}>EN</span>
                <span className="text-white/30">|</span>
                <span className={lang === "hi" ? "text-gold" : "text-white/60"}>हि</span>
              </button>
            )}
            {/* Dark Mode Toggle Mobile */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="min-h-[48px] min-w-[48px] rounded-full border border-white/20 flex items-center justify-center text-white hover:border-gold hover:text-gold transition-all"
                aria-label="Toggle dark mode"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-gold min-h-[48px] min-w-[48px] flex items-center justify-center rounded-full"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy/95 backdrop-blur-xl border-t border-white/10 overflow-y-auto fixed top-[73px] left-0 right-0 z-40 pb-20"
          >
            <div className="px-4 pt-4 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.nameKey}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-4 text-xl font-medium text-white hover:text-gold hover:bg-white/5 rounded-xl transition-colors"
                >
                  {t(link.nameKey)}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <Link
                  href="/book-consultation"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center bg-gold text-navy px-6 py-4 rounded font-bold text-lg"
                >
                  {t("nav_book")}
                </Link>
                {!isLoggedIn ? (
                  <Link
                    href="/lawyer/login"
                    id="nav-mobile-lawyer-login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full text-center border border-gold/40 text-gold px-6 py-3 rounded font-bold text-base"
                  >
                    <UserCircle2 className="w-4 h-4" />
                    Lawyer Login
                  </Link>
                ) : (
                  <div className="glass border border-white/10 rounded-lg p-4">
                    <p className="text-white font-semibold text-sm">{lawyer?.name}</p>
                    <p className="text-gray-400 text-xs mb-3">{lawyer?.designation}</p>
                    <div className="flex gap-2">
                      <Link
                        href="/lawyer/dashboard"
                        id="nav-mobile-lawyer-dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gold/10 border border-gold/30 text-gold rounded text-sm font-semibold"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        Dashboard
                      </Link>
                      <button
                        id="nav-mobile-lawyer-logout"
                        onClick={() => { handleLawyerLogout(); setMobileMenuOpen(false); }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-white/10 text-gray-400 rounded text-sm font-semibold hover:text-red-400"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
