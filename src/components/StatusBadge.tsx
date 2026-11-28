"use client";

import { useI18n } from "./I18nProvider";
import type { AppStatus } from "@/config/apps";

const styles: Record<AppStatus, string> = {
  stable: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  beta: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  dev: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

export default function StatusBadge({ status }: { status: AppStatus }) {
  const { t } = useI18n();

  return (
    <span className={`rounded-[6px] px-1.5 py-0.5 text-[11px] font-medium ${styles[status]}`}>
      {t.catalog[`status_${status}`]}
    </span>
  );
}
