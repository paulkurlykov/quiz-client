import Title from "@/components/Title";
import Button from "@/components/Button";
import { useQuestions } from "@/context/main.context";
import MotionPage from "@/components/MotionPage";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { PersonalRecord } from "@/context/context.types";
import { useNavigate, useNavigation } from "react-router-dom";
import Confetti from "react-dom-confetti";
import { useState, useEffect } from "react";
import confettiConfig from "@/helpers/confettiConfig";

function FinalPage() {
  const [activeConfetti, setActiveConfetti] = useState<boolean>(false);
  const formatPercent = (num: number): string => {
    const decimedNumber = num * 100;
    return decimedNumber.toFixed(1) + "%";
  };

  const navigate = useNavigate();

  const {
    maxQuestionsNum,
    successRatio,
    rightAnswersNum,
    personalRecord,
    dispatch,
  } = useQuestions();

  const { storedValue, setValue } = useLocalStorage<
    PersonalRecord,
    keyof PersonalRecord
  >("record", personalRecord);

  if (!storedValue || storedValue.successRatio < successRatio) {
    setValue({ successRatio, date: new Date() });
  }

  useEffect(() => {
    setActiveConfetti(true);
    setTimeout(() => setActiveConfetti(false), 500);
  }, []);

  // записать данные, если локал сторедж нет,или если оно меньше, чем результат

  return (
    <MotionPage>
      <Confetti active={activeConfetti} config={confettiConfig} />
      <div className="dark:bg-backgroundDarkGray my-16 flex flex-col items-center justify-center gap-8 rounded-2xl bg-backgroundLight p-6 md:p-32 text-textDark dark:text-textLightAccent">
        <div className="flex items-center justify-center text-[10rem] md:text-[20rem]">
          <span>🏆</span>
        </div>
        <Title tag="h1">Congratulations!!!</Title>
        <div className="text-[1.6rem]">
          <div>
            <span>
              Ты ответил на {rightAnswersNum} вопросов из {maxQuestionsNum}!
            </span>{" "}
            <span>Это {formatPercent(successRatio)} от всего числа.</span>
          </div>

          <Confetti active={activeConfetti} config={confettiConfig} />

          {!storedValue || storedValue.successRatio < successRatio ? (
            <div>
              <span>
                Ты поставил новый рекорд! - {formatPercent(successRatio)}
              </span>{" "}
              <span>
                {" "}
                Предыдущий был поставлен{" "}
                {personalRecord.date.toLocaleDateString()}
              </span>
            </div>
          ) : (
            <div>
              <span>
                Твой текущий рекорд - {formatPercent(storedValue.successRatio)}
              </span>{" "}
              <span> от {personalRecord.date.toLocaleDateString()}</span>
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => {
              dispatch({ type: "clear" });
              navigate("/quiz");
            }}
            type="primary"
            size="md"
          >
            Попробовать снова
          </Button>
          <Button
            onClick={() => {
              dispatch({ type: "clear" });
              navigate("/");
            }}
            type="primary"
            size="md"
          >
            На главную страницу
          </Button>
        </div>
      </div>
      <Confetti active={activeConfetti} config={confettiConfig} />
    </MotionPage>
  );
}

export default FinalPage;
