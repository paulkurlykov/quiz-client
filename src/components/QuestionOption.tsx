import { motion } from "framer-motion";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useAnimationControls } from "framer-motion";
import { useQuestions } from "@/context/main.context";
import { baseUrl } from "@/api/questionApi";
import { Question } from "@/types/main.types";

interface QuestionOptionProps {
  num: number;
  text: string;
  rightAnswer: number;
}

function QuestionOption({
  num,
  text,
  rightAnswer
}: QuestionOptionProps) {
  const { dispatch } = useQuestions();
  const controls = useAnimationControls();

  const animationOptions = {
    right: {
      border: `2px solid var(--rightAnswer)`,
      scale: [1, 1.05, 1.1],
      transition: { duration: .6, ease: [0.455, 0.03, 0.515, 0.555] },
    },
    wrong: {
      border: `2px solid var(--wrongAnswer)`,
      x: [0, -80, 80, -80, 80, 0],
      transition: { duration: 0.4, ease: [0.455, 0.03, 0.515, 0.955] },
    },
    exit: {
      border: "1px solid white",
      transition: { ease: "easeInOut" },
    },
  };


  return (
    <>
      <motion.div
        onClick={async () => {
          await controls.start(`${rightAnswer === num ? "right" : "wrong"}`);
          rightAnswer !== num && (await controls.start("exit"));
          if (rightAnswer === num) {
            dispatch({ type: "addRightAnswer" });
          } else {
            dispatch({ type: "addWrongAnswer" });
          }
          dispatch({type: "nextQuestion"});
        }}
        animate={controls}
        variants={animationOptions}
        initial={false}
        exit="exit"
        className={`group flex cursor-pointer select-none items-center justify-center rounded-middle border-solid border-darkAccent border-opacity-0 bg-accentLight dark:bg-inputBackgroundDark pr-4 transition hover:border-accentDark hover:border-2 dark:hover:border-accent active:translate-y-2`}
      >
        <span className="text-bold basis-1/4 self-center text-center text-[6rem] md:text-[8rem] italic leading-none group-hover:text-accentDark dark:group-hover:text-accent">
          {num}
        </span>
        <div className="flex-1 text-start text-tertiary md:text-secondary">
          <p>{text}</p>
        </div>
      </motion.div>
    </>
  );
}

export default QuestionOption;




