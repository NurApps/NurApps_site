"use client";

import { useI18n } from "./I18nProvider";
import { ArrowUpRight, Send } from "lucide-react";

export default function Newsletter() {
  const { t } = useI18n();

  return (
    <section aria-labelledby="newsletter-title" className="px-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-emerald-100/70 px-6 py-12 ring-1 ring-emerald-200/70 sm:px-12 sm:py-14 dark:bg-emerald-950/40 dark:ring-emerald-900/60">
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,var(--color-emerald-300),transparent)] opacity-50 dark:bg-[radial-gradient(closest-side,var(--color-emerald-800),transparent)] dark:opacity-40"
        />
        <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-emerald-800 dark:text-emerald-300">
              <Send aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
              Telegram
            </p>
            <h2 id="newsletter-title" className="text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl dark:text-white">
              {t.newsletter.title}
            </h2>
            <p className="mt-3 max-w-[52ch] text-lg text-gray-700 dark:text-gray-300">{t.newsletter.text}</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t.newsletter.note}</p>
          </div>
          <a
            href="https://t.me/nurapps"
            target="_blank"
            rel="noopener noreferrer"
            className="pressable group inline-flex items-center gap-2 justify-self-start rounded-xl bg-gray-950 px-6 py-3.5 font-semibold text-white shadow-soft hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
          >
            {t.newsletter.cta}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
