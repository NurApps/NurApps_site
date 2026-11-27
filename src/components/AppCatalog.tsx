"use client";

import { useI18n } from "./I18nProvider";
import { useRef, useState } from "react";
import { apps } from "@/config/apps";
import AppModal from "./AppModal";
import AppIcon from "./AppIcon";
import { ArrowRight, Download, Eye, Star, Search, SearchX } from "lucide-react";

type Platform = "all" | "windows" | "android" | "linux" | "web";

export default function AppCatalog() {
  const { t, locale } = useI18n();
  const [filter, setFilter] = useState<Platform>("all");
  const [search, setSearch] = useState("");
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const closeSelectedApp = () => {
    setSelectedApp(null);
    requestAnimationFrame(() => openerRef.current?.focus());
  };

  const query = search.trim().toLowerCase();
  const filteredApps = apps.filter((app) => {
    const matchesPlatform = filter === "all" || app.platforms.includes(filter as never);
    const matchesSearch =
      query === "" ||
      app.name.toLowerCase().includes(query) ||
      app.description[locale].toLowerCase().includes(query);
    return matchesPlatform && matchesSearch;
  });

  const platformLabels: Record<Exclude<Platform, "all">, string> = {
    windows: t.catalog.windows,
    android: t.catalog.android,
    linux: t.catalog.linux,
    web: t.catalog.web,
  };
  const platformFilters: { key: Platform; label: string }[] = [
    { key: "all", label: t.catalog.all },
    ...(Object.keys(platformLabels) as Exclude<Platform, "all">[]).map((key) => ({ key, label: platformLabels[key] })),
  ];

  const fieldClass =
    "w-full rounded-xl bg-white py-3 text-gray-900 shadow-soft ring-1 ring-gray-200 transition-shadow placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:bg-gray-900 dark:text-white dark:shadow-none dark:ring-gray-800 dark:placeholder:text-gray-500 dark:focus:ring-emerald-400";

  return (
    <>
      <section id="catalog" className="pb-28 pt-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <h2 className="text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl dark:text-white">{t.catalog.title}</h2>
              <p className="mt-3 max-w-[50ch] text-lg text-gray-600 dark:text-gray-400">{t.catalog.subtitle}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-6">
              <div className="relative flex-1">
                <label htmlFor="app-search" className="sr-only">{t.catalog.search}</label>
                <Search aria-hidden="true" strokeWidth={1.75} className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400" />
                <input
                  id="app-search"
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t.catalog.search_placeholder}
                  className={`${fieldClass} pl-11 pr-4`}
                />
              </div>
              <div className="sm:w-48">
                <label htmlFor="platform-filter" className="sr-only">{t.catalog.filter_by_platform}</label>
                <select
                  id="platform-filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as Platform)}
                  className={`${fieldClass} px-4`}
                >
                  {platformFilters.map(({ key, label }) => <option key={key} value={key}>{label}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2 border-b border-gray-200 pb-3 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
            <p aria-live="polite">
              {t.catalog.shown}{" "}
              <span className="font-mono tabular-nums text-gray-900 dark:text-gray-100">{filteredApps.length}</span>
              <span className="font-mono tabular-nums"> / {apps.length}</span>
            </p>
            <p className="text-xs">{t.catalog.stats_note}</p>
          </div>

          {filteredApps.length === 0 ? (
            <div role="status" className="flex flex-col items-start gap-4 rounded-2xl bg-gray-100/70 px-8 py-14 dark:bg-gray-900/60 sm:items-center sm:text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-gray-500 shadow-soft dark:bg-gray-800 dark:text-gray-400 dark:shadow-none">
                <SearchX aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <p className="max-w-[40ch] text-gray-600 dark:text-gray-400">{t.catalog.no_results}</p>
              <button
                type="button"
                onClick={() => { setSearch(""); setFilter("all"); }}
                className="pressable rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-soft ring-1 ring-gray-200 hover:ring-gray-300 dark:bg-gray-800 dark:text-white dark:shadow-none dark:ring-gray-700"
              >
                {t.catalog.reset_filters}
              </button>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {filteredApps.map((app) => (
                <li key={app.id}>
                  <article className="group relative flex h-full flex-col rounded-2xl bg-white p-6 shadow-soft ring-1 ring-gray-200/70 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-lift hover:ring-emerald-300 dark:bg-gray-900 dark:shadow-none dark:ring-gray-800 dark:hover:ring-emerald-800">
                    <div className="mb-5 flex items-start justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        <AppIcon app={app} className="h-6 w-6" />
                      </span>
                      <span className="rounded-[6px] bg-gray-100 px-1.5 py-0.5 font-mono text-[11px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                        {app.license}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold tracking-tight text-gray-950 dark:text-white">
                      {app.name}
                      <span className="ml-2 font-mono text-xs font-normal tabular-nums text-gray-500">v{app.latestVersion}</span>
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {app.description[locale]}
                    </p>

                    <p className="mt-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                      {app.platforms.map((p) => platformLabels[p]).join(" · ")}
                    </p>

                    <div className="mt-auto pt-6">
                      <dl className="mb-5 flex items-center gap-4 border-t border-gray-100 pt-4 font-mono text-xs tabular-nums text-gray-500 dark:border-gray-800 dark:text-gray-400">
                        <div className="flex items-center gap-1.5" title={t.catalog.downloads}>
                          <dt><Download aria-label={t.catalog.downloads} className="h-3.5 w-3.5" strokeWidth={1.75} /></dt>
                          <dd>{app.stats.downloads.toLocaleString(locale)}</dd>
                        </div>
                        <div className="flex items-center gap-1.5" title={t.catalog.views}>
                          <dt><Eye aria-label={t.catalog.views} className="h-3.5 w-3.5" strokeWidth={1.75} /></dt>
                          <dd>{app.stats.views.toLocaleString(locale)}</dd>
                        </div>
                        <div className="flex items-center gap-1.5" title="GitHub stars">
                          <dt><Star aria-label="GitHub stars" className="h-3.5 w-3.5" strokeWidth={1.75} /></dt>
                          <dd>{app.stats.stars.toLocaleString(locale)}</dd>
                        </div>
                      </dl>
                      <button
                        type="button"
                        onClick={(event) => {
                          openerRef.current = event.currentTarget;
                          setSelectedApp(app.id);
                        }}
                        aria-label={`${t.catalog.view_details}: ${app.name}`}
                        className="inline-flex items-center gap-1.5 rounded-lg text-sm transition-colors font-semibold text-emerald-800 after:absolute after:inset-0 after:rounded-2xl hover:text-emerald-900 dark:text-emerald-300 dark:hover:text-emerald-200"
                      >
                        {t.catalog.view_details}
                        <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {selectedApp && (
        <AppModal
          app={apps.find((a) => a.id === selectedApp)!}
          onClose={closeSelectedApp}
        />
      )}
    </>
  );
}
