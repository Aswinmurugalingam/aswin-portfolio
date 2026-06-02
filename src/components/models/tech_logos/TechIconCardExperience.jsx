import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";

// Detect touch device once at module level
const isTouchDevice =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none) and (pointer: coarse)").matches;

const TechIconCardExperience = ({ model }) => {
  const scene = useGLTF(model.modelPath);

  useEffect(() => {
    if (model.name === "Interactive Developer") {
      scene.scene.traverse((child) => {
        if (child.isMesh && child.name === "Object_5") {
          child.material = new THREE.MeshStandardMaterial({ color: "white" });
        }
      });
    }
  }, [scene, model.name]);

  return (
    <Canvas
      dpr={isTouchDevice ? 1 : [1, 1.5]}
      frameloop={isTouchDevice ? "demand" : "always"}
      gl={{ antialias: !isTouchDevice, powerPreference: "low-power" }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {!isTouchDevice && (
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} />
      )}
      <Environment preset="city" />

      <Float speed={isTouchDevice ? 2 : 5.5} rotationIntensity={0.5} floatIntensity={0.9}>
        <group scale={model.scale} rotation={model.rotation}>
          <primitive object={scene.scene} />
        </group>
      </Float>

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default TechIconCardExperience;