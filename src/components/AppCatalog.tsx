"use client";

import { useI18n } from "./I18nProvider";
import { useRef, useState } from "react";
import { apps } from "@/config/apps";
import AppModal from "./AppModal";
import AppIcon from "./AppIcon";
import { Download, Eye, Star, Search } from "lucide-react";

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

  const filteredApps = apps.filter((app) => {
    const matchesPlatform = filter === "all" || app.platforms.includes(filter as never);
    const matchesSearch =
      search === "" ||
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.description[locale].toLowerCase().includes(search.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  const platformFilters: { key: Platform; label: string }[] = [
    { key: "all", label: t.catalog.all },
    { key: "windows", label: t.catalog.windows },
    { key: "android", label: t.catalog.android },
    { key: "linux", label: t.catalog.linux },
    { key: "web", label: t.catalog.web },
  ];

  return (
    <>
      <section id="catalog" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t.catalog.title}</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">{t.catalog.subtitle}</p>
          </div>

          <div className="mx-auto mb-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <label htmlFor="app-search" className="sr-only">{t.catalog.search}</label>
              <Search aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="app-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={locale === "ru" ? "Поиск приложений..." : "Search apps..."}
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-gray-900 placeholder-gray-500 transition-all focus:ring-2 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              />
            </div>
            <div className="sm:w-52">
              <label htmlFor="platform-filter" className="sr-only">{t.catalog.filter_by_platform}</label>
              <select
                id="platform-filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value as Platform)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              >
                {platformFilters.map(({ key, label }) => <option key={key} value={key}>{label}</option>)}
              </select>
            </div>
          </div>
          <p className="mb-8 text-center text-sm text-gray-500 dark:text-gray-400">{t.catalog.stats_note}</p>

          {/* Grid */}
          {filteredApps.length === 0 ? (
            <div role="status" className="py-12 text-center">
              <p className="mb-4 text-gray-500 dark:text-gray-400">{t.catalog.no_results}</p>
              <button
                type="button"
                onClick={() => { setSearch(""); setFilter("all"); }}
                className="rounded-lg px-4 py-2 font-medium text-emerald-700 underline underline-offset-4 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-300"
              >
                {t.catalog.reset_filters}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredApps.map((app) => (
                <article
                  key={app.id}
                  className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/5 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-emerald-600"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                      <AppIcon app={app} className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {app.name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-xs font-mono">
                          {app.license}
                        </span>
                        <span className="text-xs">v{app.latestVersion}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                    {app.description[locale]}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {app.platforms.map((p) => (
                      <span
                        key={p}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-medium capitalize"
                      >
                        {p}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" />
                      {app.stats.downloads.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {app.stats.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5" />
                      {app.stats.stars}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(event) => {
                      openerRef.current = event.currentTarget;
                      setSelectedApp(app.id);
                    }}
                    className="mt-5 self-start rounded-lg font-medium text-emerald-700 underline underline-offset-4 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-300"
                  >
                    {t.catalog.view_details}
                  </button>
                </article>
              ))}
            </div>
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
