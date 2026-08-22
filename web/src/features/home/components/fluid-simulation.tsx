"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    initFluidSimulation: (canvas: HTMLCanvasElement, bgColor: { r: number; g: number; b: number }) => void;
    setFluidBackground: (r: number, g: number, b: number) => void;
  }
}

export function FluidSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const section = canvas.closest("section");
    if (!section) return;

    const resize = () => {
      canvas.width = section.clientWidth;
      canvas.height = section.clientHeight;
    };
    resize();

    const isLight = document.documentElement.classList.contains("light");
    const bgColor = isLight
      ? { r: 255, g: 255, b: 255 }
      : { r: 0, g: 0, b: 0 };

    const script = document.createElement("script");
    script.src = "/fluid-simulation.js";
    script.onload = () => {
      try {
        window.initFluidSimulation(canvas, bgColor);
      } catch (e) {
        console.error("Fluid simulation error:", e);
      }
    };
    script.onerror = () => console.error("Failed to load fluid-simulation.js");
    document.body.appendChild(script);

    const observer = new MutationObserver(() => {
      const light = document.documentElement.classList.contains("light");
      if (window.setFluidBackground) {
        if (light) {
          window.setFluidBackground(255, 255, 255);
        } else {
          window.setFluidBackground(0, 0, 0);
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="fluid"
      className="absolute inset-0 h-full w-full"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
