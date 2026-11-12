"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* Brand colors from the ADDMARKPRO logo (see globals.css) */
const CYAN = "#19c4e2";
const CYAN_LIGHT = "#5fe3f6";
const TEAL = "#01849e";

type Props = {
  /** Fewer particles / dots and a lower pixel ratio for phones and tablets. */
  lite?: boolean;
  /** Freeze continuous motion (prefers-reduced-motion). */
  still?: boolean;
  /** Pause the render loop while the hero is off screen. */
  paused?: boolean;
};

export default function HeroScene({ lite = false, still = false, paused = false }: Props) {
  return (
    <Canvas
      // The canvas is decoration only: it must never capture taps or block scrolling.
      style={{ pointerEvents: "none" }}
      dpr={lite ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 0, 8.2], fov: 40 }}
      gl={{ antialias: !lite, alpha: true, powerPreference: "high-performance" }}
      frameloop={paused ? "never" : still ? "demand" : "always"}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[-4, 5, 5]} intensity={1.6} color="#e8fbff" />
      <pointLight position={[4, -2, -3]} intensity={30} distance={14} color={CYAN} />
      <pointLight position={[-5, -3, 2]} intensity={12} distance={12} color={TEAL} />
      <Rig still={still}>
        <Globe lite={lite} still={still} />
        <Rings still={still} />
        <Pedestal />
      </Rig>
      <Particles count={lite ? 220 : 520} still={still} />
    </Canvas>
  );
}

/* ── Pointer + scroll parallax for the whole composition ── */
function Rig({ children, still }: { children: React.ReactNode; still: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Listen on window: the canvas itself has pointer-events disabled.
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g || still) return;
    const k = 1 - Math.exp(-dt * 3);
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.2);
    g.rotation.y += (pointer.current.x * 0.35 - g.rotation.y) * k;
    g.rotation.x += (pointer.current.y * 0.18 + scroll * 0.25 - g.rotation.x) * k;
    g.position.y += (-scroll * 0.9 - g.position.y) * k;
  });

  return <group ref={group}>{children}</group>;
}

/* ── Digital globe: dark metallic core, dotted "landmass", grid lines and a fresnel atmosphere ── */
function Globe({ lite, still }: { lite: boolean; still: boolean }) {
  const spin = useRef<THREE.Group>(null);
  const R = 1.6;

  const { land, sea } = useMemo(() => {
    const n = lite ? 2200 : 4200;
    const landPts: number[] = [];
    const seaPts: number[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      const x = Math.cos(th) * r;
      const z = Math.sin(th) * r;
      // Layered sine "noise" carves continent-like clusters out of the even dot grid.
      const v =
        Math.sin(x * 3.1 + 1.3) * Math.cos(y * 2.7) +
        Math.sin(z * 3.7 + x * 1.9) * 0.8 +
        Math.sin(y * 5.3 + z * 2.1) * 0.4;
      if (v > 0.25) landPts.push(x * R * 1.006, y * R * 1.006, z * R * 1.006);
      else if (i % 3 === 0) seaPts.push(x * R * 1.003, y * R * 1.003, z * R * 1.003);
    }
    return { land: new Float32Array(landPts), sea: new Float32Array(seaPts) };
  }, [lite]);

  const atmosphere = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color(CYAN) } },
        vertexShader: /* glsl */ `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          varying vec3 vNormal;
          void main() {
            float i = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.2);
            gl_FragColor = vec4(uColor, 1.0) * i;
          }`,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
      }),
    [],
  );
  useEffect(() => () => atmosphere.dispose(), [atmosphere]);

  useFrame((_, dt) => {
    if (spin.current && !still) spin.current.rotation.y += dt * 0.12;
  });

  return (
    <group rotation={[0.35, 0, -0.18]}>
      <group ref={spin}>
        <mesh>
          <sphereGeometry args={[R, 64, 64]} />
          <meshStandardMaterial color="#0b1c26" metalness={0.65} roughness={0.32} emissive="#02303d" emissiveIntensity={0.55} />
        </mesh>
        <mesh>
          <sphereGeometry args={[R * 1.012, 36, 18]} />
          <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.07} />
        </mesh>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[land, 3]} />
          </bufferGeometry>
          <pointsMaterial color={CYAN_LIGHT} size={0.032} sizeAttenuation transparent opacity={0.95} toneMapped={false} />
        </points>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[sea, 3]} />
          </bufferGeometry>
          <pointsMaterial color={CYAN} size={0.018} sizeAttenuation transparent opacity={0.28} />
        </points>
      </group>
      <mesh scale={1.22} material={atmosphere}>
        <sphereGeometry args={[R, 48, 48]} />
      </mesh>
    </group>
  );
}

/* ── Orbital rings, each carrying a glowing satellite ── */
const RINGS = [
  { r: 2.35, tilt: [1.25, 0.25, 0.1], speed: 0.5, tube: 0.012 },
  { r: 2.7, tilt: [1.05, -0.5, 0.35], speed: -0.35, tube: 0.008 },
  { r: 3.05, tilt: [1.6, 0.4, -0.55], speed: 0.25, tube: 0.006 },
] as const;

function Rings({ still }: { still: boolean }) {
  return (
    <>
      {RINGS.map((ring, i) => (
        <Ring key={i} {...ring} still={still} />
      ))}
    </>
  );
}

function Ring({ r, tilt, speed, tube, still }: (typeof RINGS)[number] & { still: boolean }) {
  const orbit = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (orbit.current && !still) orbit.current.rotation.z += dt * speed;
  });
  return (
    <group rotation={tilt as unknown as [number, number, number]}>
      <mesh>
        <torusGeometry args={[r, tube, 8, 220]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.75} toneMapped={false} />
      </mesh>
      <group ref={orbit}>
        <mesh position={[r, 0, 0]}>
          <sphereGeometry args={[0.07, 20, 20]} />
          <meshBasicMaterial color="#d9f8ff" toneMapped={false} />
        </mesh>
        <mesh position={[r, 0, 0]}>
          <sphereGeometry args={[0.16, 20, 20]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.25} toneMapped={false} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}

/* ── Glowing platform the globe hovers above ── */
function Pedestal() {
  return (
    <group position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <ringGeometry args={[1.0, 1.05, 96]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.85} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <ringGeometry args={[1.28, 1.295, 96]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <circleGeometry args={[1.0, 96]} />
        <meshBasicMaterial color={TEAL} transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* ── Ambient particle field ── */
function Particles({ count, still }: { count: number; still: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.4 + Math.random() * 4.5;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      p[i * 3] = r * Math.sin(ph) * Math.cos(th);
      p[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.7;
      p[i * 3 + 2] = r * Math.cos(ph) - 2;
    }
    return p;
  }, [count]);

  useFrame((_, dt) => {
    if (ref.current && !still) ref.current.rotation.y -= dt * 0.025;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={CYAN_LIGHT} size={0.035} sizeAttenuation transparent opacity={0.55} depthWrite={false} />
    </points>
  );
}
