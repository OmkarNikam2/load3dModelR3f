import React, { forwardRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

export const Slippers = forwardRef((props, ref) => {
  const { scene } = useGLTF("/gas.glb");

  useEffect(() => {
    if (scene && props.color) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(props.color);
        }
      });
    }
  }, [scene, props.color]);

  return <primitive ref={ref} object={scene} {...props} />;
});

useGLTF.preload("/gas.glb");
