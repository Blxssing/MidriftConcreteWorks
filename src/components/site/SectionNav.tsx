import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type SectionNavItem = { id: string; label: string };

/**
 * Sticky, section-aware sub-navigation.
 * Highlights the section currently in view and scrolls smoothly on click.
 */
export function SectionNav({ items, className }: { items: SectionNavItem[]; className?: string }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodes = items
      .map((i) => document.getElementById(i.id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [items]);

  // Keep the active pill in view on mobile.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - (window.innerWidth >= 768 ? 96 : 76);
    window.scrollTo({ top, behavior: "smooth" });
    setActive(id);
  };

  return (
    <div
      className={cn(
        "sticky top-16 z-40 border-b border-hairline bg-background/80 backdrop-blur-xl md:top-20 print:hidden",
        className,
      )}
    >
      <div
        ref={listRef}
        className="mx-auto flex max-w-[1400px] gap-1 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] md:justify-center md:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            data-id={item.id}
            onClick={go(item.id)}
            aria-current={active === item.id ? "true" : undefined}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-[13px] font-medium tracking-tight transition-colors duration-200",
              active === item.id
                ? "bg-foreground/8 text-foreground"
                : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
            )}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
