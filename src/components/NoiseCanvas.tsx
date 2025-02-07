import { useEffect, useRef } from "react";

export default function NoiseCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // canvas.width = window.innerHeight;
    // canvas.height = window.innerHeight;

    const generateNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const buffer = new Uint32Array(imageData.data.buffer);

      for (let i = 0; i < buffer.length; i++) {
        buffer[i] =
          (255 << 24) |
          (Math.random() * 255 << 16) |
          (Math.random() * 255 << 8) |
          Math.random() * 255;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    generateNoise();
    const interval = setInterval(generateNoise, 100); // Анимация шума

    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className=" fixed top-0 left-0  w-full h-full pointer-events-none z-50 opacity-[.02]"
    />
  );
}