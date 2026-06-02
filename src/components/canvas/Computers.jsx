import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const FAN_NAME_RE = /(fan|blade|prop|cooler)/i;

const useCanvasVisibility = (rootMargin = "240px") => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [containerRef, isVisible];
};

const ComputerModel = () => {
  const { scene } = useGLTF("/desktop_pc/scene.gltf");
  const fanObjectsRef = useRef([]);

  useEffect(() => {
    if (!scene) return;

    scene.background = null;

    const fans = [];
    scene.traverse((obj) => {
      if (obj?.name && FAN_NAME_RE.test(obj.name)) {
        fans.push(obj);
      }
    });

    fanObjectsRef.current = fans;
  }, [scene]);

  useFrame((_, delta) => {
    const fans = fanObjectsRef.current;
    if (!fans.length) return;

    for (const fan of fans) {
      fan.rotation.z += delta * 14;
    }
  });

  return (
    <primitive
      object={scene}
      scale={0.58}
      position={[0.9, -1.65, 0]}
      rotation={[0, -0.25, 0]}
    />
  );
};

const ComputersCanvas = ({ isMobile }) => {
  const controlsRef = useRef(null);
  const [containerRef, isVisible] = useCanvasVisibility();

  useEffect(() => {
    if (!controlsRef.current) return;
    controlsRef.current.target = new THREE.Vector3(0.7, -1.15, 0);
    controlsRef.current.update();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas
        frameloop={isVisible && !isMobile ? "always" : "demand"}
        dpr={isMobile ? 1 : [1, 1.5]}
        shadows={false}
        gl={{
          preserveDrawingBuffer: false,
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [12, 3, 12], fov: 30 }}
        performance={{ min: 0.6 }}
        style={{ pointerEvents: "auto", background: "transparent" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <hemisphereLight intensity={isMobile ? 0.3 : 0.5} />
          {!isMobile && (
            <directionalLight intensity={0.9} position={[6, 8, 6]} />
          )}

          <OrbitControls
            ref={controlsRef}
            enableZoom={false}
            enablePan={false}
            enableDamping={isVisible && !isMobile}
            dampingFactor={0.08}
            rotateSpeed={isMobile ? 1.2 : 2.2}
          />

          <ComputerModel />
        </Suspense>

        {!isMobile && isVisible && <Preload all />}
      </Canvas>
    </div>
  );
};

export default ComputersCanvas;

useGLTF.preload("/desktop_pc/scene.gltf");
