import type { Metadata, Viewport } from "next";
import { Onest, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains",
  display: "swap",
});

const description = "NurApps — каталог приложений с открытым исходным кодом";

export const metadata: Metadata = {
  title: "NurApps",
  description,
  applicationName: "NurApps",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    siteName: "NurApps",
    title: "NurApps",
    description,
    locale: "ru_RU",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary",
    title: "NurApps",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfcfb" },
    { media: "(prefers-color-scheme: dark)", color: "#0d110f" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning className={`${onest.variable} ${jetbrains.variable}`}>
      <body className="grain bg-gray-50 font-sans text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
        {children}
      </body>
    </html>
  );
}
