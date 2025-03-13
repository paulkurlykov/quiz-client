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
    <>
      <Title className="mb-24" tag="h1">
        {question.question}
      </Title>

      {question.options.length ? (
        <div className="flex flex-col gap-4">
          {question.options.map((opt, i) => (
            <span
              key={i}
              className={`${Number(question.rightAnswer) === i + 1 ? "font-bold text-sky-700" : ""}`}
            >
              Вариант {i + 1}: {opt}
            </span>
          ))}
        </div>
      ) : (
        <p className="whitespace-pre-line text-tertiary">
          {question.textAnswer}
        </p>
      )}

      {question.codeSnippet && (
        <div className="text-3xl dark:bg-inputBackground mt-2 rounded-secondary border border-gray-50 bg-accentLight px-12 py-12">
          {<CodeSnippet>{question?.codeSnippet}</CodeSnippet>}
        </div>
      )}
    </>
  );
}

export default QuestionItemPopup;
