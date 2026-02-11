import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Rotates any meshes/objects in the GLTF whose name looks like a fan/blades.
// If your model uses different names, tell me the node names and I’ll tighten the match.
const FAN_NAME_RE = /(fan|blade|prop|cooler)/i;

const ComputerModel = () => {
  const { scene } = useGLTF("/desktop_pc/scene.gltf");

  // Collect likely fan objects once the scene is available
  const fanObjectsRef = useRef([]);

  useEffect(() => {
    if (!scene) return;

    // Ensure transparent canvas can show background layers behind the 3D model
    scene.background = null;

    // Find objects that look like fans by name
    const fans = [];
    scene.traverse((obj) => {
      if (!obj) return;
      if (obj.name && FAN_NAME_RE.test(obj.name)) {
        fans.push(obj);
      }
    });

    fanObjectsRef.current = fans;

    // (Optional) Debug: uncomment to print node names in console, then share with me
    // console.log("GLTF nodes:", scene);
    // console.log("Detected fan-like nodes:", fans.map((f) => f.name));

  }, [scene]);

  // Spin the detected fans
  useFrame((_, delta) => {
    const fans = fanObjectsRef.current;
    if (!fans || fans.length === 0) return;

    // radians per second (increase for faster spin)
    const speed = 14;

    for (const f of fans) {
      // Try Z axis first (common for fan blades in GLTF exports)
      f.rotation.z += delta * speed;
    }
  });

  return (
    <primitive
      object={scene}
      scale={0.48}
      position={[0.9, -1.65, 0]}
      rotation={[0, -0.25, 0]}
    />
  );
};

const ComputersCanvas = () => {
  const controlsRef = useRef(null);

  useEffect(() => {
    if (!controlsRef.current) return;
    controlsRef.current.target = new THREE.Vector3(0.7, -1.15, 0);
    controlsRef.current.update();
  }, []);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
      camera={{ position: [12, 3, 12], fov: 30, near: 0.1, far: 200 }}
      style={{ pointerEvents: "auto", background: "transparent" }}
      onCreated={({ gl }) => {
        // Make renderer background transparent so CodeRain can render behind
        gl.setClearColor(0x000000, 0);
      }}
      onWheel={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Suspense fallback={null}>
        <hemisphereLight intensity={0.5} groundColor="black" />
        <directionalLight intensity={0.9} position={[6, 8, 6]} />
        <pointLight intensity={0.5} position={[-4, 3, 2]} />

        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableRotate
          enableZoom
          zoomSpeed={0.9}
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={2.2}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 2}
          minDistance={6.5}
          maxDistance={16}
        />

        <ComputerModel />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;

useGLTF.preload("/desktop_pc/scene.gltf");


/* =========================
   🔧 ADVANCED VISUAL UPGRADES
   Added WITHOUT removing existing logic
   ========================= */

import { useState } from "react";
import { useThree } from "@react-three/fiber";

// ===== FAN + RGB + GPU + SCREEN ANIMATION HOOK =====
export const useWorkstationFX = (scene) => {
  const bladeRefs = [];
  const gpuFanRefs = [];
  const rgbMaterials = [];
  const screenMeshes = [];

  // Detect parts once
  scene.traverse((obj) => {
    if (!obj.name) return;

    const n = obj.name.toLowerCase();

    // Fan blades
    if (/(blade|fan_blade|rotor|prop)/.test(n)) {
      bladeRefs.push(obj);
    }

    // GPU fans
    if (/(gpu|graphic).*?(blade|fan)/.test(n)) {
      gpuFanRefs.push(obj);
    }

    // RGB materials
    if (obj.material && obj.material.emissive) {
      rgbMaterials.push(obj.material);
    }

    // Monitor screen
    if (/(screen|monitor|display)/.test(n)) {
      screenMeshes.push(obj);
    }
  });

  return { bladeRefs, gpuFanRefs, rgbMaterials, screenMeshes };
};

// ===== GLOBAL FAN SPEED CONTROLLER =====
let fanSpeed = 8;
let targetFanSpeed = 8;

export const setFanSpeedBoost = (boost) => {
  targetFanSpeed = boost;
};

// ===== FRAME LOOP FX =====
export const applyWorkstationFrameFX = (
  delta,
  bladeRefs,
  gpuFanRefs,
  rgbMaterials,
  screenMeshes
) => {
  // Smooth fan speed lerp
  fanSpeed += (targetFanSpeed - fanSpeed) * 0.05;

  // Spin cabinet fans
  bladeRefs.forEach((b) => {
    b.rotation.z += delta * fanSpeed;
  });

  // Spin GPU fans
  gpuFanRefs.forEach((b) => {
    b.rotation.z += delta * (fanSpeed + 4);
  });

  // RGB glow pulse
  const t = performance.now() * 0.002;
  rgbMaterials.forEach((m) => {
    if (!m.emissiveIntensity) m.emissiveIntensity = 1;
    m.emissiveIntensity = 1.5 + Math.sin(t) * 0.5;
  });

  // Screen scroll effect (texture offset)
  screenMeshes.forEach((s) => {
    if (s.material?.map) {
      s.material.map.offset.y -= delta * 0.2;
    }
  });
};

// ===== SCROLL + HOVER BOOST =====
if (typeof window !== "undefined") {
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    targetFanSpeed = 8 + Math.min(y / 200, 10);
  });
}
