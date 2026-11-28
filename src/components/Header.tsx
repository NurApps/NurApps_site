"use client";

import { useTheme } from "./ThemeProvider";
import { useI18n } from "./I18nProvider";
import { useEffect, useRef, useState } from "react";
import { news } from "@/config/news";
import { Menu, X, Sun, Moon, Monitor, Check } from "lucide-react";

const allSections = [
  { id: "hero", key: "home" },
  { id: "catalog", key: "apps" },
  { id: "faq", key: "faq" },
  { id: "news", key: "news" },
  { id: "about", key: "about" },
] as const;

// Раздел новостей скрыт, пока записей нет.
const sections = allSections.filter(({ id }) => id !== "news" || news.length > 0);

function useActiveSection() {
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!themeMenuOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!themeMenuRef.current?.contains(event.target as Node)) setThemeMenuOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setThemeMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [themeMenuOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const themeOptions = [
    { value: "light" as const, icon: Sun, label: t.ui.theme_light },
    { value: "dark" as const, icon: Moon, label: t.ui.theme_dark },
    { value: "system" as const, icon: Monitor, label: t.ui.theme_system },
  ];
  const ThemeIcon = themeOptions.find((o) => o.value === theme)?.icon ?? Monitor;

  const iconButton =
    "pressable inline-flex h-9 items-center justify-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-gray-600 hover:bg-gray-200/60 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-gray-200/80 bg-gray-50/80 backdrop-blur-xl dark:border-gray-800/80 dark:bg-gray-950/80"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            aria-label={t.ui.to_home}
            className="pressable flex items-center gap-2.5 rounded-lg"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-emerald-700 text-sm font-semibold text-emerald-50 dark:bg-emerald-600">
              N
            </span>
            <span className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">NurApps</span>
          </button>

          <nav aria-label="Main" className="hidden items-center gap-0.5 md:flex">
            {sections.map(({ id, key }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollTo(id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`pressable relative rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  }`}
                >
                  {t.nav[key]}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-emerald-600 transition-opacity duration-300 dark:bg-emerald-400 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setLocale(locale === "ru" ? "en" : "ru")}
              aria-label={t.ui.language}
              className={`${iconButton} font-mono text-xs tracking-wider`}
            >
              {locale === "ru" ? "RU" : "EN"}
              <span className="text-gray-400 dark:text-gray-600">/</span>
              <span className="text-gray-400 dark:text-gray-600">{locale === "ru" ? "EN" : "RU"}</span>
            </button>

            <div className="relative" ref={themeMenuRef}>
              <button
                type="button"
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                aria-label={t.ui.theme}
                aria-haspopup="menu"
                aria-expanded={themeMenuOpen}
                className={iconButton}
              >
                <ThemeIcon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </button>
              {themeMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl bg-white p-1 shadow-lift ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800"
                >
                  {themeOptions.map(({ value, icon: Icon, label }) => (
                    <button
                      key={value}
                      type="button"
                      role="menuitemradio"
                      aria-checked={theme === value}
                      onClick={() => {
                        setTheme(value);
                        setThemeMenuOpen(false);
                      }}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                        theme === value
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                      }`}
                    >
                      <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
                      <span className="flex-1">{label}</span>
                      {theme === value && <Check aria-hidden="true" className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? t.ui.menu_close : t.ui.menu_open}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className={`${iconButton} md:hidden`}
            >
              {menuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav id="mobile-nav" aria-label="Mobile" className="border-t border-gray-200 py-3 dark:border-gray-800 md:hidden">
            {sections.map(({ id, key }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                aria-current={active === id ? "true" : undefined}
                className={`pressable flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-base font-medium ${
                  active === id
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                }`}
              >
                {t.nav[key]}
                {active === id && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
