const BRAND_COLORS = [
  "#118ab2", // blue
  "#06d6a0", // green
  "#ffd166", // yellow
  "#ef476f", // pink
  "#8338ec", // purple
];

export interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export function createNodes(count: number, width: number, height: number): Node[] {
  const padding = 40;
  return Array.from({ length: count }, () => ({
    x: padding + Math.random() * (width - padding * 2),
    y: padding + Math.random() * (height - padding * 2),
    vx: 0,
    vy: 0,
    radius: 2 + Math.random() * 3,
    color: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)],
  }));
}

export function checkProximity(a: Node, b: Node, threshold: number): boolean {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy) <= threshold;
}

export function getEdges(nodes: Node[], threshold: number): [number, number][] {
  const edges: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (checkProximity(nodes[i], nodes[j], threshold)) {
        edges.push([i, j]);
      }
    }
  }
  return edges;
}

export function updatePositions(
  nodes: Node[],
  mousePos: { x: number; y: number } | null,
  deltaTime: number,
  mouseInteractionEnabled: boolean
): void {
  const driftStrength = 0.5;
  const mouseRadius = 200;
  const mouseForce = 0.8;
  const ambientSpeed = 0.3;

  for (const node of nodes) {
    // Ambient sine-wave drift
    const time = Date.now() * 0.001;
    node.vx += Math.sin(time + node.x * 0.01) * ambientSpeed * deltaTime * 10;
    node.vy += Math.cos(time + node.y * 0.01) * ambientSpeed * deltaTime * 10;

    // Mouse interaction
    if (mouseInteractionEnabled && mousePos) {
      const dx = mousePos.x - node.x;
      const dy = mousePos.y - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouseRadius && dist > 0) {
        const force = (1 - dist / mouseRadius) * mouseForce;
        node.vx += (dx / dist) * force * deltaTime * 60;
        node.vy += (dy / dist) * force * deltaTime * 60;
      }
    }

    // Apply velocity with damping
    node.x += node.vx;
    node.y += node.vy;
    node.vx *= 0.95;
    node.vy *= 0.95;

    // Gentle drift back toward center if too far
    const centerX = 400;
    const centerY = 300;
    node.vx += (centerX - node.x) * 0.0001 * driftStrength;
    node.vy += (centerY - node.y) * 0.0001 * driftStrength;
  }
}

export function drawFrame(
  ctx: CanvasRenderingContext2D,
  nodes: Node[],
  edges: [number, number][],
  width: number,
  height: number
): void {
  ctx.clearRect(0, 0, width, height);

  // Draw edges
  for (const [i, j] of edges) {
    const a = nodes[i];
    const b = nodes[j];
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 150;
    const opacity = Math.max(0, 1 - dist / maxDist) * 0.3;

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  // Draw nodes
  for (const node of nodes) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fillStyle = node.color;
    ctx.fill();
  }
}
