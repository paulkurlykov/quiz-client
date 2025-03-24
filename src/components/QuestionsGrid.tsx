import { Question } from "@/types/main.types";
import QuestionItem from "./QuestionItem";
import { Dispatch, SetStateAction } from "react";
import QuestionSkeleton from "@/components/QuestionSkeleton";
import { FetchingStatusType } from "@/context/context.types";

type Props = {
    questions: Question[];
    setShowItemPopup: Dispatch<SetStateAction<string | null>>;
    setShowDeletingPopup: Dispatch<SetStateAction<string | null>>;
    setShowEditingPopup: Dispatch<SetStateAction<string | null>>;
    status: FetchingStatusType;
}


function QuestionsGrid({questions, setShowItemPopup, setShowDeletingPopup, setShowEditingPopup,status}: Props) {

    return (
        <ul className="grid grid-cols-[repeat(auto-fit,_minmax(25rem,_1fr))] gap-8">

        {status === "loading" && Array(24).fill(0).map((item, index) => <QuestionSkeleton key={index} />)}
          
        {questions.map((question) => {
          return (
            <QuestionItem
              key={question._id}
              question={question}
              setShowItemPopup={setShowItemPopup}
              setShowDeletingPopup={setShowDeletingPopup}
              setShowEditingPopup={setShowEditingPopup}
            />
          );
        })}
      </ul>
    )
}

export default QuestionsGrid
