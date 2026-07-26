"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Scale, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { lang, setLang, t } = useLanguage();

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
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-navy/70 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3"
          : "bg-transparent py-6"
      }`}
    >
      {/* Subtle top gradient when not scrolled for better text readability */}
      {!isScrolled && <div className="absolute inset-0 bg-gradient-to-b from-navy/80 to-transparent -z-10" />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Scale className="h-9 w-9 text-gold group-hover:text-white transition-colors" />
            <span className="font-serif text-3xl font-bold text-white tracking-wide">
              Lex<span className="text-gold">Prime</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.nameKey}
                href={link.href}
                className="text-gray-200 hover:text-gold transition-colors font-medium text-base uppercase tracking-wider"
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
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Language Toggle Mobile */}
            {mounted && (
              <button
                onClick={() => setLang(lang === "en" ? "hi" : "en")}
                className="flex items-center gap-1 px-2 py-1 rounded-full border border-white/20 text-white text-xs font-bold"
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
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-gold hover:text-gold transition-all"
                aria-label="Toggle dark mode"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-gold"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
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
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy border-t border-gray-700"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.nameKey}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-lg font-medium text-white hover:text-gold hover:bg-white/5 rounded-md transition-colors"
                >
                  {t(link.nameKey)}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  href="/book-consultation"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center bg-gold text-navy px-6 py-4 rounded font-bold text-lg"
                >
                  {t("nav_book")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
