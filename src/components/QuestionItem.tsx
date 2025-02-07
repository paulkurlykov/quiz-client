import { MdDeleteForever } from "react-icons/md";
import Modal from "./Modal";
import Popup from "./Popup";
import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import useDeleteQuestion from "../hooks/useDeleteQuestion";
import { useQuestions } from "../context/main.context";
import { Question } from "@/types/main.types";
import { toast } from "react-hot-toast";

interface QuestionItemProps {
  question: Question;
  showModalId: string | null;
  setShowModalId: (id: string | null) => void;
}

function QuestionItem({
  question,
  showModalId,
  setShowModalId,
}: QuestionItemProps) {
  const letterLimit = 200;
  const { dispatch } = useQuestions();

  const deleteHandle = async () => {
    setShowModalId(null);
    console.log(question._id);
    await useDeleteQuestion(
      question._id,
      dispatch,
      () => toast.success("Товар успешно удален!"),
      (error) => toast.error(`Не получилось удалить вопрос! ${error.message}`),
    );
  };

  //   console.log(status);

  return (
    <li
      onClick={() => console.log(question._id)}
      className="grid grid-cols-1 gap-4 rounded-middle bg-backgroundLightGray dark:bg-backgroundDarkGray2 py-8 px-8  hover:-translate-y-1 shadow-dark cursor-pointer transition-all dark:text-textLight text-textDark "
    >
      <h1 className="text-secondary border-b border-solid border-gray-500 last:border-b-0 border-l-0 border-r-0 border-t-0">{question.question}</h1>

      <div className="flex flex-col  border-b border-solid border-gray-500 last:border-b-0 border-l-0 border-r-0 border-t-0" >
        {question.textAnswer && (
          <p className="text-tertiary">
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


      <div className="grid grid-cols-[1fr,_auto] justify-center items-end grid-rows-1 justify-between border-b border-solid border-gray-500 last:border-b-0 border-l-0 border-r-0 border-t-0">

        <span className="font-secondary text-quaternary uppercase">{`id: ${question?._id && question?._id}`}</span>

        <MdDeleteForever
          onClick={() => {
            setShowModalId(question._id);
          }}
          className="h-[3rem] w-[3rem] cursor-pointer text-accentDark dark:text-accent hover:text-accentHover"
        />

      </div>
      {showModalId === question._id && (
        <Modal onClick={() => setShowModalId(null)}>
          <Popup
            onClose={() => setShowModalId(null)}
            action={deleteHandle}
            title="Вы точно хотите удалить вопрос?"
            description="Это действие нельзя будет отменить!"
          />
        </Modal>
      )}
    </li>
  );
}

export default QuestionItem;
