export type Platform = "windows" | "android" | "linux" | "web" | "telegram";
export type AppStatus = "stable" | "beta" | "dev";

export interface AppInfo {
  id: string;
  name: string;
  tagline: {
    ru: string;
    en: string;
  };
  description: {
    ru: string;
    en: string;
  };
  icon: string;
  /** Не указывать, пока в репозитории нет файла лицензии. */
  license?: string;
  platforms: Platform[];
  status: AppStatus;
  /** Только если в репозитории есть опубликованные релизы. */
  releasesUrl?: string;
  /** Публичные репозитории с исходным кодом. */
  repos: { label?: string; url: string }[];
}

export const apps: AppInfo[] = [
  {
    id: "nurchat",
    name: "NurChat",
    tagline: {
      ru: "Мессенджер, который не читает вас",
      en: "A messenger that doesn't read you",
    },
    description: {
      ru: "Анонимный мессенджер со сквозным шифрованием: без телефона и email, только имя пользователя и пароль. Сейчас бета, установщик есть для Windows.",
      en: "An anonymous end-to-end encrypted messenger: no phone or email, just a username and password. Now in beta, with an installer for Windows.",
    },
    icon: "/icons/nurchat.svg",
    license: "AGPL-3.0",
    platforms: ["windows", "android", "linux"],
    status: "beta",
    releasesUrl: "https://github.com/NurApps/NurChat/releases",
    repos: [{ url: "https://github.com/NurApps/NurChat" }],
  },
  {
    id: "nurbooks",
    name: "NurBooks",
    tagline: {
      ru: "Читалка без мусора",
      en: "A reader without clutter",
    },
    description: {
      ru: "Электронная исламская библиотека: поиск по каталогу, PDF-читалка с закладками и офлайн-режим. Установщик есть для Windows, мобильная версия в разработке.",
      en: "A digital Islamic library: catalog search, a PDF reader with bookmarks and offline mode. There is a Windows installer; the mobile version is in development.",
    },
    icon: "/icons/nurbooks.svg",
    license: "AGPL-3.0",
    platforms: ["windows", "linux", "android"],
    status: "beta",
    releasesUrl: "https://github.com/NurApps/NurBooks_desktop/releases",
    repos: [
      { label: "Desktop", url: "https://github.com/NurApps/NurBooks_desktop" },
      { label: "Mobile", url: "https://github.com/NurApps/NurBooks_mobile" },
    ],
  },
  {
    id: "nurstore",
    name: "NurStore",
    tagline: {
      ru: "Все релизы — в одном боте",
      en: "Every release in one bot",
    },
    description: {
      ru: "Telegram-бот: присылает сборки и новости обновлений, когда не хочется следить за GitHub.",
      en: "A Telegram bot that sends builds and update notes for those who don't want to watch GitHub.",
    },
    icon: "/icons/nurstore.svg",
    license: "GPL-3.0",
    platforms: ["telegram"],
    status: "stable",
    repos: [{ url: "https://github.com/NurApps/NurStore" }],
  },
  {
    id: "byteculator",
    name: "Byteculator",
    tagline: {
      ru: "Калькулятор для тех, кто считает",
      en: "A calculator for people who count",
    },
    description: {
      ru: "Инженерные функции и история вычислений. Пока черновик: исходный код ещё не опубликован, скачать нечего.",
      en: "Engineering functions and calculation history. Still a draft: the source is not public yet and there is nothing to download.",
    },
    icon: "/icons/byteculator.svg",
    platforms: ["windows", "linux", "android"],
    status: "dev",
    repos: [],
  },
];
