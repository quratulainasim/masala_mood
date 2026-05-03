import { createContext, useContext, useState, type ReactNode } from "react";

type Lang = "en" | "ur";

interface LangContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (en: string, ur: string) => string;
  isUrdu: boolean;
}

const LangContext = createContext<LangContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const toggleLang = () => setLang((l) => (l === "en" ? "ur" : "en"));
  const t = (en: string, ur: string) => (lang === "en" ? en : ur);
  const isUrdu = lang === "ur";

  return (
    <LangContext.Provider value={{ lang, toggleLang, t, isUrdu }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
