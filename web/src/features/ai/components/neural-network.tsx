"use client";

import { useEffect, useRef, useState } from "react";
import {
  createNodes,
  updatePositions,
  getEdges,
  drawFrame,
  type Node,
} from "../lib/neural-network-engine";

const DESKTOP_NODE_COUNT = 45;
const MOBILE_NODE_COUNT = 22;
const EDGE_THRESHOLD = 150;

function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none)").matches;
}

export function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current || !containerRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setSupported(false);
      return;
    }

    const container = containerRef.current;
    const mobile = isMobile();
    const nodeCount = mobile ? MOBILE_NODE_COUNT : DESKTOP_NODE_COUNT;

    function resize() {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      nodesRef.current = createNodes(nodeCount, canvas.width, canvas.height);
    }

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function handleMouseLeave() {
      mouseRef.current = null;
    }

    if (!mobile) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }

    let lastTime = performance.now();

    function animate(now: number) {
      const deltaTime = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      updatePositions(
        nodesRef.current,
        mouseRef.current,
        deltaTime,
        !mobile
      );

      const edges = getEdges(nodesRef.current, EDGE_THRESHOLD);
      if (ctx) {
        drawFrame(ctx, nodesRef.current, edges, canvas.width, canvas.height);
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    function handleVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
      } else {
        lastTime = performance.now();
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      if (!mobile) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  if (!supported) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
