import { Suspense, lazy, useEffect, useRef } from "react";
import { useNearViewport, useSceneCapability } from "./useSceneCapability";
import { Container } from "@/components/site/primitives";
import { QuoteCTA } from "@/components/site/primitives";

const ConstructionScene = lazy(() => import("./ConstructionScene"));

const stages = [
  { code: "01", title: "Cast", body: "Units are batched, moulded and compacted in our Nakuru yard." },
  { code: "02", title: "Cure", body: "Controlled curing brings every batch to the same working strength." },
  { code: "03", title: "Deliver", body: "Loaded, trucked and offloaded against your construction programme." },
  { code: "04", title: "Build", body: "Units land on site ready to lay — consistent size, consistent finish." },
];

/**
 * Scroll-driven assembly: individual precast units travel into place and form a
 * wall. Scroll position drives the animation via GSAP ScrollTrigger.
 */
export function ConstructionSequence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const near = useNearViewport(sectionRef, "300px");
  const cap = useSceneCapability();
  const enabled = cap.ready && cap.webgl && near;

  useEffect(() => {
    if (!enabled) return;
    const el = sectionRef.current;
    if (!el) return;

    if (cap.reducedMotion) {
      progress.current = 1;
      return;
    }

    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });
      cleanup = () => st.kill();
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [enabled, cap.reducedMotion]);

  return (
    <section ref={sectionRef} className="relative bg-ink text-ink-foreground" id="build">
      <div className="relative h-[260vh] md:h-[300vh]">
        <div className="sticky top-0 flex h-dvh flex-col justify-center overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 opacity-75">
            <div className="scene-atmosphere-dark absolute inset-0" />
            {enabled && (
              <Suspense fallback={null}>
                <ConstructionScene
                  progress={progress}
                  reducedMotion={cap.reducedMotion}
                  mobile={cap.mobile}
                />
              </Suspense>
            )}
          </div>

          <Container className="relative">
            <p className="eyebrow text-accent">From unit to structure</p>
            <h2 className="mt-4 max-w-2xl display-2">
              Every wall starts as a single precast unit.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-foreground/70">
              Consistent dimensions and controlled curing are what let thousands of individual units
              come together into one straight, stable structure on site.
            </p>
            <div className="mt-10 grid max-w-3xl gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
              {stages.map((s) => (
                <div key={s.code} className="border-t border-hairline-invert pt-4">
                  <span className="font-mono text-xs text-accent">{s.code}</span>
                  <h3 className="mt-2 font-display text-lg tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-foreground/60">{s.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <QuoteCTA label="Request a Quote" />
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
