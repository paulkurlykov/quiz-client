import AnsweredQuestionsAmountStatus from "../components/AnsweredQuestionsAmountStatus";
import AnswerButton from "../components/AnswerButton";
import { Progress } from "antd";
import { useState, useEffect } from "react";
import QuestionOption from "../components/QuestionOption";
import { useQuestions } from "../context/main.context";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";
import CodeSnippet from "@/components/CodeSnippet";
import MotionPage from "@/components/MotionPage";
import { useNavigate } from "react-router-dom";
import type { ProgressProps } from "antd";
import { useFilterContext } from "@/context/filter.context";
import { topicOptions } from "@/data/helperData";
import IconMaker from "@/components/IconMaker";

function QuizBody() {

  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [progressBarWidth, setProgressBarWidth] = useState<number>(100);

  useEffect(() => {
    const updateProgressBarSize = () => {
      if (window.innerWidth < 640) setProgressBarWidth(75);
      if (window.innerWidth > 641 && window.innerWidth < 1200)
        setProgressBarWidth(100);
      if (window.innerWidth > 1201) setProgressBarWidth(110);
    };

    window.addEventListener("resize", updateProgressBarSize);

    return () => window.removeEventListener('resize', updateProgressBarSize);

  }, []);

  const navigate = useNavigate();

  const {
    questions: rawQuestions,
    currentQuestionIndex,
    rightAnswersNum,
    wrongAnswersNum,
    maxQuestionsNum,
    topic,
    dispatch,
  } = useQuestions();

  const { filteredQuestions } = useFilterContext();

  const questions = filteredQuestions.length ? filteredQuestions : rawQuestions;

  const optionsAnimateVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.75,
      },
    },
  };

  const currentQuestionsAmount = questions.length;
  const currentQuestion = questions[currentQuestionIndex - 1];
  const percent =
    currentQuestionIndex === 1
      ? undefined
      : ((currentQuestionIndex - 1) / currentQuestionsAmount) * 100;

  const makeAnswer = (type: "addRightAnswer" | "addWrongAnswer") => {
    dispatch({ type: `${type}` });
    if (currentQuestionIndex === currentQuestionsAmount) {
      dispatch({ type: "finishQuiz" });
      navigate("/finish");
    } else {
      dispatch({ type: "nextQuestion" });
    }
  };

  const twoColors: ProgressProps["strokeColor"] = {
    "0%": "#ff0000d2",
    "50%": "#f2ff00cc",
    "100%": "#149e59",
  };


  return (
    <MotionPage>
      <div className="bg-backgroundTertiary text-textSecondary transition-colors my-8 flex flex-col rounded-[50px] px-8 py-16 md:my-16 md:px-20 md:py-24">

        {/* QUESTION TOP PANEL */}
        <div className="mb-8 flex items-center justify-between gap-8 md:mb-24">
          {/* WRONG ANSWER COUNTER */}

          <AnsweredQuestionsAmountStatus num={wrongAnswersNum} type="wrong">
            не знаю
          </AnsweredQuestionsAmountStatus>

          {/* PROGRESS BAR */}

          <Progress
            type="circle"
            // steps={100}
            percent={percent}
            // status="active"
            size={progressBarWidth}
            strokeColor="var(--accent-primary)"
            trailColor="#bbbaba"
            format={(percent) => (
              <>
                <span className="text-textDark dark:text-textLightAccent text-4xl md:text-5xl">
                  {percent ? Math.ceil(+percent) + "%" : "0%"}
                </span>
              </>
            )}
          />

          {/* RIGHT ANSWER COUNTER */}

          <AnsweredQuestionsAmountStatus num={rightAnswersNum} type="right">
            знаю
          </AnsweredQuestionsAmountStatus>
        </div>

          {/* TOPIC & QUESTIONS AMOUNT */}

        <div className="mb-2 flex justify-between md:px-8">
          <div className="flex items-center gap-4">
            <IconMaker
              size="3.5rem"
              color={topicOptions.find((option) => option.id === topic)?.color}
              name={topic !== null ? topic : "html"}
            />
            <span className="uppercase text-textPrimary" >{topic}</span>
          </div>
          <span className="font-secondary text-[3rem] font-bold">
            {currentQuestionIndex}/{currentQuestionsAmount}
          </span>
        </div>

        {/* QUESTION BODY */}

        <motion.div
          key={currentQuestion?._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} // состояние, к которому элемент пойдет при удалении из DOM
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-8 rounded-3xl py-4 md:gap-16 md:px-8 md:py-8"
        >
          {/* TITLE */}

          <div className="bg-backgroundQuaternary rounded-middle border-gray-50 px-12 py-12 text-primary font-bold md:text-5xl">
            <p className="text-inherit" >{currentQuestion?.question}</p>
          </div>

          {/* OPTIONS */}

          {currentQuestion?.answerType === "options" && (
            <motion.div
              variants={optionsAnimateVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2 md:gap-8"
            >
              {currentQuestion.options.map((option, i) => {
                return (
                  <QuestionOption
                    key={i + 1}
                    num={i + 1}
                    text={option}
                    rightAnswer={Number(currentQuestion.rightAnswer)}
                  />
                );
              })}
            </motion.div>
          )}

          {/* SHORTCUT for text answer and codesnippet */}

          {currentQuestion?.answerType === "text" && (
            <div className="flex flex-col gap-4">
              {/* shortcut panel */}
              <div
                onClick={() => setShowAnswer((st) => !st)}
                className="bg-backgroundQuaternary mt-2 rounded-secondary border-gray-50 p-8 text-secondary font-bold md:p-12 md:text-primary"
              >
                <div className="hover:text-accentDark flex cursor-pointer items-center gap-2 dark:hover:text-accent">
                  <IoIosArrowForward
                    className={` ${showAnswer ? "rotate-90" : ""} h-[5rem] w-[5rem] transition-all`}
                  />
                  <p className="cursor-pointer transition-all">{`${showAnswer ? "Убрать ответ" : "Показать ответ"}`}</p>
                </div>
              </div>

              {/* text answer */}

              <motion.div
                initial={{ height: 0 }}
                animate={showAnswer ? { height: "auto" } : { height: 0 }}
                // exit={{ height: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-4 overflow-hidden"
              >
                <div className="bg-accentLight mt-2 rounded-secondary border border-gray-50 px-12 py-12 text-tertiary ">
                  <p className="whitespace-pre-wrap">
                    {`${currentQuestion?.textAnswer}`}
                  </p>
                </div>

                {/* code snippet */}

                {currentQuestion.codeSnippet && (
                  <div className="bg-accentLight mt-2 rounded-secondary border border-gray-50 px-12 py-12">
                    {<CodeSnippet>{currentQuestion?.codeSnippet}</CodeSnippet>}
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* BUTTONS */}

        {currentQuestion?.answerType === "text" && (
          <div className="mt-8 flex justify-between gap-2 md:gap-8">
            <AnswerButton
              onClick={() => {
                makeAnswer("addWrongAnswer");
                setShowAnswer(false);
              }}
              type="wrong"
            >
              Не знаю ответ
            </AnswerButton>
            <AnswerButton
              onClick={() => {
                makeAnswer("addRightAnswer");
                setShowAnswer(false);
              }}
              type="right"
            >
              Знаю ответ!
            </AnswerButton>
          </div>
        )}

      </div>
    </MotionPage>
  );
}

export default QuizBody;
