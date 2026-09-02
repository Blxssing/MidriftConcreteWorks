import { useEffect, useRef } from "react";

/**
 * Small desktop-only cursor companion. It never replaces the system cursor
 * (which stays visible for accessibility) — it simply adds a soft ring that
 * grows over links, images and the 3D layer.
 */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const tick = () => {
      cx += (tx - cx) * 0.2;
      cy += (ty - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.dataset["on"] = "true";
      const t = e.target as HTMLElement | null;
      const state = t?.closest("a,button,[role='button']")
        ? "link"
        : t?.closest("img,figure,canvas")
          ? "media"
          : "normal";
      el.dataset["state"] = state;
    };
    const onLeave = () => {
      el.dataset["on"] = "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} aria-hidden="true" data-on="false" data-state="normal" className="site-cursor" />;
}
