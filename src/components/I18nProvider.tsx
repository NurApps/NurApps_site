"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Locale, getDictionary } from "@/lib/i18n";

interface I18nContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: ReturnType<typeof getDictionary>;
}

const I18nContext = createContext<I18nContextType>({
  locale: "ru",
  setLocale: () => {},
  t: getDictionary("ru"),
});

export function useI18n() {
  return useContext(I18nContext);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ru");

  function setLocale(l: Locale) {
    setLocaleState(l);
    localStorage.setItem("nurapps-locale", l);
  }

  const t = getDictionary(locale);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}
