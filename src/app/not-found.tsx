import Link from "next/link";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function NotFound() {
  return (
    <ThemeProvider>
      <main className="flex min-h-[100dvh] items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="mb-4 font-mono text-sm tabular-nums text-emerald-700 dark:text-emerald-400">404</p>
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-gray-950 dark:text-white">Такой страницы нет</h1>
          <p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-400">
            Зато есть каталог программ. Возможно, вы искали одну из них.
          </p>
          <Link
            href="/"
            className="pressable inline-flex rounded-xl bg-emerald-700 px-6 py-3.5 font-semibold text-white shadow-soft hover:bg-emerald-800 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
          >
            На главную
          </Link>
        </div>
      </main>
    </ThemeProvider>
  );
}
