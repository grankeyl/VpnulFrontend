// @ts-ignore
import confetti from "canvas-confetti";

let canvas: HTMLCanvasElement | null = null;
let shoot: any = null;

function getCanvas() {
  if (canvas) return canvas;

  canvas = document.createElement("canvas");
  canvas.id = "confetti-canvas";

  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100vw",
    height: "100vh",
    pointerEvents: "none",
    zIndex: "9999999"
  });

  document.body.appendChild(canvas);

  shoot = confetti.create(canvas, {
    resize: true,
    useWorker: true
  });

  return canvas;
}

// базовые настройки
const baseDefaults = {
  ticks: 160,
  gravity: 0.6,
  decay: 0.94,
  startVelocity: 25,
  colors: ["#22B5FF", "#2188d8", "#48a0e4", "#2996e9", "#C42DFF", "#C42DFF"],
};

export function shootConfetti() {
  getCanvas();

  const sides = [
    { x: 0.3, angle: 70 },
    { x: 0.5, angle: 90 },
    { x: 0.7, angle: 110 }
  ];

  sides.forEach(side => {
    // несколько партий частиц с разными размерами и скоростью
    shoot({
      ...baseDefaults,
      particleCount: 4,
      shapes: ["star", "circle", "square"],
      origin: { x: side.x, y: 1 },
      angle: side.angle,
      scalar: Math.random() * 0.6 + 0.7 // рандом размер частицы
    });

    shoot({
      ...baseDefaults,
      particleCount: 5,
      shapes: ["circle", "square"],
      origin: { x: side.x + (Math.random() * 0.1 - 0.05), y: 1 },
      angle: side.angle + (Math.random() * 10 - 5),
      scalar: Math.random() * 0.5 + 0.5
    });
  });

  // дополнительный "шлейф" из маленьких частиц
  shoot({
    ...baseDefaults,
    particleCount: 8,
    shapes: ["circle"],
    origin: { x: Math.random() * 0.8 + 0.1, y: 1 },
    angle: 90,
    scalar: 0.4,
    ticks: 200,
    gravity: 0.5
  });
}