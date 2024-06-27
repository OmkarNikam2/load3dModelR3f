import React, { forwardRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

export const Slippers = forwardRef(({ color, ...props }, ref) => {
  const { scene } = useGLTF("/gas_silver.glb");

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(color);
        }
      });
    }
  }, [color, scene]);

  return <primitive ref={ref} object={scene} {...props} />;
});

useGLTF.preload("/gas_silver.glb");
