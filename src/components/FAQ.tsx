"use client";

import { useI18n } from "./I18nProvider";
import { useState } from "react";
import { Plus } from "lucide-react";

const INITIAL_COUNT = 4;

export default function FAQ() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);
  const total = t.faq.questions.length;
  const visibleQuestions = showAll ? t.faq.questions : t.faq.questions.slice(0, INITIAL_COUNT);

  return (
    <section id="faq" className="pb-28 pt-28 sm:pb-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl dark:text-white">{t.faq.title}</h2>
            <p className="mt-4 max-w-[36ch] text-gray-600 dark:text-gray-400">{t.faq.subtitle}</p>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <ul className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800">
            {visibleQuestions.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <li key={i}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${i}`}
                      id={`faq-question-${i}`}
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span className="text-lg font-medium text-gray-900 transition-colors group-hover:text-emerald-800 dark:text-gray-100 dark:group-hover:text-emerald-300">
                        {item.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ring-1 transition-all duration-300 ${
                          isOpen
                            ? "bg-emerald-700 text-white ring-emerald-700 dark:bg-emerald-500 dark:text-emerald-950 dark:ring-emerald-500"
                            : "text-gray-500 ring-gray-200 group-hover:ring-gray-300 dark:text-gray-400 dark:ring-gray-700"
                        }`}
                      >
                        <Plus className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} strokeWidth={1.75} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    hidden={!isOpen}
                    className="pb-6 pr-12"
                  >
                    <p className="max-w-[62ch] leading-relaxed text-gray-600 dark:text-gray-400">{item.a}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          {total > INITIAL_COUNT && (
            <button
              type="button"
              onClick={() => { setShowAll(!showAll); setOpenIndex(null); }}
              className="pressable mt-6 rounded-lg text-sm font-semibold text-emerald-800 underline decoration-emerald-300 decoration-2 underline-offset-[6px] hover:decoration-emerald-700 dark:text-emerald-300 dark:decoration-emerald-800 dark:hover:decoration-emerald-400"
            >
              {showAll ? t.faq.show_less : `${t.faq.show_more} (${total - INITIAL_COUNT})`}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
