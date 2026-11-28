"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useI18n } from "./I18nProvider";

export default function ScrollToTop() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t.ui.scroll_top}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`pressable fixed bottom-6 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-gray-700 shadow-lift ring-1 ring-gray-200 hover:text-gray-950 dark:bg-gray-900 dark:text-gray-300 dark:shadow-none dark:ring-gray-800 dark:hover:text-white ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
    </button>
  );
}
