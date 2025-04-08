import Button from "../components/Button";
import DifficultLevelList from "../components/DifficultLevelList";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { difficultOptions } from "../data/helperData";
import { useQuestions } from "../context/main.context";
import { motion } from "framer-motion";
import MotionPage from "@/components/MotionPage";
import Title from "@/components/Title";
import { topicOptions } from "../data/helperData";
import IconMaker from "@/components/IconMaker";
import { useFilterContext } from "@/context/filter.context";
import TopicFilterUI from "@/components/TopicFilterUI";
import QuestionTypeFilterUI from "@/components/QuestionTypeFilterUI";
import useFilter from "@/hooks/useFilter";
import ShortCut from "@/components/ShortCut";

function Homepage() {
  const [isLevelsOpen, setIsLevelsOpen] = useState(false);
  const { questions, curDifficultLevel, maxQuestionsNum, dispatch } =
    useQuestions();

  const {
    filteredTopics,
    filteredQuestions,
    answerType,
    dispatch: filterDispatch,
  } = useFilterContext();

  const navigate = useNavigate();

  const onShowLevelsHandler = () => {
    setIsLevelsOpen((st) => !st);
  };

  useEffect(() => {
    dispatch({
      type: "setCurrentDifficultLevel",
      payload: { level: null, num: null },
    });
  }, []);

  useEffect(() => {
    
    filterDispatch({
      type: "SET_FILTER_QUESTIONS",
      payload: useFilter(questions, filteredTopics, answerType, maxQuestionsNum),
    });

  }, [answerType, filteredTopics, questions, maxQuestionsNum]);

  // console.log(filteredQuestions.length);

  return (
    <MotionPage>
      <div className="HOMEPAGE bg-animated-border grid grid-cols-1 bg-backgroundPrimary grid-rows-[auto_auto_8rem_auto_auto] justify-center gap-32 px-8 pt-32 md:px-24 md:pt-64 pb-32">

        {/* TITLE  */}

        <h1 className="animated-bg-text hyphens-auto break-words leading-[initial] md:leading-[inherit] animated-bg-dots relative text-[12rem] font-extrabold uppercase">
          The frontend quiz{" "}
          <span className="text-[8rem] font-extrabold text-[initial]">
            🚀🚀🚀
          </span>
        </h1>

        <Title
          className="relative z-10 rounded-3xl p-8"
          tag="h2"
        >
          Легкий квиз по основам frontend. Выбери тематику, и количество вопросов!
        </Title>

        


        {!curDifficultLevel && !isLevelsOpen ? (
          <Button
          addClass="self-center justify-self-center"
          type="primary"
          size="xl"
          onClick={onShowLevelsHandler}
          >
            начать
          </Button>


) : (
  

  <div className="flex h-[8.3rem] items-center justify-center">
            <motion.span
              key={curDifficultLevel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              >
              {!curDifficultLevel
                ? "Выберите сложность"
                : "Выбранная сложность: " + curDifficultLevel.toUpperCase()}
            </motion.span>
          </div>
        )}

        {
          isLevelsOpen && <div className="bg-backgroundSecondary pt-24 pb-16 rounded-[3rem]" >
            {isLevelsOpen &&  <div className="flex w-full items-center">
              <DifficultLevelList
                addStyles={isLevelsOpen ? "opacity-100" : "opacity-0"}
                options={difficultOptions}
                />
            </div>}

            {isLevelsOpen && curDifficultLevel && (
              <ShortCut title="опции" >
              <div className={`flex flex-col items-center justify-center gap-2 ${isLevelsOpen ? "opacity-100" : "opacity-0"} `}>
                <Title
                  className=""
                  tag="h3"
                  >
                  Выберите категории
                </Title>
  
                <TopicFilterUI
                  filteredTopics={filteredTopics}
                  data={topicOptions}
                  />
              </div>
  
              <div className={`flex flex-col items-center justify-center gap-2 ${isLevelsOpen ? "opacity-100" : "opacity-0"} `}>
                <Title
                  className="text-textDark dark:text-textLightAccent"
                  tag="h3"
                  >
                  Выберите тип вопросов
                </Title>
  
                <QuestionTypeFilterUI />
                <div className="mt-8 uppercase" >

                <Title tag="h3" >Всего вопросов: <span>{filteredQuestions.length}</span> </Title>
                </div>
              </div>
  
  
              </ShortCut>

            )}

           
          </div>
        }

        {curDifficultLevel && (
          <Button
          addClass="self-center justify-self-center"
          type="primary"
          size="xl"
          onClick={() => {
            dispatch({ type: "clear" });
            dispatch({ type: "start" });
            navigate("/quiz");
            setIsLevelsOpen(false);
          }}
          >
            погнали!
          </Button>
        )}
      </div>
    </MotionPage>
  );
}

export default Homepage;
   
