"use client";

import { useEffect, useState, type RefObject } from "react";

export type SceneSettings = {
  /** null until checked on the client */
  webgl: boolean | null;
  /** Touch devices, small screens and low-core CPUs get a lighter scene. */
  lite: boolean;
  /** prefers-reduced-motion */
  still: boolean;
};

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function useSceneSettings(): SceneSettings {
  const [s, setS] = useState<SceneSettings>({ webgl: null, lite: true, still: false });
  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.innerWidth < 1024;
    const weak = (navigator.hardwareConcurrency || 8) <= 4;
    setS({
      webgl: hasWebGL(),
      lite: coarse || small || weak,
      still: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }, []);
  return s;
}

/** True while the element is (nearly) on screen, so off-screen scenes can stop rendering. */
export function useInView(ref: RefObject<Element | null>, margin = "200px") {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);
  return inView;
}
