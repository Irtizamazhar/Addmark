"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useInView, useSceneSettings } from "./useSceneSettings";

// three.js is heavy and browser-only, so it loads after hydration in its own chunk.
const WaveScene = dynamic(() => import("./WaveScene"), { ssr: false });

/**
 * Drop-in 3D wave backdrop. Position it with `className` (it fills its own box).
 * Renders nothing without WebGL, and stops rendering while scrolled off screen.
 */
export default function SceneBackdrop({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { webgl, lite, still } = useSceneSettings();
  const inView = useInView(ref);
  return (
    <div ref={ref} aria-hidden className={`pointer-events-none ${className}`}>
      {webgl && <WaveScene lite={lite} still={still} paused={!inView} />}
    </div>
  );
}
