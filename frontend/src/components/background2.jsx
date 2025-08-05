import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "#0f172a",
          },
        },
        fpsLimit: 60,
        interactivity: {
          detectsOn: "canvas",
          events: {
            resize: true,
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          move: {
            direction: "top",
            enable: true,
            outModes: {
              default: "out",
            },
            speed: 0.5,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 25,
          },
          opacity: {
            value: 0.3,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;
