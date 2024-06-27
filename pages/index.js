import React, { useRef, useEffect, useState } from "react";
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
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    if (slippersRef.current) {
      const element = slippersRef.current;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#scroll-container",
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
          // pinSpacing: false,
          markers: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const newColor = `rgb(${Math.floor(255 * progress)}, 0, ${Math.floor(255 * (1 - progress))})`;
            setColor(newColor);
          },
        },
      });

      timeline
        .to(element.rotation, { x: 0, y: 10, duration: 2 }) // Initial rotation
        .fromTo(element.position, { x: 0 }, { x: 1, duration: 2 }) // Move from center to right
        .to(element.rotation, { y: 5, duration: 1 }, "-=1") // Rotate while moving
        .fromTo(element.position, { x: 1 }, { x: -1, duration: 2 }) // Move from right to left
        .to(element.rotation, { y: -5, duration: 1 }, "-=1") // Rotate while moving
        .fromTo(element.position, { x: -1, y: 0 }, { x: 0, y: 0.5, duration: 2 }) // Move to center and up
        .to(element.rotation, { x: 0.5 * Math.PI, y: 0, duration: 1 }); // Tilt

    }
  }, []);

  return <Slippers ref={slippersRef} color={color} position={[0, 0.1, 0]} />;
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
