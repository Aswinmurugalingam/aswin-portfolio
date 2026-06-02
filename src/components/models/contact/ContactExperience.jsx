import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";

import Computer from "./Computer";
import { useNearViewport } from "../../../hooks/useNearViewport";

const ContactExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [containerRef, shouldRender] = useNearViewport("480px");

  return (
    <div ref={containerRef} className="h-full w-full">
      {shouldRender && (
        <Canvas
          frameloop="demand"
          shadows={false}
          camera={{ position: [0, 3, 7], fov: 45 }}
          dpr={isMobile ? 1 : [1, 1.25]}
          gl={{ antialias: !isMobile, powerPreference: "low-power" }}
          performance={{ min: 0.6 }}
        >
          <ambientLight intensity={0.5} color="#fff4e6" />
          <directionalLight position={[5, 5, 3]} intensity={2.5} color="#ffd9b3" />
          {!isMobile && (
            <directionalLight position={[5, 9, 1]} intensity={1.4} color="#ffd9b3" />
          )}

          <OrbitControls
            enableZoom={false}
            minPolarAngle={Math.PI / 5}
            maxPolarAngle={Math.PI / 2}
          />

          <group scale={[1, 1, 1]}>
            <mesh
              receiveShadow={false}
              position={[0, -1.5, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <planeGeometry args={[30, 30]} />
              <meshStandardMaterial color="#a46b2d" />
            </mesh>
          </group>

          <group scale={0.03} position={[0, -1.49, -2]}>
            <Computer />
          </group>
        </Canvas>
      )}
    </div>
  );
};

export default ContactExperience;
