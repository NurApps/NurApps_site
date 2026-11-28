"use client";

import { useI18n } from "./I18nProvider";
import { Github, Send } from "lucide-react";

export default function Footer() {
  const { t } = useI18n();

  const linkClass =
    "inline-flex items-center gap-1.5 rounded-md transition-colors hover:text-gray-950 dark:hover:text-white";

  return (
    <footer className="border-t border-gray-200 py-10 dark:border-gray-800">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 text-sm text-gray-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8 dark:text-gray-400">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-[7px] bg-emerald-700 text-[11px] font-semibold text-emerald-50 dark:bg-emerald-600">
            N
          </span>
          <span>{t.footer.copyright}</span>
          <span aria-hidden="true" className="text-gray-300 dark:text-gray-700">·</span>
          <span>{t.footer.open_source}</span>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a href="https://github.com/NurApps" target="_blank" rel="noopener noreferrer" className={linkClass}>
            <Github aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
            GitHub
          </a>
          <a href="https://t.me/nurapps" target="_blank" rel="noopener noreferrer" className={linkClass}>
            <Send aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
            {t.footer.telegram}
          </a>
          <a
            href="https://github.com/NurApps/NurApps_site/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            {t.footer.license}
          </a>
        </nav>
      </div>
    </footer>
  );
}
