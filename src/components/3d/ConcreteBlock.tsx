import { useMemo } from "react";
import type { ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBox } from "@react-three/drei";
import { scenePalette } from "./palette";

/** Shared, reused concrete materials — created once per tone, never per frame. */
const materialCache = new Map<string, THREE.MeshStandardMaterial>();

export function concreteMaterial(tone: number, roughness: number) {
  const key = `${tone.toFixed(2)}-${roughness.toFixed(2)}`;
  const cached = materialCache.get(key);
  if (cached) return cached;
  const base = new THREE.Color(scenePalette.concrete).lerp(
    new THREE.Color(scenePalette.concreteDark),
    tone,
  );
  const mat = new THREE.MeshStandardMaterial({
    color: base,
    roughness,
    metalness: 0.02,
    flatShading: false,
  });
  materialCache.set(key, mat);
  return mat;
}

export function accentMaterial() {
  return concreteMaterialAccent;
}
const concreteMaterialAccent = new THREE.MeshStandardMaterial({
  color: scenePalette.accent,
  roughness: 0.5,
  metalness: 0.05,
});

type BlockProps = {
  size?: [number, number, number];
  tone?: number;
  roughness?: number;
  radius?: number;
  accent?: boolean;
} & Omit<ThreeElements["group"], "args" | "ref">;

/** A single bevelled precast unit with matte concrete surfacing. */
export function ConcreteBlock({
  size = [1, 0.4, 1],
  tone = 0.25,
  roughness = 0.9,
  radius = 0.035,
  accent = false,
  ...group
}: BlockProps) {
  const material = useMemo(
    () => (accent ? accentMaterial() : concreteMaterial(tone, roughness)),
    [accent, tone, roughness],
  );
  return (
    <group {...group}>
      <RoundedBox args={size} radius={radius} smoothness={3} castShadow receiveShadow material={material} />
    </group>
  );
}

/** Hollow block: a frame with two voids, built from reused box geometry. */
export function HollowBlock({
  tone = 0.35,
  ...group
}: { tone?: number } & Omit<ThreeElements["group"], "args" | "ref">) {
  const material = useMemo(() => concreteMaterial(tone, 0.94), [tone]);
  const w = 1.6;
  const h = 0.7;
  const d = 0.8;
  const wall = 0.16;
  return (
    <group {...group}>
      {/* long walls */}
      <mesh position={[0, 0, d / 2 - wall / 2]} material={material} castShadow receiveShadow>
        <boxGeometry args={[w, h, wall]} />
      </mesh>
      <mesh position={[0, 0, -d / 2 + wall / 2]} material={material} castShadow receiveShadow>
        <boxGeometry args={[w, h, wall]} />
      </mesh>
      {/* end + centre webs */}
      {[-w / 2 + wall / 2, 0, w / 2 - wall / 2].map((x) => (
        <mesh key={x} position={[x, 0, 0]} material={material} castShadow receiveShadow>
          <boxGeometry args={[wall, h, d]} />
        </mesh>
      ))}
    </group>
  );
}

/** Road kerb profile — a chamfered rectangular section. */
export function Kerb({ tone = 0.3, ...group }: { tone?: number } & Omit<ThreeElements["group"], "args" | "ref">) {
  const material = useMemo(() => concreteMaterial(tone, 0.92), [tone]);
  return (
    <group {...group}>
      <mesh material={material} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.45, 0.32]} />
      </mesh>
      <mesh position={[0, 0.26, 0.02]} rotation={[Math.PI / 12, 0, 0]} material={material} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.1, 0.3]} />
      </mesh>
    </group>
  );
}
