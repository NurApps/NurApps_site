export interface NewsItem {
  id: string;
  title: {
    ru: string;
    en: string;
  };
  content: {
    ru: string;
    en: string;
  };
  date: string;
  icon: string;
}

export const news: NewsItem[] = [
  {
    id: "nurchat-v3",
    title: {
      ru: "NurChat v3.1 — голосовые сообщения",
      en: "NurChat v3.1 — Voice Messages"
    },
    content: {
      ru: "Вышла новая версия NurChat с поддержкой голосовых сообщений и улучшениями безопасности. Обновление доступно для всех платформ.",
      en: "New version of NurChat with voice message support and security improvements. Update available for all platforms."
    },
    date: "2026-08-10",
    icon: "💬"
  },
  {
    id: "nurfile-v2",
    title: {
      ru: "NurFile v2.0 — полное обновление",
      en: "NurFile v2.0 — Complete Overhaul"
    },
    content: {
      ru: "NurFile получает полностью обновлённый интерфейс и систему плагинов. Теперь вы можете расширять функциональность менеджера файлов.",
      en: "NurFile gets a completely redesigned interface and plugin system. Now you can extend the file manager's functionality."
    },
    date: "2026-07-01",
    icon: "📁"
  },
  {
    id: "community",
    title: {
      ru: "Присоединяйтесь к сообществу NurApps",
      en: "Join the NurApps Community"
    },
    content: {
      ru: "Мы запускаем форум для обсуждения разработки, баг-репортов и идей. Присоединяйтесь и помогайте нам становиться лучше!",
      en: "We're launching a forum for discussing development, bug reports, and ideas. Join us and help us improve!"
    },
    date: "2026-06-15",
    icon: "👥"
  }
];
