"use client";

import { useI18n } from "./I18nProvider";
import { apps } from "@/config/apps";
import { ArrowDown, Github, Sparkles } from "lucide-react";

export default function Hero() {
  const { t, locale } = useI18n();

  const totalDownloads = apps.reduce((acc, app) => acc + app.stats.downloads, 0);
  const totalStars = apps.reduce((acc, app) => acc + app.stats.stars, 0);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/10 dark:bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400/10 dark:bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-300/5 dark:bg-emerald-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-8 border border-emerald-200 dark:border-emerald-800">
          <Sparkles className="w-4 h-4" />
          {locale === "ru" ? "Открытый исходный код" : "Open Source"}
        </div>

        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6">
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
            {t.hero.title}
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-4 font-medium">
          {t.hero.subtitle}
        </p>

        <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          {t.hero.description}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-10">
          {[
            { value: apps.length, label: t.stats.total_apps },
            { value: totalDownloads.toLocaleString(), label: t.stats.total_downloads },
            { value: totalStars.toLocaleString(), label: t.stats.total_stars },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all transform hover:scale-105 flex items-center gap-2"
          >
            {t.hero.explore_apps}
            <ArrowDown className="w-5 h-5" />
          </button>
          <a
            href="https://github.com/NurApps"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg"
          >
            <Github className="w-5 h-5" />
            {t.hero.github}
          </a>
        </div>
      </div>
    </section>
  );
}
