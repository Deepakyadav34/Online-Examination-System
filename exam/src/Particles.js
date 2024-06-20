import { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function Particle() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    const initParticles = async () => {
      console.log("Initializing particles...");
      await loadFull(window.tsParticles); // Make sure tsParticles is accessible from the window object
      setInit(true);
    };
    initParticles();
  }, []);

  const particlesLoaded = (container) => {
    console.log("Particles loaded.");
  };

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          style={{
            zIndex: 3,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          options={{
            fpsLimit: 60,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "connect",
                  parallax: { enable: true, force: 60, smooth: 10 }
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                connect: {
                  radius: 80,
                  distance: 100,
                  lineLinked: {
                    opacity: 0.5,
                  },
                },
              },
            },
            particles: {
              color: {
                value: ["#008000", "#ff0000", "#0000ff"],
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                speed: 3,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 200,
              },
              opacity: {
                value: { min: 0.1, max: 0.5 },
                animation: {
                  enable: true,
                  speed: 1,
                  minimumValue: 0.1,
                },
              },
              shape: {
                type: ["circle", "triangle", "star"],
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </>
  );
}
