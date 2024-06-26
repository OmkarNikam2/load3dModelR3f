import React, { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";

export const Slippers = forwardRef((props, ref) => {
  const { scene } = useGLTF("/gas.glb");
  
  return <primitive ref={ref} object={scene} {...props} />;
});

useGLTF.preload("/gas.glb");
