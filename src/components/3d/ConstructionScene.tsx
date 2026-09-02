import { Suspense, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { SceneLighting } from "./SceneLighting";
import { concreteMaterial } from "./ConcreteBlock";

type Props = {
  progress: MutableRefObject<number>;
  reducedMotion: boolean;
  mobile: boolean;
};

const COLS_DESKTOP = 7;
const ROWS_DESKTOP = 5;
const COLS_MOBILE = 5;
const ROWS_MOBILE = 4;

const BW = 1.05;
const BH = 0.46;
const BD = 0.5;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

type Unit = {
  target: THREE.Vector3;
  from: THREE.Vector3;
  start: number;
  end: number;
  tone: number;
  spin: number;
};

/** Individual precast units fly into place and form a wall as the section scrolls. */
function Wall({ progress, reducedMotion, mobile }: Props) {
  const group = useRef<THREE.Group>(null);
  const meshes = useRef<THREE.Mesh[]>([]);
  const cols = mobile ? COLS_MOBILE : COLS_DESKTOP;
  const rows = mobile ? ROWS_MOBILE : ROWS_DESKTOP;

  const geometry = useMemo(() => new THREE.BoxGeometry(BW * 0.96, BH * 0.9, BD), []);
  const materials = useMemo(
    () => [0.14, 0.24, 0.34, 0.44].map((t) => concreteMaterial(t, 0.93)) as THREE.MeshStandardMaterial[],
    [],
  );
  const matAt = (i: number) => materials[i] ?? materials[0]!;

  const units = useMemo<Unit[]>(() => {
    const list: Unit[] = [];
    let i = 0;
    for (let r = 0; r < rows; r++) {
      const offset = r % 2 === 0 ? 0 : BW / 2;
      for (let c = 0; c < cols; c++) {
        const x = (c - (cols - 1) / 2) * BW + offset;
        const y = r * BH - (rows * BH) / 2;
        const seq = i / (rows * cols);
        list.push({
          target: new THREE.Vector3(x, y, 0),
          from: new THREE.Vector3(
            x + (c % 2 === 0 ? -5.5 : 5.5) - (r % 2) * 1.2,
            y + 3.4 + r * 0.5,
            (i % 3) - 2.4,
          ),
          start: seq * 0.62,
          end: seq * 0.62 + 0.34,
          tone: i % 4,
          spin: ((i % 5) - 2) * 0.6,
        });
        i++;
      }
    }
    return list;
  }, [cols, rows]);

  useFrame(({ camera }, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const p = clamp01(progress.current);

    for (let i = 0; i < units.length; i++) {
      const u = units[i]!;
      const mesh = meshes.current[i];
      if (!mesh) continue;
      const local = easeOut(clamp01((p - u.start) / (u.end - u.start)));
      mesh.position.lerpVectors(u.from, u.target, local);
      mesh.rotation.y = u.spin * (1 - local);
      mesh.rotation.z = u.spin * 0.3 * (1 - local);
      const s = 0.86 + 0.14 * local;
      mesh.scale.setScalar(s);
    }

    // subtle camera move as the structure completes
    const targetZ = 11.2 - p * 1.4;
    const targetY = 1.6 - p * 1.1;
    camera.position.z += (targetZ - camera.position.z) * (1 - Math.exp(-4 * dt));
    camera.position.y += (targetY - camera.position.y) * (1 - Math.exp(-4 * dt));
    camera.lookAt(0, 0, 0);

    if (group.current) {
      const targetRot = reducedMotion ? 0 : (0.55 - p * 0.55) * 0.6;
      group.current.rotation.y += (targetRot - group.current.rotation.y) * (1 - Math.exp(-4 * dt));
    }
  });

  return (
    <group ref={group} scale={mobile ? 0.5 : 0.6} position={[mobile ? 0 : 3.4, mobile ? -1.8 : -0.2, -1.5]}>
      {units.map((u, i) => (
        <mesh
          key={i}
          ref={(m) => {
            if (m) meshes.current[i] = m;
          }}
          geometry={geometry}
          material={matAt(u.tone)}
          castShadow={!mobile}
          receiveShadow={!mobile}
        />
      ))}
      {/* ground slab the wall sits on */}
      <mesh position={[0, -(rows * BH) / 2 - BH / 2 - 0.12, 0]} receiveShadow material={matAt(1)}>
        <boxGeometry args={[cols * BW + 1.6, 0.22, 2.4]} />
      </mesh>
      <ContactShadows
        position={[0, -(rows * BH) / 2 - 0.35, 0]}
        opacity={0.4}
        scale={16}
        blur={2.8}
        far={5}
        resolution={mobile ? 256 : 512}
      />
    </group>
  );
}

export default function ConstructionScene(props: Props) {
  return (
    <Canvas
      shadows={!props.mobile}
      dpr={props.mobile ? [1, 1.4] : [1, 1.8]}
      camera={{ position: [0, 1.6, 9.6], fov: 40 }}
      gl={{ antialias: !props.mobile, powerPreference: "high-performance", alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <SceneLighting shadows={!props.mobile} />
        <Wall {...props} />
      </Suspense>
    </Canvas>
  );
}
