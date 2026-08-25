import { Instagram, Facebook, Linkedin, Music2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";

const iconMap: Record<string, LucideIcon> = {
  tiktok: Music2,
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
};

/** Renders only socials that have a real URL configured. */
export function SocialIcons({ className, invert }: { className?: string; invert?: boolean }) {
  const links = site.socials.filter((s) => s.href && s.href !== "#");
  if (!links.length) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {links.map((s) => {
        const Icon = iconMap[s.icon] ?? Music2;
        return (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            title={s.label}
            className={cn(
              "flex size-11 items-center justify-center rounded-2xl border transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent hover:text-accent",
              invert
                ? "border-hairline-invert text-ink-foreground/80 hover:bg-ink-foreground/10"
                : "border-hairline bg-card text-foreground",
            )}
          >
            <Icon className="size-[18px]" />
          </a>
        );
      })}
    </div>
  );
}
