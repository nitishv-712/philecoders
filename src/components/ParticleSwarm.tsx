"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls, Effects } from "@react-three/drei";
import { UnrealBloomPass } from "three-stdlib";
import * as THREE from "three";

// Suppress THREE.Clock deprecation warning from @react-three/fiber internals
const _warn = console.warn;
console.warn = (...args: unknown[]) => {
  if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
  _warn(...args);
};

extend({ UnrealBloomPass });

function ParticleSwarmInner() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 6000;
  const speedMult = 1;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pColor = useMemo(() => new THREE.Color(), []);

  const positions = useMemo(() => {
    const pos: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++)
      pos.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100
        )
      );
    return pos;
  }, []);

  const material = useMemo(
    () => new THREE.MeshBasicMaterial({ color: 0xffffff }),
    []
  );
  const geometry = useMemo(() => new THREE.SphereGeometry(0.3, 4, 3), []);

  // Constants hoisted out of the loop
  const scale = 70;
  const vortex = 1.6;
  const jetPower = 1.4;
  const chaos = 0.55;
  const diskEnd = 0.72;
  const jetEnd = 0.9;
  const diskCount = Math.floor(count * diskEnd);
  const jetCount = Math.floor(count * jetEnd);
  const coronaTotal = count - jetCount;
  const PI = Math.PI;

  // Pre-compute per-particle static values that don't change each frame
  const particleData = useMemo(() => {
    const data = new Float32Array(count * 4); // t, category-specific pre-calc 1, 2, 3
    for (let i = 0; i < count; i++) {
      const t = i / count;
      data[i * 4] = t;
      if (t < diskEnd) {
        data[i * 4 + 1] = t / diskEnd; // dt
      } else if (t < jetEnd) {
        data[i * 4 + 1] = (t - diskEnd) / (jetEnd - diskEnd); // jt
        data[i * 4 + 2] = (i & 1) === 0 ? 1.0 : -1.0; // side
      } else {
        const cIdx = i - jetCount;
        const cosArg = Math.max(-1.0, Math.min(1.0, 1.0 - (2.0 * (cIdx + 0.5)) / coronaTotal));
        data[i * 4 + 1] = Math.acos(cosArg); // theta
        data[i * 4 + 2] = 2.39996 * cIdx; // phi2
        data[i * 4 + 3] = Math.sin(data[i * 4 + 1]); // sinT (precomputed)
      }
    }
    return data;
  }, []);

  // Throttle: only update every 2nd frame
  const frameCount = useRef(0);

  useFrame((state) => {
    if (!meshRef.current) return;
    frameCount.current++;
    if (frameCount.current % 2 !== 0) return; // Skip odd frames

    const time = state.clock.getElapsedTime() * speedMult;
    const tiltA = time * 0.04;
    const cosA = Math.cos(tiltA);
    const sinA = Math.sin(tiltA);
    const mesh = meshRef.current;

    for (let i = 0; i < count; i++) {
      const idx = i * 4;
      const t = particleData[idx];

      let px: number, py: number, pz: number;
      let hue: number, sat: number, lit: number;

      if (t < diskEnd) {
        const dt = particleData[idx + 1];
        const angle = dt * PI * 14.0 + time * vortex * (1.0 - dt * 0.6);
        const r = 0.12 + dt * 0.88;
        const diskH = (0.03 + dt * 0.07) * Math.sin(angle * 4.0 + time * 1.5 + dt * 6.0);
        const ripple = chaos * 0.1 * Math.sin(angle * 6.7 - time * 2.9) * Math.cos(dt * 9.0 + time * 0.7);
        const rr = r + ripple;
        px = Math.cos(angle) * rr;
        py = Math.sin(angle) * rr;
        pz = diskH;
        hue = 0.04 + dt * 0.09 + 0.03 * Math.sin(angle + time);
        sat = 0.95;
        lit = 0.55 - dt * 0.2 + 0.15 * Math.abs(Math.sin(angle * 2.0 + time));
      } else if (t < jetEnd) {
        const jt = particleData[idx + 1];
        const side = particleData[idx + 2];
        const jAngle = jt * PI * 6.0 + time * 2.2;
        const jR = 0.04 + jt * 0.08 * Math.sin(jt * PI);
        px = jR * Math.cos(jAngle) + chaos * 0.035 * Math.sin(jt * 15.0 + time * 4.3);
        py = jR * Math.sin(jAngle) + chaos * 0.035 * Math.cos(jt * 13.0 - time * 3.8);
        pz = side * (0.08 + jt * jetPower * 0.9);
        hue = 0.58 + 0.12 * Math.sin(jt * PI * 3.0 + time * 1.5);
        sat = 1.0;
        lit = 0.55 + 0.25 * (1.0 - jt);
      } else {
        const theta = particleData[idx + 1];
        const phi2 = particleData[idx + 2];
        const sinT = particleData[idx + 3];
        const cr = 0.9 + 0.18 * Math.sin(phi2 * 3.0 + time * 0.7);
        const cw = chaos * 0.08 * Math.sin(theta * 5.0 + time * 1.1) * Math.cos(phi2 * 4.0 - time * 0.6);
        const crf = cr + cw;
        px = sinT * Math.cos(phi2) * crf;
        py = sinT * Math.sin(phi2) * crf;
        pz = Math.cos(theta) * crf;
        hue = 0.68 + 0.14 * Math.sin(theta * 4.0 + phi2 * 0.5 + time * 0.4);
        sat = 0.65 + 0.35 * Math.abs(Math.sin(phi2 * 2.0 + time * 0.3));
        lit = 0.22 + 0.18 * Math.abs(Math.sin(theta * 5.0 + phi2 + time * 0.6));
      }

      // Apply tilt rotation
      const rpx = px * cosA - pz * sinA;
      const rpz = px * sinA + pz * cosA;

      target.set(rpx * scale, py * scale, rpz * scale);

      pColor.setHSL(
        ((hue % 1.0) + 1.0) % 1.0,
        Math.min(1.0, Math.max(0.0, sat)),
        Math.min(0.9, Math.max(0.05, lit))
      );

      positions[i].lerp(target, 0.1);
      dummy.position.copy(positions[i]);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, pColor);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, count]} />;
}

export default function ParticleSwarm() {
  return (
    <Canvas
      camera={{ position: [0, 0, 100], fov: 60 }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <fog attach="fog" args={["#000000", 0.01]} />
      <ParticleSwarmInner />
      <OrbitControls autoRotate enableZoom={false} enablePan={false} />
      <Effects disableGamma>
        {/* @ts-expect-error - extend() registered component */}
        <unrealBloomPass threshold={0.1} strength={1.4} radius={0.3} />
      </Effects>
    </Canvas>
  );
}
