"use client";

import { useI18n } from "./I18nProvider";

export default function SkipLink() {
  const { t } = useI18n();

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-emerald-700 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
    >
      {t.ui.skip_to_content}
    </a>
  );
}
