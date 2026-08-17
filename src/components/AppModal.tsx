"use client";

import { useI18n } from "./I18nProvider";
import { AppInfo } from "@/config/apps";
import { X, Download, ExternalLink, ChevronDown, ChevronUp, Eye, Star, Calendar, HardDrive } from "lucide-react";
import { useState } from "react";

export default function AppModal({ app, onClose }: { app: AppInfo; onClose: () => void }) {
  const { t, locale } = useI18n();
  const [showVersions, setShowVersions] = useState(false);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 p-6 flex items-start justify-between z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {app.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{app.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 font-mono">{app.license}</span>
                <span>v{app.latestVersion}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{app.description[locale]}</p>
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
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://github.com/${app.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              {t.catalog.download}
            </a>
            <a
              href={`https://github.com/${app.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              {t.catalog.source_code}
            </a>
          </div>

          {/* Versions */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <button
              onClick={() => setShowVersions(!showVersions)}
              className="w-full px-4 py-3 flex items-center justify-between text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <span>{t.catalog.versions} ({app.versions.length})</span>
              {showVersions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showVersions && (
              <div className="border-t border-gray-200 dark:border-gray-700">
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
                            className="px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors capitalize"
                          >
                            <Download className="w-3 h-3 inline mr-1" />
                            {platform}
                          </a>
                        )
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
