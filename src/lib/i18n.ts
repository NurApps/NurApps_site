import ru from "@/messages/ru.json";
import en from "@/messages/en.json";

export type Locale = "ru" | "en";

export const locales: Locale[] = ["ru", "en"];
export const defaultLocale: Locale = "ru";

const dictionaries = { ru, en } as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale] || dictionaries[defaultLocale];
}
