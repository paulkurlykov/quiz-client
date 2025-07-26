import { MdDeleteForever } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { Question } from "@/types/main.types";

interface QuestionItemProps {
  question: Question;
  setShowDeletingPopup: (id: Question["_id"] | null) => void;
  setShowItemPopup: (id: Question["_id"] | null) => void;
  setShowEditingPopup: (id: Question["_id"] | null) => void;
}

function QuestionItem({
  question,
  setShowDeletingPopup,
  setShowItemPopup,
  setShowEditingPopup,
}: QuestionItemProps) {
  const letterLimit = 200;

  const iconStyle = `cursor-pointer text-accent hover:text-accentHover`;

  return (
    <li
      onClick={() => {
        setShowItemPopup(question._id);
      }}
      className="grid cursor-pointer grid-cols-1 items-center gap-4 rounded-middle bg-backgroundSecondary px-8 py-8 text-[1rem] text-textDark shadow-dark transition-all hover:-translate-y-1 dark:text-textLight"
    >
      <h1 className=" py-2 border-b border-l-0 border-r-0 border-t-0 border-solid border-gray-500 text-secondary last:border-b-0">
        {question.question}
      </h1>

      <div className="flex flex-col border-b border-l-0 border-r-0 border-t-0 border-solid border-gray-500 last:border-b-0">
        {question.textAnswer && (
          <p className="text-quaternary py-4">
            {question.textAnswer.length > letterLimit
              ? question.textAnswer.slice(0, letterLimit) + "..."
              : question.textAnswer}
          </p>
        )}

        {question.options.length
          ? question.options.map((option, index) => (
              <span key={option} className="text-quaternary">
                Option {index + 1}: {option}
              </span>
            ))
          : ""}
      </div>

      <div className="flex flex-col gap-2" >
        <div className="flex gap-2">
          <span>Topic:</span>
          <span>{question.topic.toUpperCase()}</span>
        </div>

        <div className="grid grid-cols-[1fr,_auto] grid-rows-1 items-end justify-center justify-between border-b border-l-0 border-r-0 border-t-0 border-solid border-gray-500 last:border-b-0">
          {/* ID */}
          <div className="flex h-full w-full items-center">
            <span className="font-secondary text-[1rem] uppercase">{`id: ${question?._id && question?._id}`}</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Editing icon */}
            <FaPencilAlt
              onClick={(e) => {
                e.stopPropagation();
                setShowEditingPopup(question._id);
              }}
              className={`${iconStyle} h-[2rem] w-[2rem]`}
            />

            {/* Delete icon */}
            <MdDeleteForever
              onClick={(e) => {
                e.stopPropagation();
                setShowDeletingPopup(question._id);
              }}
              className={`${iconStyle} h-[2.5rem] w-[2.5rem]`}
            />
          </div>
        </div>
      </div>
    </li>
  );
}

export default QuestionItem;
