"use client";

import { useI18n } from "./I18nProvider";
import { apps } from "@/config/apps";
import { ArrowDown, ArrowUpRight, Github } from "lucide-react";
import AppIcon from "./AppIcon";

export default function Hero() {
  const { t } = useI18n();
  const toCatalog = () => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative flex min-h-[100dvh] items-center overflow-hidden pb-20 pt-28 sm:pb-24">
      <div aria-hidden="true" className="dot-grid absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full bg-[radial-gradient(closest-side,var(--color-emerald-200),transparent)] opacity-60 dark:bg-[radial-gradient(closest-side,var(--color-emerald-950),transparent)] dark:opacity-80"
      />

      <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-7">
          <p className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-800 dark:text-emerald-300">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
            {t.hero.eyebrow}
          </p>

          <h1 className="text-[clamp(3.5rem,11vw,8.5rem)] font-semibold leading-[0.88] tracking-[-0.045em] text-gray-950 dark:text-white">
            {t.hero.title}
          </h1>

          <p className="mt-8 max-w-[30ch] text-2xl font-medium leading-snug tracking-tight text-gray-800 sm:text-3xl dark:text-gray-200">
            {t.hero.subtitle}
          </p>

          <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            {t.hero.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <button
              type="button"
              onClick={toCatalog}
              className="pressable group inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3.5 font-semibold text-white shadow-soft hover:bg-emerald-800 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
            >
              {t.hero.explore_apps}
              <ArrowDown aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
            <a
              href="https://github.com/NurApps"
              target="_blank"
              rel="noopener noreferrer"
              className="pressable group inline-flex items-center gap-2 rounded-lg font-semibold text-gray-700 hover:text-gray-950 dark:text-gray-300 dark:hover:text-white"
            >
              <Github aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
              <span className="underline decoration-gray-300 decoration-2 underline-offset-[6px] transition-colors group-hover:decoration-emerald-600 dark:decoration-gray-700 dark:group-hover:decoration-emerald-400">
                {t.hero.github}
              </span>
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        <aside className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <div className="rounded-2xl bg-white/70 p-2 shadow-lift ring-1 ring-gray-200/80 backdrop-blur-md dark:bg-gray-900/60 dark:shadow-none dark:ring-gray-800">
            <p className="flex items-baseline justify-between px-4 pb-2 pt-3 text-xs font-medium text-gray-500 dark:text-gray-400">
              <span>{t.hero.index_title}</span>
              <span className="font-mono tabular-nums">{String(apps.length).padStart(2, "0")}</span>
            </p>
            <ul aria-label={t.hero.apps_label} className="space-y-0.5">
              {apps.map((app, i) => (
                <li key={app.id}>
                  <button
                    type="button"
                    onClick={toCatalog}
                    className="pressable group flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800/70"
                  >
                    <span className="font-mono text-xs tabular-nums text-gray-400 dark:text-gray-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      <AppIcon app={app} className="h-[18px] w-[18px]" />
                    </span>
                    <span className="flex-1 font-medium text-gray-900 dark:text-gray-100">{app.name}</span>
                    <span className="font-mono text-xs tabular-nums text-gray-500 dark:text-gray-500">v{app.latestVersion}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
