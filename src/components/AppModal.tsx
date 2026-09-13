"use client";

import { useI18n } from "./I18nProvider";
import { AppInfo } from "@/config/apps";
import { X, Download, ExternalLink, ChevronDown, ChevronUp, Eye, Star, Calendar, HardDrive } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AppIcon from "./AppIcon";

export default function AppModal({ app, onClose }: { app: AppInfo; onClose: () => void }) {
  const { t, locale } = useI18n();
  const [showVersions, setShowVersions] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const latestVersion = app.versions[0];
  const platformLabels = {
    windows: t.catalog.windows,
    android: t.catalog.android,
    linux: t.catalog.linux,
    web: t.catalog.web,
  };
  const latestDownloads = Object.entries(latestVersion?.downloads ?? {}).filter(
    (entry): entry is [keyof typeof platformLabels, string] => Boolean(entry[1]),
  );
  const closeDialog = () => dialogRef.current?.close();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="app-dialog-title"
      aria-describedby="app-dialog-description"
      onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) closeDialog(); }}
      className="fixed inset-0 z-[100] m-0 flex h-full w-full max-h-none max-w-none items-center justify-center border-0 bg-transparent p-4 text-gray-900 backdrop:bg-black/60 backdrop:backdrop-blur-sm dark:text-gray-100"
    >
      <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
        {/* Header */}
        <div className="sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 p-6 flex items-start justify-between z-10">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
              <AppIcon app={app} className="h-8 w-8" />
            </div>
            <div>
              <h2 id="app-dialog-title" className="text-2xl font-bold text-gray-900 dark:text-white">{app.name}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 font-mono">{app.license}</span>
                <span>v{app.latestVersion}</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            autoFocus
            onClick={closeDialog}
            aria-label={t.catalog.close}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          >
            <X aria-hidden="true" className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <p id="app-dialog-description" className="text-gray-600 dark:text-gray-300 leading-relaxed">{app.description[locale]}</p>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Download, value: app.stats.downloads.toLocaleString(), label: t.catalog.downloads },
              { icon: Eye, value: app.stats.views.toLocaleString(), label: t.catalog.views },
              { icon: Star, value: app.stats.stars.toString(), label: "Stars" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                <Icon className="w-5 h-5 mx-auto mb-1 text-emerald-500" />
                <div className="text-lg font-bold text-gray-900 dark:text-white">{value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
              </div>
            ))}
          </div>
          <p className="-mt-4 text-xs text-gray-500 dark:text-gray-400">{t.catalog.stats_note}</p>

          {/* Platforms */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{t.catalog.platforms}</h4>
            <div className="flex flex-wrap gap-2">
              {app.platforms.map((p) => (
                <span
                  key={p}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-sm font-medium capitalize"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{t.catalog.requirements}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
              {app.requirements[locale]}
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">{t.catalog.latest_version}: v{latestVersion?.version ?? app.latestVersion}</h3>
              <div className="flex flex-wrap gap-2">
                {latestDownloads.map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                  >
                    <Download aria-hidden="true" className="h-5 w-5" />
                    {t.catalog.download_for} {platformLabels[platform]}
                  </a>
                ))}
                {app.website && app.platforms.includes("web") && (
                  <a
                    href={app.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                  >
                    <ExternalLink aria-hidden="true" className="h-5 w-5" />
                    {t.catalog.open_web_app}
                  </a>
                )}
                {latestDownloads.length === 0 && (
                  <a
                    href={`https://github.com/${app.repo}/releases`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white transition-colors hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                  >
                    <Download aria-hidden="true" className="h-5 w-5" />
                    {t.catalog.view_releases}
                  </a>
                )}
              </div>
            </div>
            <a
              href={`https://github.com/${app.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-gray-100 px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <ExternalLink className="w-5 h-5" />
              {t.catalog.source_code}
            </a>
          </div>

          {/* Versions */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <button
              type="button"
              aria-expanded={showVersions}
              aria-controls="app-versions"
              onClick={() => setShowVersions(!showVersions)}
              className="w-full px-4 py-3 flex items-center justify-between text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <span>{t.catalog.versions} ({app.versions.length})</span>
              {showVersions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <div id="app-versions" hidden={!showVersions} className="border-t border-gray-200 dark:border-gray-700">
                {app.versions.map((v, i) => (
                  <div key={v.version} className={`px-4 py-3 ${i > 0 ? "border-t border-gray-100 dark:border-gray-800" : ""}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-gray-900 dark:text-white">v{v.version}</span>
                        {i === 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs">
                            {t.catalog.latest_version}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {v.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <HardDrive className="w-3 h-3" />
                          {v.size}
                        </span>
                      </div>
                    </div>
                    {v.changelog && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{v.changelog}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(v.downloads).map(([platform, url]) => (
                        url && (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                          >
                            <Download aria-hidden="true" className="w-3 h-3 inline mr-1" />
                            {platform}
                          </a>
                        )
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
