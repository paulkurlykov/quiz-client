import IconMaker from "./IconMaker";
import { DifficultOption } from "@/data/helperData.types";
import { useQuestions } from "@/context/main.context";
import { twMerge } from "tailwind-merge";




interface DifficultLevelItemProps {
  difficultLevel: DifficultOption["level"];
  questionsNum: string;
  emoji: string;
}

function DifficultLevelItem({
  difficultLevel,
  questionsNum,
  emoji,
}: DifficultLevelItemProps) {
  //   const { pickedLevel, setPickedLevel } = props;
  const { questions, curDifficultLevel, dispatch } = useQuestions();

  function clickHandler() {
    dispatch({
      type: "setCurrentDifficultLevel",
      payload: { level: difficultLevel, num: Number(questionsNum) },
    });
  }

  //   console.log(questionsNum);
  return (
    <div
      className={twMerge("box-border flex md:flex-col gap-8 md:gap-3 rounded-mini p-2 transition-all duration-200 border-borderPrimary dark:shadow-dark border-solid p-8 uppercase shadow-main shadow-xl hover:scale-105 hover:border-accent ", curDifficultLevel === difficultLevel ? "border-4 border-accent" : "border-2")}
      onClick={clickHandler}
    >
      <span className="self-center text-[3rem]">{emoji}</span>
      <div className="flex flex-col self-center" >
        <span className="whitespace-nowrap text-secondary font-bold">
          Level: {difficultLevel}
        </span>
        <span className="whitespace-nowrap text-secondary font-bold">
          Questions: {questionsNum}
        </span>
      </div>
    </div>
  );
}

export default DifficultLevelItem;
