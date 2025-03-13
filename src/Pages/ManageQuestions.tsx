import { useQuestions } from "../context/main.context";
import QuestionRow from "../components/QuestionItem";
import Title from "../components/Title";
import { useState } from "react";
import Spinner from "../components/Spinner";
import MotionPage from "@/components/MotionPage";
import SearchBar from "@/components/SearchBar";
import { Question } from "@/types/main.types";
import Modal from "@/components/Modal";
import DeleteConfirmPopup from "@/components/DeleteConfirmPopup";
import { toast } from "react-hot-toast";
import useDeleteQuestion from "../hooks/useDeleteQuestion";
import QuestionItemPopup from "@/components/QuestionItemPopup";

function ManageQuestions(): JSX.Element | null {
  const [showModalId, setShowModalId] = useState<Question["_id"] | null>(null);
  const [showItemPopup, setShowItemPopup] = useState<Question["_id"] | null>(
    null,
  );

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [query, setQuery] = useState<string>("");

  const { questions: rawQuestions, status } = useQuestions();

  // if (!rawQuestions) {
  //   return null;
  // }

  const questions = rawQuestions.filter((q) => {
    for (const key of Object.keys(q) as (keyof Question)[]) {
      if (String(q[key]).includes(query)) return q;
    }
  });

  const { dispatch } = useQuestions();

  const deleteHandle = async (id: Question["_id"]) => {
    setShowModalId(null);
    await useDeleteQuestion(
      id,
      dispatch,
      () => toast.success("Товар успешно удален!"),
      (error) => toast.error(`Не получилось удалить вопрос! ${error.message}`),
    );
  };

  return (
    <MotionPage>
      <div className="flex flex-col gap-16 px-8 pt-24">

        <div className="mb-8 flex flex-col gap-8" >

        <Title tag="h1" className="text-textPrimary">
          Управление вопросами
        </Title>

        <Title tag="h3" >Всего вопросов: {rawQuestions.length}</Title>
        </div>

        <SearchBar status={status} query={query} setQuery={setQuery} />

        {status === "loading" ? (
          <Spinner />
        ) : (
          <ul className="grid grid-cols-[repeat(auto-fit,_minmax(25rem,_1fr))] gap-8">
            {questions.map((question) => {
              return (
                <QuestionRow
                  key={question._id}
                  question={question}
                  setShowItemPopup={setShowItemPopup}
                  setShowModalId={setShowModalId}
                />
              );
            })}
          </ul>
        )}
        {showModalId && (
          <Modal
          onClose={() => setShowModalId(null)}
          >
            {" "}
            <DeleteConfirmPopup
              onClose={() => setShowModalId(null)}
              action={() => deleteHandle(showModalId)}
              title="Вы точно хотите удалить вопрос?"
              description="Это действие нельзя будет отменить!"
            />{" "}
          </Modal>
        )}

        {showItemPopup && (
          <Modal
          onClose={() => setShowItemPopup(() => null)}
          >
            <QuestionItemPopup
              id={showItemPopup}
              onClose={() => setShowItemPopup(() => null)}
            />
          </Modal>
        )}
      </div>
    </MotionPage>
  );
}

export default ManageQuestions;
