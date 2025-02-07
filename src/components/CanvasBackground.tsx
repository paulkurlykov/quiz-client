import { useEffect, useRef } from "react";
import createREGL from "regl";

const CanvasBackground = () => {
  const canvasRef = useRef(null);
  let canvasUrl;

  useEffect(() => {
    if (!canvasRef.current) return;
    const regl = createREGL({ canvas: canvasRef.current });

    

    const drawColors = regl({
      vert: `
        precision highp float;
        attribute vec2 position;
        varying vec2 v_position;
        void main() {
          gl_Position = vec4(position, 0, 1);
          v_position = (position + 1.0) * 0.5;
        }
      `,
      frag: `
        precision highp float;
        uniform float u_time;
        uniform vec3 u_rotXOffset;
        uniform vec3 u_rotYOffset;
        uniform float u_g1FreqMult;
        varying vec2 v_position;
        const float TAU = 6.2831853072;
        void main() {
          vec3 xRot = u_rotXOffset * v_position.x;
          vec3 yRot = u_rotYOffset * v_position.y;
          vec3 r = vec3(
            cos((xRot[0] + yRot[0] * u_rotXOffset[2] * 2.0 + u_time / 8000.0) * TAU),
            cos((xRot[2] + yRot[2] * u_rotXOffset[2] + u_time / 8000.0) * TAU),
            sin((v_position.x * 0.4 - u_time / 16000.0) * TAU)
          );
          vec3 g = vec3(
            -cos(((xRot[0] + yRot[0]) * (u_g1FreqMult + 2.0) + u_time / 4000.0) * TAU),
            -cos((xRot[1] + yRot[1] * 0.8 - u_time / 4400.0) * TAU),
            sin((v_position.x * 0.5 + u_time / 20000.0) * TAU)
          );
          vec3 b = vec3(
            -cos((v_position.x * u_rotXOffset[0] * 1.65 - u_time / 2000.0) * TAU),
            -cos((v_position.x * 0.8 + u_time / 4000.0) * TAU),
            sin((v_position.y * 0.4 + u_time / 24000.0 + 0.75) * TAU)
          );
          r = (r + 1.0) / 2.0;
          g = (g + 1.0) / 2.0;
          b = (b + 1.0) / 2.0;
          gl_FragColor = vec4(
            (r[0] * 0.6 + r[1]) / 1.6 * (r[2] * 0.5 + 0.5),
            (g[0] * 0.6 + g[1]) / 1.6 * (g[2] * 0.5 + 0.5),
            (b[0] * 0.6 + b[1]) / 1.6 * (b[2] * 0.5 + 0.5),
            1
          );
        }
      `,
      attributes: {
        position: regl.buffer([
          [-1, 1],
          [1, 1],
          [-1, -1],
          [1, -1],
          [-1, -1],
          [1, 1],
        ]),
      },
      uniforms: {
        u_time: regl.prop("u_time" as never),
        u_rotXOffset: regl.prop("u_rotXOffset" as never),
        u_rotYOffset: regl.prop("u_rotYOffset" as never),
        u_g1FreqMult: regl.prop("u_g1FreqMult" as never),
      },
      count: 6,
    });

    const timeOffset = Math.random() * 60000;

    const frameLoop = regl.frame(({ time }) => {
      const trueTime = time * 1000 + timeOffset;
      const angle1 = (trueTime / 120000) * Math.PI * 2;
      const angle2 = angle1 + 0.5;
      const angle3 = angle1 + Math.PI / 2;
      const rotXOffset1 = Math.sin(angle1);
      const rotXOffset2 = Math.sin(angle2);
      const rotXOffset3 = Math.sin(angle3);
      const rotYOffset1 = Math.cos(angle1);
      const rotYOffset2 = Math.cos(angle2);
      const rotYOffset3 = Math.cos(angle3);
      const g1FreqMult = Math.sin((trueTime / 24000) * Math.PI * 2);

      drawColors({
        u_time: trueTime,
        u_rotXOffset: [rotXOffset1, rotXOffset2, rotXOffset3],
        u_rotYOffset: [rotYOffset1, rotYOffset2, rotYOffset3],
        u_g1FreqMult: g1FreqMult,
      });
    });

    return () => {
      frameLoop.cancel();
      regl.destroy();
    };
  }, []);

  return (

    <div className="absolute left-0 top-0 -z-10 h-full w-full">
      {/* Сам canvas */}
      <canvas ref={canvasRef} className=" brightness-50 h-full w-full" />

      {/* Полупрозрачный слой с точками */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.3)_1px,transparent_2px)] bg-[size:6px_6px]" />
    </div>
  );
};

export default CanvasBackground;
