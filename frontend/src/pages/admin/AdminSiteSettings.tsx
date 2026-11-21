import { Shield, Eye, EyeOff, RotateCcw, CheckCircle, Sparkles, Sliders } from "lucide-react";
import { useSiteSettings, SiteSettings } from "@/context/SiteSettingsContext";

export default function AdminSiteSettings() {
  const { settings, toggleSetting, updateSettings, resetSettings } = useSiteSettings();

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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#214AAB]/20 text-[#162F6A] dark:text-[#214AAB] border border-[#214AAB]/40 mb-2">
            <Sliders className="w-3.5 h-3.5" /> Frontend Configuration
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#162F6A] dark:text-white">
            Site Controls &amp; Visibility
          </h1>
          <p className="text-sm text-[#676B7E] dark:text-blue-100">
            Control which sections and components appear on the public website in real-time.
          </p>
        </div>

        <button
          onClick={resetSettings}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#EBEAEA] dark:border-white/20 bg-white dark:bg-[#162F6A] hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 text-xs font-bold text-[#162F6A] dark:text-white transition-all shadow-sm cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" /> Reset to Defaults
        </button>
      </div>

      {/* Top Banner Notice Control */}
      <div className="bg-white dark:bg-[#162F6A] rounded-2xl p-6 shadow-sm border border-[#EBEAEA] dark:border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#214AAB]/20 border border-[#214AAB]/40 flex items-center justify-center text-[#214AAB]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#162F6A] dark:text-white">
                Urgent Announcement / Notice Bar
              </h3>
              <p className="text-xs text-[#676B7E] dark:text-blue-200">
                Display a highlighted gold notice banner at the very top of the website
              </p>
            </div>
          </div>

          <button
            onClick={() => toggleSetting("showAnnouncementBar")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
              settings.showAnnouncementBar ? "bg-[#214AAB]" : "bg-gray-300 dark:bg-white/20"
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
          <div className="pt-3 border-t border-[#EBEAEA] dark:border-white/10">
            <label className="text-xs font-bold text-[#162F6A] dark:text-blue-200 uppercase tracking-wider block mb-1.5">
              Banner Text Content
            </label>
            <input
              type="text"
              value={settings.announcementText}
              onChange={(e) => updateSettings({ announcementText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1B38] border border-[#EBEAEA] dark:border-white/20 text-sm text-[#23232A] dark:text-white focus:border-[#214AAB] outline-none"
              placeholder="e.g. Notice: Online Consultation and Advisory services are active for 2026."
            />
          </div>
        )}
      </div>

      {/* Grid: Home Page & Nav Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Home Page Sections */}
        <div className="bg-white dark:bg-[#162F6A] rounded-2xl p-6 shadow-sm border border-[#EBEAEA] dark:border-white/10 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#EBEAEA] dark:border-white/10">
            <Shield className="w-5 h-5 text-[#214AAB] dark:text-[#214AAB]" />
            <h2 className="font-serif font-bold text-lg text-[#162F6A] dark:text-white">
              Home Page Sections
            </h2>
          </div>

          <div className="space-y-3">
            {homeSections.map((sec) => (
              <div
                key={sec.key}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1B38]/50 border border-[#EBEAEA] dark:border-white/10 hover:border-[#214AAB]/30 transition-all"
              >
                <div className="pr-4">
                  <p className="text-sm font-semibold text-[#162F6A] dark:text-white flex items-center gap-2">
                    {sec.label}
                    {settings[sec.key] ? (
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Eye className="w-3 h-3" /> Visible
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-gray-500 bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <EyeOff className="w-3 h-3" /> Hidden
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-[#676B7E] dark:text-blue-200 mt-0.5">{sec.desc}</p>
                </div>
                <button
                  onClick={() => toggleSetting(sec.key)}
                  className={`relative shrink-0 inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                    settings[sec.key] ? "bg-[#214AAB]" : "bg-gray-300 dark:bg-white/20"
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

        {/* Navigation & Global Features */}
        <div className="space-y-6">

          {/* Navigation Items */}
          <div className="bg-white dark:bg-[#162F6A] rounded-2xl p-6 shadow-sm border border-[#EBEAEA] dark:border-white/10 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#EBEAEA] dark:border-white/10">
              <Sliders className="w-5 h-5 text-[#214AAB] dark:text-[#214AAB]" />
              <h2 className="font-serif font-bold text-lg text-[#162F6A] dark:text-white">
                Navbar &amp; Header
              </h2>
            </div>

            <div className="space-y-3">
              {navSections.map((sec) => (
                <div
                  key={sec.key}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1B38]/50 border border-[#EBEAEA] dark:border-white/10 hover:border-[#214AAB]/30 transition-all"
                >
                  <div className="pr-4">
                    <p className="text-sm font-semibold text-[#162F6A] dark:text-white">{sec.label}</p>
                    <p className="text-xs text-[#676B7E] dark:text-blue-200 mt-0.5">{sec.desc}</p>
                  </div>
                  <button
                    onClick={() => toggleSetting(sec.key)}
                    className={`relative shrink-0 inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      settings[sec.key] ? "bg-[#214AAB]" : "bg-gray-300 dark:bg-white/20"
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

          {/* Visuals & Extras */}
          <div className="bg-white dark:bg-[#162F6A] rounded-2xl p-6 shadow-sm border border-[#EBEAEA] dark:border-white/10 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#EBEAEA] dark:border-white/10">
              <Sparkles className="w-5 h-5 text-[#214AAB] dark:text-[#214AAB]" />
              <h2 className="font-serif font-bold text-lg text-[#162F6A] dark:text-white">
                Visuals &amp; Extras
              </h2>
            </div>

            <div className="space-y-3">
              {globalFeatures.map((sec) => (
                <div
                  key={sec.key}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#0E1B38]/50 border border-[#EBEAEA] dark:border-white/10 hover:border-[#214AAB]/30 transition-all"
                >
                  <div className="pr-4">
                    <p className="text-sm font-semibold text-[#162F6A] dark:text-white">{sec.label}</p>
                    <p className="text-xs text-[#676B7E] dark:text-blue-200 mt-0.5">{sec.desc}</p>
                  </div>
                  <button
                    onClick={() => toggleSetting(sec.key)}
                    className={`relative shrink-0 inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      settings[sec.key] ? "bg-[#214AAB]" : "bg-gray-300 dark:bg-white/20"
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
      </div>

      <div className="p-4 rounded-xl bg-blue-50 dark:bg-[#102047] border border-blue-200 dark:border-blue-500/20 text-xs text-[#214AAB] dark:text-blue-200 flex items-center gap-2">
        <CheckCircle className="w-4 h-4 shrink-0 text-[#214AAB]" />
        <span>
          All settings are saved automatically to persistent local storage and reflected in real-time across the client application.
        </span>
      </div>
    </div>
  );
}
