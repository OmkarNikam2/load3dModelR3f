import React, { useRef, useEffect, useState } from "react";
import {
  ContactShadows,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Slippers } from "../components/Models/Slippers";

gsap.registerPlugin(ScrollTrigger);

const interpolateColor = (color1, color2, factor) => {
  const result = color1.slice();
  for (let i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (color2[i] - result[i]));
  }
  return result;
};

const hexToRgb = (hex) => {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = "0x" + hex[1] + hex[1];
    g = "0x" + hex[2] + hex[2];
    b = "0x" + hex[3] + hex[3];
  } else if (hex.length === 7) {
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
  }
  return [parseInt(r), parseInt(g), parseInt(b)];
};

const rgbToHex = (rgb) => {
  return "#" + rgb.map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
};

const SlippersAnimated = () => {
  const slippersRef = useRef();
  const [color, setColor] = useState("#A09C9A");

  useEffect(() => {
    if (slippersRef.current) {
      const element = slippersRef.current;

      // Initial color of the can
      const initialColor = "#e3e0de";

      const colors = [
        hexToRgb(initialColor),
        hexToRgb("#D52B1E"),
        hexToRgb("#01A19B"),
        hexToRgb("#137BBF")
      ];

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#scroll-container",
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
          markers: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const totalColors = colors.length;
            const colorIndex = Math.min(
              Math.floor(progress * (totalColors - 1)),
              totalColors - 2
            );
            const colorProgress = (progress * (totalColors - 1)) % 1;
            const newColor = rgbToHex(interpolateColor(colors[colorIndex], colors[colorIndex + 1], colorProgress));
            setColor(newColor);
          },
        },
      });

      // Define the animation sequence with position and rotation
      timeline
        .to(element.rotation, { x: 0.25 * Math.PI, y: 10, duration: 2 }) // Initial rotation
        .fromTo(element.position, { x: 0, y: 0 }, { x: 0.8, y: 0, duration: 2 }) // Move from center to right
        .to(element.rotation, { y: 5, duration: 1 }, "-=1") // Rotate while moving
        .fromTo(element.position, { x: 0.75, y: 0 }, { x: -0.75, y: 0.3, duration: 2 }) // Move from right to left
        .to(element.rotation, { y: -5, duration: 1 }, "-=1") // Rotate while moving
        .fromTo(element.position, { x: -0.75 }, { x: 0, duration: 2 }) // Move to center and up
        .to(element.rotation, { x: 0.25 * Math.PI, y: 0, duration: 1 }); // Tilt

    }
  }, []);

  return <Slippers ref={slippersRef} color={color} position={[0, 0, 0]} />;
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
        <PerspectiveCamera makeDefault position={[0, 0, 2.8]} />
        {/* <OrbitControls /> */}
        <SlippersAnimated />
        <ContactShadows />
      </Canvas>
    </div>
  );
};

export default Index;
