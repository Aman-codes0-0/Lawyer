import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface SiteSettings {
  // Home Page Sections
  showHero: boolean;
  showPracticeAreas: boolean;
  showApproach: boolean;
  showTeam: boolean;
  showContactStrip: boolean;
  showCtaBanner: boolean;

  // Navigation & Header
  showConsultationBtn: boolean;
  showLawyerLoginBtn: boolean;
  showLangToggle: boolean;
  showThemeToggle: boolean;

  // Announcements & Extras
  showAnnouncementBar: boolean;
  announcementText: string;
  showCustomCursor: boolean;
  showSplashScreen: boolean;
  showFooterSocials: boolean;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  showHero: true,
  showPracticeAreas: true,
  showApproach: true,
  showTeam: true,
  showContactStrip: true,
  showCtaBanner: true,

  showConsultationBtn: true,
  showLawyerLoginBtn: true,
  showLangToggle: true,
  showThemeToggle: true,

  showAnnouncementBar: false,
  announcementText: "Notice: Online Consultation and Advisory services are active for 2026.",
  showCustomCursor: true,
  showSplashScreen: true,
  showFooterSocials: true,
};

const STORAGE_KEY = "lexprime_site_settings";

interface SiteSettingsContextType {
  settings: SiteSettings;
  updateSettings: (partial: Partial<SiteSettings>) => void;
  toggleSetting: (key: keyof Omit<SiteSettings, "announcementText">) => void;
  resetSettings: () => void;
  isQuickDrawerOpen: boolean;
  setIsQuickDrawerOpen: (open: boolean) => void;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn("Failed to load site settings from localStorage:", e);
    }
    return DEFAULT_SITE_SETTINGS;
  });

  const [isQuickDrawerOpen, setIsQuickDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn("Failed to persist site settings:", e);
    }
  }, [settings]);

  const updateSettings = (partial: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  const toggleSetting = (key: keyof Omit<SiteSettings, "announcementText">) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SITE_SETTINGS);
  };

  return (
    <SiteSettingsContext.Provider
      value={{
        settings,
        updateSettings,
        toggleSetting,
        resetSettings,
        isQuickDrawerOpen,
        setIsQuickDrawerOpen,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error("useSiteSettings must be used within a SiteSettingsProvider");
  }
  return context;
}
