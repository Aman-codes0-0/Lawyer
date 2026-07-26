"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import en, { TranslationKey } from "@/lib/translations/en";
import hi from "@/lib/translations/hi";

type Language = "en" | "hi";
type Translations = typeof en;

interface LanguageContextValue {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: TranslationKey) => string;
  tArr: (key: TranslationKey) => string[];
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: (key) => (en[key] as string) ?? key,
  tArr: (key) => (en[key] as string[]) ?? [],
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lexprime_lang") as Language | null;
    if (saved === "en" || saved === "hi") setLangState(saved);
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem("lexprime_lang", l);
  };

  const translations: Record<Language, Translations> = { en, hi: hi as Translations };

  const t = (key: TranslationKey): string => {
    const val = translations[lang][key];
    return Array.isArray(val) ? val.join(", ") : (val as string) ?? (en[key] as string) ?? key;
  };

  const tArr = (key: TranslationKey): string[] => {
    const val = translations[lang][key];
    return Array.isArray(val) ? val : [(val as string) ?? ""];
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tArr }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
