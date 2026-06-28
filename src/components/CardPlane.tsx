"use client";

import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { memo, useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { Mesh, MeshBasicMaterial, PlaneGeometry, SRGBColorSpace, Texture } from "three";

export type HeroCardPlaneProps = {
  textureUrl: string;
  position: [number, number, number];
  rotation: [number, number, number];
  phase: number;
  floatAmplitude: number;
  floatSpeed: number;
  introDelay: number;
  isHovered: MutableRefObject<boolean>;
};

const CARD_WIDTH = 4.93;
const CARD_HEIGHT = CARD_WIDTH / 1.5;

function easeOutExpo(value: number) {
  return value >= 1 ? 1 : 1 - 2 ** (-10 * value);
}

function CardPlaneComponent({
  textureUrl,
  position,
  rotation,
  phase,
  floatAmplitude,
  floatSpeed,
  introDelay,
  isHovered,
}: HeroCardPlaneProps) {
  const meshRef = useRef<Mesh<PlaneGeometry, MeshBasicMaterial>>(null);
  const materialRef = useRef<MeshBasicMaterial>(null);
  const sourceTexture = useTexture(textureUrl) as Texture;
  const texture = useMemo(() => {
    const clone = sourceTexture.clone();
    clone.colorSpace = SRGBColorSpace;
    clone.anisotropy = 4;
    clone.needsUpdate = true;
    return clone;
  }, [sourceTexture]);

  useEffect(() => {
    return () => texture.dispose();
  }, [texture]);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    const material = materialRef.current;
    if (!mesh || !material) return;

    const elapsed = state.clock.elapsedTime;
    const float = Math.sin(elapsed * floatSpeed + phase) * floatAmplitude;
    const drift = Math.cos(elapsed * (floatSpeed * 0.6) + phase) * 0.012;
    const hoverLift = isHovered.current ? 0.1 : 0;
    const progress = easeOutExpo(Math.min(1, Math.max(0, (elapsed - introDelay) / 1.2)));
    const entryOffset = (1 - progress) * 3.6;

    mesh.position.x = position[0] + entryOffset;
    mesh.position.y = position[1] + float;
    mesh.position.z = position[2] + hoverLift;
    mesh.rotation.set(
      rotation[0] + (1 - progress) * -0.1,
      rotation[1] + (1 - progress) * 0.18,
      rotation[2] + drift + (1 - progress) * -0.12,
    );
    mesh.scale.setScalar(0.96 + progress * 0.04);
    material.opacity += (progress - material.opacity) * Math.min(1, delta * 10);
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} castShadow>
      <planeGeometry args={[CARD_WIDTH, CARD_HEIGHT, 1, 1]} />
      <meshBasicMaterial
        ref={materialRef}
        map={texture}
        transparent
        opacity={0}
        alphaTest={0.02}
        toneMapped={false}
      />
    </mesh>
  );
}

export const CardPlane = memo(CardPlaneComponent);

useTexture.preload("/assets/hero-card-white.png");
useTexture.preload("/assets/hero-card-black.png");
useTexture.preload("/assets/hero-card-purple.png");
