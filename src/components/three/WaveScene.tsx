"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CYAN_LIGHT = "#5fe3f6";

type Props = {
  /** Fewer points and a lower pixel ratio for phones and tablets. */
  lite?: boolean;
  /** Freeze the motion (prefers-reduced-motion). */
  still?: boolean;
  /** Pause the render loop while off screen. */
  paused?: boolean;
};

/** A rolling field of glowing points seen in perspective. Used as a 3D backdrop for dark bands. */
export default function WaveScene({ lite = false, still = false, paused = false }: Props) {
  return (
    <Canvas
      // Decoration only: it must never capture taps or block scrolling.
      style={{ pointerEvents: "none" }}
      dpr={lite ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 3.4, 9], fov: 45 }}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      frameloop={paused ? "never" : still ? "demand" : "always"}
    >
      <Wave cols={lite ? 54 : 96} rows={lite ? 24 : 40} still={still} />
    </Canvas>
  );
}

const height = (x: number, z: number, t: number) =>
  Math.sin(x * 0.55 + t * 0.9) * 0.45 + Math.cos(z * 0.7 + t * 0.6) * 0.35 + Math.sin((x + z) * 0.3 + t * 0.4) * 0.2;

function Wave({ cols, rows, still }: { cols: number; rows: number; still: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const p = new Float32Array(cols * rows * 3);
    let i = 0;
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const x = (c / (cols - 1) - 0.5) * 30;
        const z = (r / (rows - 1) - 0.5) * 16;
        p[i++] = x;
        p[i++] = height(x, z, 0);
        p[i++] = z;
      }
    }
    return p;
  }, [cols, rows]);

  useFrame(({ clock }) => {
    const pts = ref.current;
    if (!pts || still) return;
    const t = clock.elapsedTime;
    const attr = pts.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) arr[i + 1] = height(arr[i], arr[i + 2], t);
    attr.needsUpdate = true;
    pts.rotation.y = Math.sin(t * 0.08) * 0.12;
  });

  return (
    <points ref={ref} position={[0, -1.2, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={CYAN_LIGHT} size={0.06} sizeAttenuation transparent opacity={0.75} depthWrite={false} toneMapped={false} />
    </points>
  );
}
