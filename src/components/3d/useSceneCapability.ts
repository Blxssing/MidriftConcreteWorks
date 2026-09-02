import { useEffect, useState } from "react";

export type SceneCapability = {
  /** Resolved after mount — never render a Canvas during SSR. */
  ready: boolean;
  webgl: boolean;
  reducedMotion: boolean;
  coarsePointer: boolean;
  mobile: boolean;
};

const initial: SceneCapability = {
  ready: false,
  webgl: false,
  reducedMotion: false,
  coarsePointer: false,
  mobile: false,
};

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}

/** Feature detection for the 3D layer: WebGL, reduced motion, pointer type, viewport. */
export function useSceneCapability(): SceneCapability {
  const [cap, setCap] = useState<SceneCapability>(initial);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(pointer: coarse)");
    const small = window.matchMedia("(max-width: 768px)");

    const read = () =>
      setCap({
        ready: true,
        webgl: detectWebGL(),
        reducedMotion: motion.matches,
        coarsePointer: pointer.matches,
        mobile: small.matches,
      });

    read();
    motion.addEventListener("change", read);
    pointer.addEventListener("change", read);
    small.addEventListener("change", read);
    return () => {
      motion.removeEventListener("change", read);
      pointer.removeEventListener("change", read);
      small.removeEventListener("change", read);
    };
  }, []);

  return cap;
}

/** True once the element has been near the viewport at least once (for lazy 3D mounting). */
export function useNearViewport(ref: React.RefObject<HTMLElement | null>, rootMargin = "300px") {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setNear(true);
            io.disconnect();
          }
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return near;
}

/** Pauses render loops when the scene scrolls out of view / the tab is hidden. */
export function useIsVisible(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) setVisible(e.isIntersecting && !document.hidden);
    });
    io.observe(el);
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [ref]);
  return visible;
}
