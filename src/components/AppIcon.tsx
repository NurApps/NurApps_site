import { FileText, FolderOpen, MessageCircle, Music, Package } from "lucide-react";
import type { AppInfo } from "@/config/apps";

const icons = {
  productivity: FileText,
  tools: FolderOpen,
  communication: MessageCircle,
  media: Music,
};

export default function AppIcon({ app, className }: { app: Pick<AppInfo, "category">; className: string }) {
  const Icon = icons[app.category as keyof typeof icons] ?? Package;
  return <Icon aria-hidden="true" className={className} strokeWidth={1.75} />;
}
