import { describe, expect, it } from "vitest";
import {
  createNodes,
  updatePositions,
  checkProximity,
  getEdges,
  type Node,
} from "./neural-network-engine";

describe("neural-network-engine", () => {
  describe("createNodes", () => {
    it("creates the requested number of nodes", () => {
      const nodes = createNodes(10, 800, 600);
      expect(nodes).toHaveLength(10);
    });

    it("creates nodes within bounds", () => {
      const nodes = createNodes(50, 800, 600);
      for (const node of nodes) {
        expect(node.x).toBeGreaterThanOrEqual(0);
        expect(node.x).toBeLessThanOrEqual(800);
        expect(node.y).toBeGreaterThanOrEqual(0);
        expect(node.y).toBeLessThanOrEqual(600);
      }
    });

    it("assigns each node a radius", () => {
      const nodes = createNodes(10, 800, 600);
      for (const node of nodes) {
        expect(node.radius).toBeGreaterThan(0);
      }
    });

    it("assigns each node a color", () => {
      const nodes = createNodes(10, 800, 600);
      for (const node of nodes) {
        expect(node.color).toBeTruthy();
      }
    });

    it("initializes velocity to zero", () => {
      const nodes = createNodes(10, 800, 600);
      for (const node of nodes) {
        expect(node.vx).toBe(0);
        expect(node.vy).toBe(0);
      }
    });
  });

  describe("checkProximity", () => {
    it("returns true for nodes within threshold", () => {
      const a: Node = { x: 0, y: 0, vx: 0, vy: 0, radius: 4, color: "#fff" };
      const b: Node = { x: 50, y: 0, vx: 0, vy: 0, radius: 4, color: "#fff" };
      expect(checkProximity(a, b, 100)).toBe(true);
    });

    it("returns false for nodes beyond threshold", () => {
      const a: Node = { x: 0, y: 0, vx: 0, vy: 0, radius: 4, color: "#fff" };
      const b: Node = { x: 200, y: 0, vx: 0, vy: 0, radius: 4, color: "#fff" };
      expect(checkProximity(a, b, 100)).toBe(false);
    });

    it("returns true for nodes at exact threshold", () => {
      const a: Node = { x: 0, y: 0, vx: 0, vy: 0, radius: 4, color: "#fff" };
      const b: Node = { x: 100, y: 0, vx: 0, vy: 0, radius: 4, color: "#fff" };
      expect(checkProximity(a, b, 100)).toBe(true);
    });
  });

  describe("getEdges", () => {
    it("returns edges for nodes within threshold", () => {
      const nodes: Node[] = [
        { x: 0, y: 0, vx: 0, vy: 0, radius: 4, color: "#fff" },
        { x: 50, y: 0, vx: 0, vy: 0, radius: 4, color: "#fff" },
        { x: 200, y: 0, vx: 0, vy: 0, radius: 4, color: "#fff" },
      ];
      const edges = getEdges(nodes, 100);
      expect(edges).toHaveLength(1);
      expect(edges[0]).toEqual([0, 1]);
    });

    it("returns empty array for no proximity", () => {
      const nodes: Node[] = [
        { x: 0, y: 0, vx: 0, vy: 0, radius: 4, color: "#fff" },
        { x: 200, y: 0, vx: 0, vy: 0, radius: 4, color: "#fff" },
      ];
      const edges = getEdges(nodes, 100);
      expect(edges).toHaveLength(0);
    });
  });

  describe("updatePositions", () => {
    it("drifts nodes toward mouse when within radius", () => {
      const nodes: Node[] = [
        { x: 100, y: 100, vx: 0, vy: 0, radius: 4, color: "#fff" },
      ];
      const mouse = { x: 150, y: 100 };
      updatePositions(nodes, mouse, 0.016, true);

      expect(nodes[0].x).toBeGreaterThan(100);
    });

    it("does not drift toward mouse when mouse is null", () => {
      const nodes: Node[] = [
        { x: 100, y: 100, vx: 0, vy: 0, radius: 4, color: "#fff" },
      ];
      const beforeX = nodes[0].x;
      updatePositions(nodes, null, 0.016, true);

      // Node moves due to ambient drift but not toward any mouse target
      // The x position should change (ambient drift) but not dramatically
      expect(Math.abs(nodes[0].x - beforeX)).toBeLessThan(1);
    });

    it("applies ambient drift when mouse interaction is disabled", () => {
      const nodes: Node[] = [
        { x: 100, y: 100, vx: 0, vy: 0, radius: 4, color: "#fff" },
      ];
      updatePositions(nodes, { x: 150, y: 100 }, 0.016, false);

      // Node should still move due to ambient drift
      expect(nodes[0].x).not.toBe(100);
    });
  });
});
