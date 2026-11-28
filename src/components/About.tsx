"use client";

import { useI18n } from "./I18nProvider";

export default function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="pb-32 pt-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-6">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl dark:text-white">{t.about.title}</h2>
          <p className="mt-6 max-w-[58ch] text-xl leading-relaxed text-gray-700 dark:text-gray-300">{t.about.content}</p>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:pt-3">
          <h3 className="mb-6 text-sm font-medium text-gray-500 dark:text-gray-400">{t.about.values_title}</h3>
          <ol className="space-y-px overflow-hidden rounded-2xl bg-gray-200 ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-800">
            {t.about.values.map((value, i) => {
              const [head, ...rest] = value.split(" — ");
              return (
                <li key={i} className="flex gap-5 bg-white p-5 dark:bg-gray-900">
                  <span className="font-mono text-sm tabular-nums text-emerald-700 dark:text-emerald-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="leading-relaxed">
                    <span className="font-semibold text-gray-950 dark:text-white">{head}</span>
                    {rest.length > 0 && <span className="text-gray-600 dark:text-gray-400"> — {rest.join(" — ")}</span>}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
