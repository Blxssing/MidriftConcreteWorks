import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Pointer-driven card tilt (max ~3.5deg) with counter-parallax for the image
 * and a small offset for text/accent layers, exposed as CSS variables:
 *   --tilt-x / --tilt-y   card rotation (deg)
 *   --tilt-mx / --tilt-my normalised pointer position (-1..1)
 * Touch devices and reduced-motion users get the static card.
 */
export function TiltCard({
  children,
  className,
  maxTilt = 3.5,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let raf = 0;
    let px = 0;
    let py = 0;

    const apply = () => {
      raf = 0;
      el.style.setProperty("--tilt-mx", px.toFixed(3));
      el.style.setProperty("--tilt-my", py.toFixed(3));
      el.style.setProperty("--tilt-y", `${(px * maxTilt).toFixed(2)}deg`);
      el.style.setProperty("--tilt-x", `${(-py * maxTilt).toFixed(2)}deg`);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width) * 2 - 1;
      py = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      px = 0;
      py = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [maxTilt]);

  return (
    <div ref={ref} className={cn("tilt-card", className)}>
      {children}
    </div>
  );
}
