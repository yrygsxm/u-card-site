"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import { Scene, type Hero3DTier } from "@/components/Scene";

function getTier(width: number): Hero3DTier {
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

export function Hero3D() {
  const [tier, setTier] = useState<Hero3DTier>("desktop");

  useEffect(() => {
    const updateTier = () => setTier(getTier(window.innerWidth));
    updateTier();
    window.addEventListener("resize", updateTier, { passive: true });
    return () => window.removeEventListener("resize", updateTier);
  }, []);

  return (
    <div
      className="relative mx-auto aspect-[59/30] w-full max-w-[1180px] translate-x-0 overflow-visible lg:translate-x-[50px]"
      role="img"
      aria-label="三张悬浮的加密货币银行卡"
    >
      <div className="pointer-events-none absolute inset-[6%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(96,165,250,0.18),rgba(139,92,246,0.1)_38%,transparent_72%)] blur-2xl" />
      <Canvas
        dpr={tier === "desktop" ? [1, 1.6] : [1, 1.25]}
        camera={{ position: [0, 0, 8.5], fov: 23 }}
        gl={{ alpha: true, antialias: true, powerPreference: tier === "mobile" ? "low-power" : "high-performance" }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = SRGBColorSpace;
          gl.toneMapping = ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.06;
        }}
      >
        <Suspense fallback={null}>
          <Scene tier={tier} />
        </Suspense>
      </Canvas>
    </div>
  );
}
