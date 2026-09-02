import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { SceneLighting } from "./SceneLighting";
import { ConcreteBlock, HollowBlock, Kerb } from "./ConcreteBlock";

type Opts = { reducedMotion: boolean; mobile: boolean; pointer: boolean };

const damp = (current: number, target: number, k: number, dt: number) =>
  current + (target - current) * (1 - Math.exp(-k * dt));

/** Slowly drifting arrangement of precast forms. */
function HeroForms({ reducedMotion, mobile, pointer }: Opts) {
  const root = useRef<THREE.Group>(null);
  const drift = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const scroll = useRef(0);

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const g = root.current;
    if (!g) return;

    // cursor parallax — capped at ~3 degrees
    const tiltX = pointer && !reducedMotion ? -state.pointer.y * 0.055 : 0;
    const tiltY = pointer && !reducedMotion ? state.pointer.x * 0.055 : 0;
    g.rotation.x = damp(g.rotation.x, tiltX, 2.2, dt);
    g.rotation.y = damp(g.rotation.y, tiltY, 2.2, dt);

    // gentle scroll parallax
    if (typeof window !== "undefined") {
      const p = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
      scroll.current = damp(scroll.current, p, 3, dt);
      g.position.y = scroll.current * 1.1;
    }

    if (!reducedMotion && drift.current) {
      const t = state.clock.elapsedTime;
      drift.current.position.y = Math.sin(t * 0.22) * 0.09;
      drift.current.rotation.y = Math.sin(t * 0.07) * 0.06;
    }
  });

  const scale = Math.min(Math.max(viewport.width / 12, 0.62), 1.15);

  return (
    <group ref={root} scale={scale} position={[mobile ? 1.6 : 2.2, mobile ? -4.4 : -0.5, 0]}>
      <group ref={drift}>
        {/* stacked slabs — the visual anchor */}
        <ConcreteBlock position={[1.6, -0.9, 0]} size={[2.6, 0.24, 1.7]} tone={0.42} rotation={[0, -0.32, 0]} />
        <ConcreteBlock position={[1.68, -0.62, 0.05]} size={[2.4, 0.22, 1.55]} tone={0.5} rotation={[0, -0.26, 0]} />
        <ConcreteBlock
          position={[1.55, -0.36, -0.02]}
          size={[2.2, 0.2, 1.4]}
          tone={0.36}
          rotation={[0, -0.36, 0.01]}
        />

        {/* paving unit, lifted */}
        <ConcreteBlock
          position={[-2.1, 0.55, 0.4]}
          size={[1.1, 0.28, 1.1]}
          tone={0.46}
          rotation={[0.12, 0.5, -0.08]}
        />

        {!mobile && (
          <>
            <HollowBlock position={[-1.6, -0.75, -0.8]} rotation={[0, 0.42, 0]} tone={0.58} />
            <Kerb position={[2.3, 0.9, -1.2]} rotation={[0.05, -0.5, 0.06]} tone={0.48} />
            <ConcreteBlock
              position={[-2.9, -0.2, -1.6]}
              size={[0.9, 0.9, 0.9]}
              tone={0.55}
              rotation={[0.3, 0.7, 0.2]}
            />
          </>
        )}
      </group>
      <ContactShadows
        position={[0, -1.35, 0]}
        opacity={0.42}
        scale={14}
        blur={2.6}
        far={4}
        resolution={mobile ? 256 : 512}
        frames={reducedMotion ? 1 : Infinity}
      />
    </group>
  );
}

/** Full-bleed decorative hero canvas. Never contains text or semantic content. */
export default function MidriftHeroScene({ reducedMotion, mobile, pointer }: Opts) {
  return (
    <Canvas
      shadows={!mobile}
      dpr={mobile ? [1, 1.4] : [1, 1.8]}
      camera={{ position: [0, 0.8, 7.4], fov: 42 }}
      gl={{ antialias: !mobile, powerPreference: "high-performance", alpha: true }}
      frameloop={reducedMotion ? "demand" : "always"}
      style={{ pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <SceneLighting shadows={!mobile} />
        <HeroForms reducedMotion={reducedMotion} mobile={mobile} pointer={pointer} />
      </Suspense>
    </Canvas>
  );
}
