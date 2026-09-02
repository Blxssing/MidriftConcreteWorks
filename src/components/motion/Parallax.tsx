import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Subtle scroll parallax for large imagery (default ±18px).
 * The wrapper keeps a fixed box so nothing shifts layout (no CLS);
 * only the inner layer translates. Disabled under reduced motion.
 */
export function Parallax({
  children,
  className,
  innerClassName,
  distance = 18,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  distance?: number;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = outer.current;
    const layer = inner.current;
    if (!box || !layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let visible = false;

    const update = () => {
      raf = 0;
      const r = box.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const centre = (r.top + r.height / 2 - vh / 2) / vh; // -1 .. 1
      const y = Math.max(-1, Math.min(1, centre)) * -distance;
      layer.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      if (!visible || raf) return;
      raf = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) visible = e.isIntersecting;
      if (visible) onScroll();
    });
    io.observe(box);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [distance]);

  return (
    <div ref={outer} className={cn("relative overflow-hidden", className)}>
      <div ref={inner} className={cn("size-full will-change-transform", innerClassName)}>
        {children}
      </div>
    </div>
  );
}
