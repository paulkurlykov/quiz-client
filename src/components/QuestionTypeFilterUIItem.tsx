import { useState, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import { TypeQuestionOption } from "@/data/helperData.types";
import { QuestionType } from "@/context/context.types";
import { useFilterContext } from "@/context/filter.context";

function QuestionTypeFilterUIItem({
  option
}: {
  option: TypeQuestionOption;
}) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const {answerType, dispatch} = useFilterContext();

  useEffect(() => {
    if (!answerType || answerType !== option.id) {
      setIsActive(false);
    } else {
        setIsActive(true);
    }

  }, [answerType]);

  return (
    <li
      onClick={() => {
        setIsActive((st) => !st);
        dispatch({type: "SET_ANSWER_TYPE", payload: option.id});
      }}
      className={`cursor-pointer ${isActive ? "outline-4 outline-accentHover" : "none"} flex items-center justify-center gap-4 rounded-[15px] p-4 shadow-xl outline transition-all hover:outline-4 hover:outline-accentHover active:translate-y-1`}
    >
      <span className="text-[2rem]" >
        {option.id === "options" ? "c вариантами ответов" : "без вариантов"}
      </span>
    </li>
  );
}

export default QuestionTypeFilterUIItem;
