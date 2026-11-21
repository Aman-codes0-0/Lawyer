import { useState } from "react";
import { Link } from "react-router-dom";
import {
  X, Shield, Lock, Eye, EyeOff, RotateCcw,
  ExternalLink, Sparkles, AlertCircle, CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteSettings, SiteSettings } from "@/context/SiteSettingsContext";

export default function QuickAdminDrawer() {
  const {
    settings,
    toggleSetting,
    updateSettings,
    resetSettings,
    isQuickDrawerOpen,
    setIsQuickDrawerOpen,
  } = useSiteSettings();

  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return Boolean(localStorage.getItem("lexprime_admin_session"));
  });

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "1234" || pin === "admin123") {
      localStorage.setItem("lexprime_admin_session", JSON.stringify({ email: "admin@lexprime.com" }));
      setIsUnlocked(true);
      setPinError("");
      setPin("");
    } else {
      setPinError("Incorrect PIN. (Default: 1234)");
    }
  };

  const homeSections: { key: keyof Omit<SiteSettings, "announcementText">; label: string; desc: string }[] = [
    { key: "showHero", label: "Hero Banner", desc: "Main headline, stats strip & primary CTA" },
    { key: "showPracticeAreas", label: "Practice Areas", desc: "4-card legal specialization grid" },
    { key: "showApproach", label: "Our Approach", desc: "Service pills & firm philosophy" },
    { key: "showTeam", label: "Meet Our Advocates", desc: "Top 3 lawyer cards with profiles" },
    { key: "showContactStrip", label: "Contact Strip", desc: "Address, Phone & Email cards" },
    { key: "showCtaBanner", label: "Bottom CTA Banner", desc: "Full-width consultation banner" },
  ];

  const navSections: { key: keyof Omit<SiteSettings, "announcementText">; label: string; desc: string }[] = [
    { key: "showConsultationBtn", label: "Book Consultation Button", desc: "Primary CTA in top navbar" },
    { key: "showLawyerLoginBtn", label: "Lawyer Portal Login", desc: "Lawyer sign-in / profile trigger" },
    { key: "showLangToggle", label: "Language Toggle", desc: "English / Hindi switch in navbar" },
    { key: "showThemeToggle", label: "Theme Switcher", desc: "Dark / Light mode toggle button" },
  ];

  const globalFeatures: { key: keyof Omit<SiteSettings, "announcementText">; label: string; desc: string }[] = [
    { key: "showCustomCursor", label: "Custom Legal Cursor", desc: "Golden scales cursor animation" },
    { key: "showSplashScreen", label: "Splash Screen", desc: "Intro loading screen on initial visit" },
    { key: "showFooterSocials", label: "Footer Social Icons", desc: "Twitter/X, LinkedIn, Facebook icons" },
  ];

  return (
    <AnimatePresence>
      {isQuickDrawerOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsQuickDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-[#162F6A] text-white h-full shadow-2xl flex flex-col z-10 border-l border-[#DDA73A]/30 overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#102047]/90">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#DDA73A]/20 border border-[#DDA73A]/40 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#DDA73A]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif font-bold text-lg text-white">Site Controls</h2>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DDA73A] text-[#162F6A] uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> Easter Egg
                    </span>
                  </div>
                  <p className="text-xs text-blue-200">Real-time frontend section manager</p>
                </div>
              </div>
              <button
                onClick={() => setIsQuickDrawerOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            {!isUnlocked ? (
              /* PIN Lock Screen */
              <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#DDA73A]/20 border border-[#DDA73A]/40 flex items-center justify-center mb-4 text-[#DDA73A]">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-xl text-white mb-2">Admin Authentication</h3>
                <p className="text-xs text-blue-200 mb-6 max-w-xs">
                  Enter Admin PIN to unlock site control panel. Default PIN is <span className="text-[#DDA73A] font-bold font-mono">1234</span>
                </p>

                <form onSubmit={handlePinSubmit} className="w-full max-w-xs space-y-4">
                  {pinError && (
                    <div className="p-2.5 bg-red-500/20 border border-red-500/30 text-red-200 rounded-lg text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      {pinError}
                    </div>
                  )}

                  <input
                    type="password"
                    maxLength={10}
                    value={pin}
                    autoFocus
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter PIN (e.g. 1234)"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-center tracking-widest text-lg font-mono focus:border-[#DDA73A] outline-none"
                  />

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#214AAB] hover:bg-[#DDA73A] hover:text-[#162F6A] text-white font-bold text-sm transition-all shadow-lg cursor-pointer"
                  >
                    Unlock Panel
                  </button>
                </form>
              </div>
            ) : (
              /* Unlocked Controls */
              <div className="flex-1 overflow-y-auto p-5 space-y-6">

                {/* Announcement Bar Control */}
                <div className="bg-[#102047]/80 rounded-xl p-4 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">Top Notice / Alert Bar</p>
                      <p className="text-[11px] text-blue-200">Show urgent banner at the very top</p>
                    </div>
                    <button
                      onClick={() => toggleSetting("showAnnouncementBar")}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                        settings.showAnnouncementBar ? "bg-[#DDA73A]" : "bg-white/20"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.showAnnouncementBar ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  {settings.showAnnouncementBar && (
                    <div className="pt-2">
                      <label className="text-[10px] text-blue-200 uppercase tracking-wider block mb-1">Banner Message</label>
                      <input
                        type="text"
                        value={settings.announcementText}
                        onChange={(e) => updateSettings({ announcementText: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/20 text-xs text-white focus:border-[#DDA73A] outline-none"
                        placeholder="Enter notice text..."
                      />
                    </div>
                  )}
                </div>

                {/* Home Page Sections */}
                <div>
                  <h4 className="text-[11px] font-bold text-[#DDA73A] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    🏠 Home Page Sections
                  </h4>
                  <div className="space-y-2">
                    {homeSections.map((sec) => (
                      <div
                        key={sec.key}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors"
                      >
                        <div className="pr-3">
                          <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                            {sec.label}
                            {settings[sec.key] ? (
                              <Eye className="w-3.5 h-3.5 text-[#DDA73A]" />
                            ) : (
                              <EyeOff className="w-3.5 h-3.5 text-white/40" />
                            )}
                          </p>
                          <p className="text-[11px] text-blue-200">{sec.desc}</p>
                        </div>
                        <button
                          onClick={() => toggleSetting(sec.key)}
                          className={`relative shrink-0 inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                            settings[sec.key] ? "bg-[#DDA73A]" : "bg-white/20"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings[sec.key] ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Controls */}
                <div>
                  <h4 className="text-[11px] font-bold text-[#DDA73A] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    🧭 Header & Navigation
                  </h4>
                  <div className="space-y-2">
                    {navSections.map((sec) => (
                      <div
                        key={sec.key}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors"
                      >
                        <div className="pr-3">
                          <p className="text-sm font-semibold text-white">{sec.label}</p>
                          <p className="text-[11px] text-blue-200">{sec.desc}</p>
                        </div>
                        <button
                          onClick={() => toggleSetting(sec.key)}
                          className={`relative shrink-0 inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                            settings[sec.key] ? "bg-[#DDA73A]" : "bg-white/20"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings[sec.key] ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Global Features */}
                <div>
                  <h4 className="text-[11px] font-bold text-[#DDA73A] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    🎨 Visuals & Extras
                  </h4>
                  <div className="space-y-2">
                    {globalFeatures.map((sec) => (
                      <div
                        key={sec.key}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors"
                      >
                        <div className="pr-3">
                          <p className="text-sm font-semibold text-white">{sec.label}</p>
                          <p className="text-[11px] text-blue-200">{sec.desc}</p>
                        </div>
                        <button
                          onClick={() => toggleSetting(sec.key)}
                          className={`relative shrink-0 inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                            settings[sec.key] ? "bg-[#DDA73A]" : "bg-white/20"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings[sec.key] ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* Footer Actions */}
            {isUnlocked && (
              <div className="p-4 border-t border-white/10 bg-[#102047]/90 space-y-2">
                <div className="flex gap-2">
                  <button
                    onClick={resetSettings}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
                  </button>
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setIsQuickDrawerOpen(false)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#214AAB] hover:bg-[#DDA73A] hover:text-[#162F6A] text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5"
                  >
                    Full Admin <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <p className="text-[10px] text-center text-blue-300">
                  <CheckCircle className="w-3 h-3 inline mr-1 text-[#DDA73A]" />
                  Changes apply immediately in real-time
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
