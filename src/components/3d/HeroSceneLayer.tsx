import { Suspense, lazy, useRef } from "react";
import { useNearViewport, useSceneCapability } from "./useSceneCapability";

const MidriftHeroScene = lazy(() => import("./MidriftHeroScene"));

/**
 * Decorative 3D layer for the homepage hero.
 * Client-only, lazy-loaded, and silently absent without WebGL — the hero
 * image and typography underneath remain the real content.
 */
export function HeroSceneLayer() {
  const ref = useRef<HTMLDivElement>(null);
  const near = useNearViewport(ref, "200px");
  const cap = useSceneCapability();
  const enabled = cap.ready && cap.webgl && near;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-1000 data-[on=true]:opacity-100"
      data-on={enabled}
    >
      {/* atmospheric gradient wash behind the 3D forms */}
      <div className="scene-atmosphere absolute inset-0" />
      {enabled && (
        <Suspense fallback={null}>
          <MidriftHeroScene
            reducedMotion={cap.reducedMotion}
            mobile={cap.mobile}
            pointer={!cap.coarsePointer && !cap.reducedMotion}
          />
        </Suspense>
      )}
    </div>
  );
}
