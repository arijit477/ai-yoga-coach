import { Environment } from "@react-three/drei";

export function SceneBackground() {
  return (
    <>
      {/* We are overlaying the 3D canvas on top of a 2D HTML element. 
          So we don't necessarily want a solid color background in 3D. 
          We use Environment to give nice reflections and soft ambient lighting 
          to any glass or metallic objects in the scene. */}
      <Environment preset="city" />
      
      {/* Very soft white/light fog for depth */}
      <fog attach="fog" args={["#f8fafc", 5, 20]} />
    </>
  );
}
