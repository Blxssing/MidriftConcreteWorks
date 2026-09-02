import { Environment, Lightformer } from "@react-three/drei";
import { scenePalette } from "./palette";

/**
 * Restrained architectural-visualisation lighting:
 * soft ambient fill + one key light + large-area lightformers for gentle reflections.
 */
export function SceneLighting({ shadows = true }: { shadows?: boolean }) {
  return (
    <>
      <ambientLight intensity={0.4} color={scenePalette.concrete} />
      <hemisphereLight args={[scenePalette.concrete, scenePalette.inkDeep, 0.45]} />
      <directionalLight
        position={[6, 9, 5]}
        intensity={0.95}
        color="#fff6e6"
        castShadow={shadows}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={40}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-bias={-0.0006}
      />
      <directionalLight position={[-7, 4, -6]} intensity={0.35} color={scenePalette.accentSoft} />
      <Environment resolution={128}>
        <Lightformer intensity={1.6} position={[0, 6, 2]} scale={[14, 8, 1]} color="#ffffff" />
        <Lightformer
          intensity={0.7}
          color={scenePalette.concrete}
          position={[-7, 2, -2]}
          rotation-y={Math.PI / 2}
          scale={[18, 3, 1]}
        />
        <Lightformer
          intensity={0.5}
          color={scenePalette.accentSoft}
          position={[7, 1, 1]}
          rotation-y={-Math.PI / 2}
          scale={[14, 2, 1]}
        />
      </Environment>
    </>
  );
}
