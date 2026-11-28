"use client";

import { useI18n } from "./I18nProvider";
import { AppInfo } from "@/config/apps";
import { X, Download, ExternalLink, Github } from "lucide-react";
import { useEffect, useRef } from "react";
import AppIcon from "./AppIcon";
import StatusBadge from "./StatusBadge";

const primaryAction =
  "pressable inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400";
const secondaryAction =
  "pressable inline-flex items-center gap-2 rounded-xl bg-gray-100 px-5 py-3 font-semibold text-gray-800 hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700";

export default function AppModal({ app, onClose }: { app: AppInfo; onClose: () => void }) {
  const { t, locale } = useI18n();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeDialog = () => dialogRef.current?.close();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    // Chrome may focus the scrollable panel instead of honoring autoFocus.
    dialog.querySelector<HTMLButtonElement>("button[data-autofocus]")?.focus();
  }, []);

  // Без релизов объясняем, почему нет кнопки скачивания.
  const note = app.status === "dev" ? t.catalog.dev_note : app.releasesUrl ? null : t.catalog.no_releases;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="app-dialog-title"
      aria-describedby="app-dialog-description"
      onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) closeDialog(); }}
      className="fixed inset-0 z-50 m-0 flex h-full w-full max-h-none max-w-none items-center justify-center border-0 bg-transparent p-4 text-gray-900 backdrop:bg-gray-950/50 backdrop:backdrop-blur-sm dark:text-gray-100"
    >
      <div className="relative max-h-[85dvh] w-full max-w-2xl overflow-y-auto rounded-3xl focus:outline-none bg-white shadow-lift ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
        {/* Header */}
        <div className="sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 p-6 flex items-start justify-between z-10">
          <div className="flex items-center gap-4">
            <AppIcon app={app} className="h-16 w-16 shrink-0 rounded-[18px]" />
            <div>
              <h2 id="app-dialog-title" className="text-2xl font-semibold tracking-tight text-gray-950 dark:text-white">{app.name}</h2>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <StatusBadge status={app.status} />
                {app.license && (
                  <span title={t.catalog.license} className="rounded-[6px] bg-gray-100 px-1.5 py-0.5 font-mono text-xs dark:bg-gray-800">
                    {app.license}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            type="button"
            autoFocus
            data-autofocus
            onClick={closeDialog}
            aria-label={t.catalog.close}
            className="pressable rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <X aria-hidden="true" className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <p className="mb-2 text-lg font-medium tracking-tight text-gray-900 dark:text-white">{app.tagline[locale]}</p>
            <p id="app-dialog-description" className="max-w-[62ch] text-gray-600 dark:text-gray-300 leading-relaxed">{app.description[locale]}</p>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{t.catalog.platforms}</h3>
            <div className="flex flex-wrap gap-2">
              {app.platforms.map((p) => (
                <span
                  key={p}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium"
                >
                  {t.catalog[p]}
                </span>
              ))}
            </div>
          </div>

          {note && (
            <p className="rounded-xl bg-gray-50 p-4 text-sm text-gray-600 dark:bg-gray-800/60 dark:text-gray-400">{note}</p>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            {app.releasesUrl && (
              <a href={app.releasesUrl} target="_blank" rel="noopener noreferrer" className={primaryAction}>
                <Download aria-hidden="true" className="h-5 w-5" />
                {t.catalog.download}
              </a>
            )}
            {app.repos.map((repo) => (
              <a key={repo.url} href={repo.url} target="_blank" rel="noopener noreferrer" className={secondaryAction}>
                <Github aria-hidden="true" className="h-5 w-5" />
                {repo.label ? `${t.catalog.source_code}: ${repo.label}` : t.catalog.source_code}
              </a>
            ))}
            {app.repos.length === 0 && (
              <a href="https://github.com/NurApps" target="_blank" rel="noopener noreferrer" className={secondaryAction}>
                <ExternalLink aria-hidden="true" className="h-5 w-5" />
                {t.catalog.watch}
              </a>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
