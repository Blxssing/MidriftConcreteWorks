import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Word-by-word masked reveal for headlines.
 * Each word rises out of an overflow-hidden line box on scroll into view.
 */
export function KineticText({
  text,
  className,
  as: Tag = "h2",
  delay = 0,
  accentFrom,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
  /** Index of the first word that should be rendered in the accent colour. */
  accentFrom?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <Tag className={className}>
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom">
            <span
              style={{ transitionDelay: `${delay + i * 55}ms` }}
              className={cn(
                "inline-block transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                shown ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
                accentFrom !== undefined && i >= accentFrom && "text-accent",
              )}
            >
              {w}
              {i < words.length - 1 ? "\u00A0" : ""}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
