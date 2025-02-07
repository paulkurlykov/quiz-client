import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useMemo } from "react";

export default function AnimatedBackground({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative flex justify-center h-screen w-full bg-transparent">
      {/* Полупрозрачный матовый слой */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl"></div>

      {/* Анимированные пятна */}
      {/* <Blob color="bg-purple-500" delay={0} />
      <Blob color="bg-blue-500" delay={1} />
      <Blob color="bg-pink-500" delay={3} />
      <Blob color="bg-green-500" delay={2} />
      <Blob color="bg-sky-500" delay={4} />
      <Blob color="bg-yellow-500" delay={2} /> */}

      {/* Контент */}
      <div className="absolute z-9999" >{children}</div>
    </div>
  );
}

/* Компонент для анимированных пятен */
function Blob({ color, delay }: { color: string; delay: number }) {

    const randomPath = useMemo(() => ({
        x: [
          `${Math.random() * 160 - 40}vw`, // от -40vw до 120vw (заходит за границы)
          `${Math.random() * 160 - 40}vw`,
          `${Math.random() * 160 - 40}vw`,
        ],
        y: [
          `${Math.random() * 120 - 10}vh`, // от -10vh до 110vh (заходит за границы)
          `${Math.random() * 120 - 10}vh`,
          `${Math.random() * 120 - 10}vh`,
        ],
        scale: [1, Math.random() * 1.5 + 0.5, 1],
        opacity: [0.2, Math.random() * 0.5 + 0.2, 0.3],
      }), []);

  return (
    <motion.div
    className={`absolute w-96 h-96 ${color} rounded-full filter blur-3xl opacity-30`}
    initial={{ x: "50vw", y: "50vh", scale: 1 }}
    animate={randomPath}
    transition={{
      duration: Math.random() * 10 + 5, // От 5 до 15 сек
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
      delay
    }}
  />
  );
}
