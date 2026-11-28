import type { AppInfo } from "@/config/apps";

export default function AppIcon({ app, className }: { app: Pick<AppInfo, "icon">; className: string }) {
  // Статический экспорт, SVG из public/: next/image здесь ничего не даёт.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={app.icon} alt="" aria-hidden="true" className={`${className} ring-1 ring-black/5 dark:ring-white/15`} />;
}
