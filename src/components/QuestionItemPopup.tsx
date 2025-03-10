import { IoClose } from "react-icons/io5";
import Button from "./Button";
import Title from "./Title";
import { useQuestions } from "@/context/main.context";
import { Question } from "@/types/main.types";
import { SetStateAction } from "react";
import { Dispatch } from "react";
import CodeSnippet from "./CodeSnippet";

interface QuestionItemPopup {
  id: Question["_id"] | null;
  onClose: () => void;
  action?: () => void;
}

function QuestionItemPopup({ id, onClose, action }: QuestionItemPopup) {
  const { questions } = useQuestions();

  const question = questions.find((q) => q._id === id);

  if (!question) return null;

  return (
    <div className="mt-32 flex w-3/4 h-[75vh] overflow-y-auto flex-col gap-4 rounded-secondary bg-backgroundPrimary px-16 pb-12 pt-8 text-textPrimary">
      <IoClose
        onClick={onClose}
        className="mb-4 h-12 w-12 cursor-pointer self-end transition hover:scale-125 hover:text-accent"
      />
      <Title className="mb-24" tag="h1">
        {question.question}
      </Title>

      {question.options.length ? (
        <div className="flex flex-col gap-4" >
          {question.options.map((opt, i) => (
            <span key={i} className={`${Number(question.rightAnswer) === i+1 ? "text-sky-700 font-bold" : ""}`} >Вариант {i+1}: {opt}</span>
          ))}
        </div>
      ) : (
        <p className="text-tertiary whitespace-pre-line">{question.textAnswer}</p>
      )}

      {question.codeSnippet && (
        <div className="text-3xl dark:bg-inputBackground mt-2 rounded-secondary border border-gray-50 bg-accentLight px-12 py-12">
          {<CodeSnippet>{question?.codeSnippet}</CodeSnippet>}
        </div>
      )}
    </div>
  );
}

export default QuestionItemPopup;
