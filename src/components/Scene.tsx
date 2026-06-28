"use client";

import { ContactShadows } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, MathUtils } from "three";
import { CardPlane } from "@/components/CardPlane";

export type Hero3DTier = "desktop" | "tablet" | "mobile";

const cardPlanes = [
  {
    textureUrl: "/assets/hero-card-white.png",
    position: [1.68, 0.44, 0] as [number, number, number],
    rotation: [0.02, -0.06, -0.055] as [number, number, number],
    phase: 0.35,
    floatAmplitude: 0.1,
    floatSpeed: 0.82,
    introDelay: 0,
  },
  {
    textureUrl: "/assets/hero-card-black.png",
    position: [0, 0.02, -0.4] as [number, number, number],
    rotation: [0, 0.04, -0.055] as [number, number, number],
    phase: 2.15,
    floatAmplitude: 0.085,
    floatSpeed: 0.72,
    introDelay: 0.24,
  },
  {
    textureUrl: "/assets/hero-card-purple.png",
    position: [-1.68, -0.4, -0.8] as [number, number, number],
    rotation: [-0.02, 0.06, -0.055] as [number, number, number],
    phase: 4.4,
    floatAmplitude: 0.095,
    floatSpeed: 0.92,
    introDelay: 0.48,
  },
];

export function Scene({ tier }: { tier: Hero3DTier }) {
  const parallaxGroup = useRef<Group>(null);
  const isHovered = useRef(false);
  const maxTilt = tier === "desktop" ? MathUtils.degToRad(8) : tier === "tablet" ? MathUtils.degToRad(4) : 0;

  useFrame((state, delta) => {
    if (parallaxGroup.current) {
      const hoverLift = isHovered.current ? 0.1 : 0;
      parallaxGroup.current.rotation.x = MathUtils.damp(
        parallaxGroup.current.rotation.x,
        tier === "mobile" ? 0 : state.pointer.y * maxTilt,
        5,
        delta,
      );
      parallaxGroup.current.rotation.y = MathUtils.damp(
        parallaxGroup.current.rotation.y,
        tier === "mobile" ? 0 : state.pointer.x * maxTilt,
        5,
        delta,
      );
      parallaxGroup.current.position.z = MathUtils.damp(parallaxGroup.current.position.z, hoverLift, 5, delta);
    }
  });

  return (
    <>
      <ambientLight intensity={1.2} color="#e0f2fe" />
      <directionalLight position={[4, 5, 6]} intensity={1.35} color="#dbeafe" />
      <spotLight position={[-4, 5, 5]} intensity={4.2} angle={0.52} penumbra={0.9} color="#93c5fd" />
      <spotLight position={[3, -1, 4]} intensity={2.6} angle={0.65} penumbra={1} color="#f5d0fe" />

      <group
        ref={parallaxGroup}
        onPointerEnter={() => {
          isHovered.current = true;
        }}
        onPointerLeave={() => {
          isHovered.current = false;
        }}
      >
        {cardPlanes.map((card) => (
          <CardPlane
            key={card.textureUrl}
            {...card}
            isHovered={isHovered}
          />
        ))}
      </group>

      <ContactShadows
        position={[0, -1.62, -1.35]}
        opacity={0.16}
        scale={9}
        blur={2.6}
        far={4.2}
        resolution={256}
        frames={90}
        color="#0f172a"
      />
    </>
  );
}
