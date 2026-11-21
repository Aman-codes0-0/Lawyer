import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Scale, Sun, Moon, UserCircle2, LogOut, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import { useLawyerAuth } from "@/context/LawyerAuthContext";
import { useSiteSettings } from "@/context/SiteSettingsContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lawyerDropdown, setLawyerDropdown] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { lawyer, isLoggedIn, logout } = useLawyerAuth();
  const { settings, setIsQuickDrawerOpen } = useSiteSettings();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Easter Egg 4-Click State
  const [clickCount, setClickCount] = useState(0);
  const [isEasterGlow, setIsEasterGlow] = useState(false);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogoClick = (e: React.MouseEvent) => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      setClickCount(0);
    }, 2500);

    if (nextCount >= 4) {
      e.preventDefault();
      setClickCount(0);
      setIsEasterGlow(true);
      setTimeout(() => setIsEasterGlow(false), 2500);
      setIsQuickDrawerOpen(true);
    }
  };

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
    navigate("/lawyer/login");
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
          ? "bg-[#162F6A] shadow-xl border-b border-[#214AAB]/30 py-3"
          : "bg-[#162F6A] border-b border-[#102047] py-4"
      }`}
    >
      {/* Optional Announcement Bar */}
      {settings.showAnnouncementBar && (
        <div className="bg-[#214AAB] text-[#162F6A] text-xs font-bold py-1.5 px-4 text-center border-b border-[#162F6A]/20 flex items-center justify-center gap-2 -mt-4 mb-3">
          <span className="bg-[#162F6A] text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Announcement</span>
          <span>{settings.announcementText}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo with 4-Click Easter Egg */}
          <div
            onClick={handleLogoClick}
            className={`flex items-center gap-2 group pr-4 shrink-0 min-h-[48px] cursor-pointer select-none transition-all ${
              isEasterGlow ? "scale-105" : ""
            }`}
            title={clickCount > 0 ? `${4 - clickCount} clicks to secret menu` : undefined}
          >
            <div
              className={`w-10 h-10 rounded-lg bg-[#DDA73A]/15 border border-[#DDA73A]/40 flex items-center justify-center transition-all ${
                isEasterGlow
                  ? "ring-4 ring-[#DDA73A] bg-[#DDA73A]/40 shadow-[0_0_20px_#DDA73A]"
                  : "group-hover:bg-[#DDA73A]/25"
              }`}
            >
              <Scale className={`h-6 w-6 text-[#DDA73A] ${isEasterGlow ? "animate-bounce" : ""}`} />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-2xl font-bold text-white tracking-wide leading-tight">
                Lex<span className="text-[#DDA73A]">Prime</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#A3BBF3] font-semibold -mt-0.5">
                Legal Portal
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.nameKey}
                to={link.href}
                className="text-white hover:text-[#214AAB] transition-colors font-medium text-sm lg:text-sm uppercase tracking-wider whitespace-nowrap relative py-1 group"
              >
                {t(link.nameKey)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#214AAB] transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}

            {/* Language Toggle */}
            {mounted && settings.showLangToggle && (
              <button
                onClick={() => setLang(lang === "en" ? "hi" : "en")}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-white/20 text-white hover:border-[#214AAB] hover:text-[#214AAB] transition-all text-xs font-bold cursor-pointer"
                aria-label="Toggle language"
                id="lang-toggle-desktop"
              >
                <span className={lang === "en" ? "text-white" : "text-white/60"}>EN</span>
                <span className="text-white/30 mx-0.5">|</span>
                <span className={lang === "hi" ? "text-white" : "text-white/60"}>हि</span>
              </button>
            )}



            {settings.showConsultationBtn && (
              <Link
                to="/book-consultation"
                className="bg-[#214AAB] hover:bg-[#1A3E94] text-white border border-[#214AAB]/40 px-5 py-2.5 rounded-md font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-[#214AAB]/30"
              >
                {t("nav_consult")}
              </Link>
            )}

            {/* Lawyer Portal */}
            {settings.showLawyerLoginBtn && (
              <div className="relative" ref={dropdownRef}>
              {!isLoggedIn ? (
                <Link
                  to="/lawyer/login"
                  id="nav-lawyer-login"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-white/20 text-white hover:border-[#214AAB] hover:text-[#214AAB] transition-all text-xs font-semibold"
                >
                  <UserCircle2 className="w-4 h-4 text-[#214AAB]" />
                  Lawyer Login
                </Link>
              ) : (
                <button
                  id="nav-lawyer-avatar"
                  onClick={() => setLawyerDropdown(!lawyerDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#214AAB]/40 bg-[#214AAB]/15 text-[#214AAB] hover:bg-[#214AAB]/25 transition-all text-xs font-semibold cursor-pointer"
                >
                  <UserCircle2 className="w-4 h-4" />
                  <span className="max-w-[90px] truncate">{lawyer?.name.split(" ")[0]}</span>
                </button>
              )}
              <AnimatePresence>
                {lawyerDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-52 bg-[#162F6A] border border-[#214AAB]/30 rounded-xl shadow-2xl overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-white font-semibold text-sm truncate">{lawyer?.name}</p>
                      <p className="text-gray-300 text-xs truncate">{lawyer?.designation}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/lawyer/dashboard"
                        id="nav-lawyer-dashboard"
                        onClick={() => setLawyerDropdown(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-200 hover:text-[#214AAB] hover:bg-white/5 transition-all"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        My Dashboard
                      </Link>
                      <button
                        id="nav-lawyer-logout"
                        onClick={handleLawyerLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-200 hover:text-red-400 hover:bg-white/5 transition-all cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2 sm:gap-3">
            {mounted && settings.showLangToggle && (
              <button
                onClick={() => setLang(lang === "en" ? "hi" : "en")}
                className="flex items-center justify-center gap-1 min-h-[44px] min-w-[44px] rounded-md border border-white/20 text-white text-xs font-bold"
                aria-label="Toggle language"
                id="lang-toggle-mobile"
              >
                <span className={lang === "en" ? "text-[#214AAB]" : "text-white/60"}>EN</span>
                <span className="text-white/30">|</span>
                <span className={lang === "hi" ? "text-[#214AAB]" : "text-white/60"}>हि</span>
              </button>
            )}
            {mounted && settings.showThemeToggle && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="min-h-[44px] min-w-[44px] rounded-md border border-white/20 flex items-center justify-center text-white hover:border-[#214AAB] hover:text-[#214AAB] transition-all"
                aria-label="Toggle dark mode"
              >
                {theme === "dark" ? <Sun className="w-4 h-4 text-[#214AAB]" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-[#214AAB] min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md"
              aria-label="Menu"
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
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#162F6A] border-t border-[#214AAB]/20 overflow-y-auto fixed top-[65px] left-0 right-0 z-40 pb-20 shadow-2xl"
          >
            <div className="px-4 pt-4 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.nameKey}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-lg font-medium text-white hover:text-[#214AAB] hover:bg-white/5 rounded-lg transition-colors border-b border-white/5"
                >
                  {t(link.nameKey)}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                {settings.showConsultationBtn && (
                  <Link
                    to="/book-consultation"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center bg-[#214AAB] text-white border border-[#214AAB]/40 px-6 py-3.5 rounded-lg font-bold text-base shadow-lg"
                  >
                    {t("nav_book")}
                  </Link>
                )}
                {settings.showLawyerLoginBtn && (
                  !isLoggedIn ? (
                    <Link
                      to="/lawyer/login"
                      id="nav-mobile-lawyer-login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full text-center border border-[#214AAB]/40 text-[#214AAB] px-6 py-3 rounded-lg font-bold text-base"
                    >
                      <UserCircle2 className="w-4 h-4" />
                      Lawyer Login
                    </Link>
                  ) : (
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <p className="text-white font-semibold text-sm">{lawyer?.name}</p>
                      <p className="text-gray-300 text-xs mb-3">{lawyer?.designation}</p>
                      <div className="flex gap-2">
                        <Link
                          to="/lawyer/dashboard"
                          id="nav-mobile-lawyer-dashboard"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#214AAB]/10 border border-[#214AAB]/30 text-[#214AAB] rounded text-sm font-semibold"
                        >
                          <LayoutDashboard className="w-3.5 h-3.5" />
                          Dashboard
                        </Link>
                        <button
                          id="nav-mobile-lawyer-logout"
                          onClick={() => { handleLawyerLogout(); setMobileMenuOpen(false); }}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-white/10 text-gray-300 rounded text-sm font-semibold hover:text-red-400"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
