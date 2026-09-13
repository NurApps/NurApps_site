"use client";

import { useI18n } from "./I18nProvider";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQ() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const visibleQuestions = showAll ? t.faq.questions : t.faq.questions.slice(0, 4);

  return (
    <section id="faq" className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t.faq.title}</h2>
        </div>

        <div className="space-y-3">
          {visibleQuestions.map((item, i) => (
            <div
              key={i}
              className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
            >
              <button
                type="button"
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="flex items-center gap-3 text-gray-900 dark:text-white font-medium">
                  <HelpCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div id={`faq-answer-${i}`} hidden={openIndex !== i} className="px-6 pb-4 pt-0">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed pl-8">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
        {t.faq.questions.length > 4 && (
          <button
            type="button"
            onClick={() => { setShowAll(!showAll); setOpenIndex(null); }}
            className="mt-6 rounded-lg px-4 py-2 font-medium text-emerald-700 underline underline-offset-4 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-300"
          >
            {showAll ? t.faq.show_less : `${t.faq.show_more} (${t.faq.questions.length - 4})`}
          </button>
        )}
      </div>
    </section>
  );
}
