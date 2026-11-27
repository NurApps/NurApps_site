"use client";

import { useI18n } from "./I18nProvider";
import { news } from "@/config/news";
import { Newspaper } from "lucide-react";

export default function News() {
  const { t, locale } = useI18n();
  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-US", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));

  return (
    <section id="news" className="bg-gray-100/70 pb-28 pt-24 sm:pb-32 dark:bg-gray-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl dark:text-white">{t.news.title}</h2>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">{t.news.subtitle}</p>
          </div>
        </div>

        {news.length === 0 ? (
          <div className="flex items-center gap-4 rounded-2xl bg-white p-8 shadow-soft dark:bg-gray-900 dark:shadow-none">
            <Newspaper aria-hidden="true" className="h-5 w-5 text-gray-400" strokeWidth={1.75} />
            <p className="text-gray-600 dark:text-gray-400">{t.news.no_news}</p>
          </div>
        ) : (
          <ol className="border-t border-gray-300/70 dark:border-gray-800">
            {news.map((item, i) => (
              <li key={item.id}>
                <article className="group grid gap-3 border-b border-gray-300/70 py-8 transition-colors sm:grid-cols-12 sm:gap-8 dark:border-gray-800">
                  <time
                    dateTime={item.date}
                    className="font-mono text-sm tabular-nums text-gray-500 sm:col-span-3 sm:pt-1.5 dark:text-gray-400"
                  >
                    {formatDate(item.date)}
                  </time>
                  <div className="sm:col-span-9 lg:col-span-7">
                    <h3
                      className={`font-semibold tracking-tight text-gray-950 transition-colors group-hover:text-emerald-800 dark:text-white dark:group-hover:text-emerald-300 ${
                        i === 0 ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
                      }`}
                    >
                      {item.title[locale]}
                    </h3>
                    <p className="mt-3 max-w-[62ch] leading-relaxed text-gray-600 dark:text-gray-400">{item.content[locale]}</p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
