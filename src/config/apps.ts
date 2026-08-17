export interface AppVersion {
  version: string;
  date: string;
  size: string;
  downloads: {
    windows?: string;
    android?: string;
    linux?: string;
  };
  changelog?: string;
}

export interface AppInfo {
  id: string;
  name: string;
  description: {
    ru: string;
    en: string;
  };
  icon: string;
  repo: string;
  license: string;
  platforms: ("windows" | "android" | "linux" | "web")[];
  requirements: {
    ru: string;
    en: string;
  };
  category: string;
  website?: string;
  latestVersion: string;
  versions: AppVersion[];
  stats: {
    downloads: number;
    views: number;
    stars: number;
  };
}

export const apps: AppInfo[] = [
  {
    id: "nur-notes",
    name: "NurNotes",
    description: {
      ru: "Простое и удобное приложение для заметок с поддержкой маркдауна и синхронизации.",
      en: "Simple and convenient note-taking app with markdown support and sync."
    },
    icon: "/icons/nur-notes.svg",
    repo: "NurApps/NurNotes",
    license: "MIT",
    platforms: ["windows", "android", "linux"],
    requirements: {
      ru: "Windows 10+, Android 8+, Ubuntu 20.04+. RAM: 2 GB минимум.",
      en: "Windows 10+, Android 8+, Ubuntu 20.04+. RAM: 2 GB minimum."
    },
    category: "productivity",
    latestVersion: "1.2.0",
    versions: [
      {
        version: "1.2.0",
        date: "2026-08-01",
        size: "15 MB",
        downloads: {
          windows: "https://github.com/NurApps/NurNotes/releases/download/v1.2.0/NurNotes-Setup.exe",
          android: "https://github.com/NurApps/NurNotes/releases/download/v1.2.0/NurNotes.apk",
          linux: "https://github.com/NurApps/NurNotes/releases/download/v1.2.0/nur-notes-linux.AppImage"
        },
        changelog: "Добавлена синхронизация, исправлены баги"
      },
      {
        version: "1.1.0",
        date: "2026-06-15",
        size: "14 MB",
        downloads: {
          windows: "https://github.com/NurApps/NurNotes/releases/download/v1.1.0/NurNotes-Setup.exe",
          android: "https://github.com/NurApps/NurNotes/releases/download/v1.1.0/NurNotes.apk"
        },
        changelog: "Новый редактор, поддержка тегов"
      },
      {
        version: "1.0.0",
        date: "2026-04-01",
        size: "12 MB",
        downloads: {
          windows: "https://github.com/NurApps/NurNotes/releases/download/v1.0.0/NurNotes-Setup.exe"
        },
        changelog: "Первый релиз"
      }
    ],
    stats: {
      downloads: 1240,
      views: 5600,
      stars: 89
    }
  },
  {
    id: "nur-file",
    name: "NurFile",
    description: {
      ru: "Менеджер файлов нового поколения с вкладками, быстрым поиском и встроенным просмотром.",
      en: "Next-gen file manager with tabs, quick search, and built-in preview."
    },
    icon: "/icons/nur-file.svg",
    repo: "NurApps/NurFile",
    license: "GPL-3.0",
    platforms: ["windows", "linux"],
    requirements: {
      ru: "Windows 10+, Ubuntu 20.04+. RAM: 4 GB рекомендуется.",
      en: "Windows 10+, Ubuntu 20.04+. RAM: 4 GB recommended."
    },
    category: "tools",
    latestVersion: "2.0.1",
    versions: [
      {
        version: "2.0.1",
        date: "2026-07-20",
        size: "28 MB",
        downloads: {
          windows: "https://github.com/NurApps/NurFile/releases/download/v2.0.1/NurFile-Setup.exe",
          linux: "https://github.com/NurApps/NurFile/releases/download/v2.0.1/nur-file-linux.AppImage"
        },
        changelog: "Исправление производительности, новый плагин"
      },
      {
        version: "2.0.0",
        date: "2026-07-01",
        size: "27 MB",
        downloads: {
          windows: "https://github.com/NurApps/NurFile/releases/download/v2.0.0/NurFile-Setup.exe",
          linux: "https://github.com/NurApps/NurFile/releases/download/v2.0.0/nur-file-linux.AppImage"
        },
        changelog: "Полностью обновлённый интерфейс, плагины"
      },
      {
        version: "1.5.0",
        date: "2026-03-10",
        size: "20 MB",
        downloads: {
          windows: "https://github.com/NurApps/NurFile/releases/download/v1.5.0/NurFile-Setup.exe"
        },
        changelog: "Вкладки, быстрый поиск"
      }
    ],
    stats: {
      downloads: 3420,
      views: 12800,
      stars: 156
    }
  },
  {
    id: "nur-chat",
    name: "NurChat",
    description: {
      ru: "Безопасный мессенджер с сквозным шифрованием и открытым исходным кодом.",
      en: "Secure messenger with end-to-end encryption and open-source code."
    },
    icon: "/icons/nur-chat.svg",
    repo: "NurApps/NurChat",
    license: "AGPL-3.0",
    platforms: ["windows", "android", "linux", "web"],
    requirements: {
      ru: "Windows 10+, Android 9+, Ubuntu 20.04+, любой современный браузер.",
      en: "Windows 10+, Android 9+, Ubuntu 20.04+, any modern browser."
    },
    category: "communication",
    website: "https://chat.nurapps.dev",
    latestVersion: "3.1.0",
    versions: [
      {
        version: "3.1.0",
        date: "2026-08-10",
        size: "22 MB",
        downloads: {
          windows: "https://github.com/NurApps/NurChat/releases/download/v3.1.0/NurChat-Setup.exe",
          android: "https://github.com/NurApps/NurChat/releases/download/v3.1.0/NurChat.apk",
          linux: "https://github.com/NurApps/NurChat/releases/download/v3.1.0/nur-chat-linux.AppImage"
        },
        changelog: "Голосовые сообщения, исправления безопасности"
      },
      {
        version: "3.0.0",
        date: "2026-06-01",
        size: "21 MB",
        downloads: {
          windows: "https://github.com/NurApps/NurChat/releases/download/v3.0.0/NurChat-Setup.exe",
          android: "https://github.com/NurApps/NurChat/releases/download/v3.0.0/NurChat.apk",
          linux: "https://github.com/NurApps/NurChat/releases/download/v3.0.0/nur-chat-linux.AppImage"
        },
        changelog: "Групповые чаты, стикеры"
      },
      {
        version: "2.5.0",
        date: "2026-02-15",
        size: "18 MB",
        downloads: {
          windows: "https://github.com/NurApps/NurChat/releases/download/v2.5.0/NurChat-Setup.exe",
          android: "https://github.com/NurApps/NurChat/releases/download/v2.5.0/NurChat.apk"
        },
        changelog: "Сквозное шифрование"
      }
    ],
    stats: {
      downloads: 8900,
      views: 34500,
      stars: 312
    }
  },
  {
    id: "nur-player",
    name: "NurPlayer",
    description: {
      ru: "Мультимедийный плеер с поддержкой всех форматов и красивым интерфейсом.",
      en: "Multimedia player supporting all formats with a beautiful interface."
    },
    icon: "/icons/nur-player.svg",
    repo: "NurApps/NurPlayer",
    license: "MIT",
    platforms: ["windows", "linux"],
    requirements: {
      ru: "Windows 10+, Ubuntu 22.04+. RAM: 2 GB. GPU: OpenGL 3.3+.",
      en: "Windows 10+, Ubuntu 22.04+. RAM: 2 GB. GPU: OpenGL 3.3+."
    },
    category: "media",
    latestVersion: "1.0.3",
    versions: [
      {
        version: "1.0.3",
        date: "2026-07-28",
        size: "35 MB",
        downloads: {
          windows: "https://github.com/NurApps/NurPlayer/releases/download/v1.0.3/NurPlayer-Setup.exe",
          linux: "https://github.com/NurApps/NurPlayer/releases/download/v1.0.3/nur-player-linux.AppImage"
        },
        changelog: "Поддержка субтитров, исправление воспроизведения"
      },
      {
        version: "1.0.2",
        date: "2026-06-20",
        size: "34 MB",
        downloads: {
          windows: "https://github.com/NurApps/NurPlayer/releases/download/v1.0.2/NurPlayer-Setup.exe",
          linux: "https://github.com/NurApps/NurPlayer/releases/download/v1.0.2/nur-player-linux.AppImage"
        },
        changelog: "Новый скин, плейлисты"
      },
      {
        version: "1.0.0",
        date: "2026-05-01",
        size: "32 MB",
        downloads: {
          windows: "https://github.com/NurApps/NurPlayer/releases/download/v1.0.0/NurPlayer-Setup.exe"
        },
        changelog: "Первый релиз"
      }
    ],
    stats: {
      downloads: 2100,
      views: 9800,
      stars: 74
    }
  }
];
