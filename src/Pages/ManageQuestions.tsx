import { useQuestions } from "../context/main.context";
import QuestionRow from "../components/QuestionItem";
import Title from "../components/Title";
import { useState } from "react";
import Spinner from "../components/Spinner";
import MotionPage from "@/components/MotionPage";
import SearchBar from "@/components/SearchBar";
import { Question } from "@/types/main.types";

function ManageQuestions(): JSX.Element | null {
  const [showModalId, setShowModalId] = useState<string | null>(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [query, setQuery] = useState<string>("")

  const { questions: rawQuestions, status } = useQuestions();

  if (!rawQuestions) {
    return null;
  }


  const questions = rawQuestions.filter((q) => {

    for (const key of Object.keys(q) as (keyof Question)[]) {
      if (String(q[key]).includes(query)) return q;
    }
  } )

  return (
    <MotionPage>
      <div className="pt-24 px-8 flex flex-col gap-16">

        <Title tag="h1" className="mb-8 text-textDark dark:text-textLight ">
          Управление вопросами
        </Title>
        <div className="h-[5rem] w-5[rem] bg-colorTest" ></div>

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
                  showModalId={showModalId}
                  setShowModalId={setShowModalId}
                />
              );
            })}
          </ul>
        )}
      </div>
    </MotionPage>
  );
}

export default ManageQuestions;
