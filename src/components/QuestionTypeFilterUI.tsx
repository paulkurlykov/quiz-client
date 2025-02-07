import { useState, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import { QuestionType } from "@/context/context.types";
import { typeQuestionOptions } from "@/data/helperData";
import QuestionTypeFilterUIItem from "./QuestionTypeFilterUIItem";
import { useFilterContext } from "@/context/filter.context";
import useFilter from "@/hooks/useFilter";

function QuestionTypeFilterUI() {

const {answerType, dispatch} = useFilterContext();
  const [isAllTypesChosen, setIsAllTypesChosen] = useState<boolean>(true);


  useEffect(() => {
    if(!answerType) {
        setIsAllTypesChosen(true);
    } else {
        setIsAllTypesChosen(false);
    }
  },[answerType])

  return (
    <ul className="flex flex-wrap md:h-[10rem] w-full justify-start gap-8 py-8 text-textDark dark:text-textLight">
      <li
      onClick={() => {
        setIsAllTypesChosen(true);
        dispatch({type: "SET_ANSWER_TYPE", payload: null});
      }}
        className={` ${isAllTypesChosen ? "outline-4 outline-accentHover" : "none"} flex items-center cursor-pointer justify-center gap-4 rounded-[15px] p-4 shadow-xl outline transition-all hover:outline-4 hover:outline-accentHover active:translate-y-1`}
      >
        <span className="text-[2rem]" >все</span>
      </li>
      {typeQuestionOptions.map((opt) => (
        <QuestionTypeFilterUIItem key={opt.id} option={opt} />
      ))}
    </ul>
  );
}

export default QuestionTypeFilterUI;
