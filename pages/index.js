import React, { useRef, useEffect } from "react";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Slippers } from "../components/Models/Slippers";

gsap.registerPlugin(ScrollTrigger);

const SlippersAnimated = () => {
  const slippersRef = useRef();

  useEffect(() => {
    if (slippersRef.current) {
      const element = slippersRef.current;

      ScrollTrigger.create({
        trigger: "#scroll-container", // Trigger element
        start: "top top", // Start when the top of the trigger element hits the top of the viewport
        end: "bottom bottom", // End when the bottom of the trigger element hits the bottom of the viewport
        scrub: true,
        markers: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(element.rotation, {
            x: progress * 2 * Math.PI,
            y: progress * 2 * Math.PI,
          });
          gsap.to(element.position, {
            x: progress * 3,
            y: progress * 2,
          });
        },
      });
    }
  }, []);

  return <Slippers ref={slippersRef} position={[0, 0.1, 0]} />;
};

const Index = () => {
  return (
    <div id="scroll-container" className="h-[200vh]"> {/* Increase height to enable scrolling */}
      <Canvas
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <color attach="background" args={["#eee"]} />
        <Environment preset="studio" />
        <PerspectiveCamera makeDefault position={[0, 0, 3.1]} />
        {/* <OrbitControls /> */}
        <SlippersAnimated />
        <ContactShadows />
      </Canvas>
    </div>
  );
};

export default Index;
