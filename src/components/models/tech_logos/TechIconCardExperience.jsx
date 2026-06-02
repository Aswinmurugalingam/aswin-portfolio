import { Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";
import { useNearViewport } from "../../../hooks/useNearViewport";

// Detect touch device once at module level
const isTouchDevice =
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none) and (pointer: coarse)").matches;

const TechIconScene = ({ model }) => {
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
    <>
      <ambientLight intensity={0.75} />
      <hemisphereLight intensity={0.9} groundColor="#222" />
      <directionalLight position={[5, 5, 5]} intensity={1.25} />
      {!isTouchDevice && (
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={1} />
      )}

      <Float speed={0.8} rotationIntensity={0.25} floatIntensity={0.35}>
        <group scale={model.scale} rotation={model.rotation}>
          <primitive object={scene.scene} />
        </group>
      </Float>

      <OrbitControls enableZoom={false} enableDamping={false} />
    </>
  );
};

const TechIconCardExperience = ({ model }) => {
  const [containerRef, shouldRender] = useNearViewport("420px");

  return (
    <div ref={containerRef} className="h-full w-full">
      {shouldRender && (
        <Canvas
          dpr={1}
          frameloop="demand"
          gl={{ antialias: false, powerPreference: "low-power" }}
          performance={{ min: 0.6 }}
        >
          <TechIconScene model={model} />
        </Canvas>
      )}
    </div>
  );
};

export default TechIconCardExperience;
