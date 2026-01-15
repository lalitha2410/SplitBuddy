import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";

function Blob({ position, scale = 3.2 }) {
  const mat = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mat.current) {
      mat.current.distort = 0.32 + Math.sin(t * 0.5) * 0.06;
      mat.current.speed = 1.2;
    }
  });

  return (
    <Sphere args={[1.8, 64, 64]} scale={scale} position={position}>
      <MeshDistortMaterial
        ref={mat}
        color="#A3E4B8"
        emissive="#0F3D2E"
        emissiveIntensity={0.18}
        roughness={0.2}
        distortion={0.3}
      />
    </Sphere>
  );
}

export default function WebGLBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 opacity-70">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={1} />

        {/* top blob */}
        <Blob position={[0, 2.3, 0]} />

        {/* bottom blob */}
        <Blob position={[0, -2.3, 0]} />
      </Canvas>
    </div>
  );
}
