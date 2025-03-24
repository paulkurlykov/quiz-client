import { Question } from "@/types/main.types";
import { Level } from "@/types/main.types";
import { useEffect } from "react";

function useQuestionManageFilter(
  questions: Question[],
  filteredTopics: Level[],
) {
  let filteredQuestions: Question[] = [];

  filteredTopics.map((topic) => {
    filteredQuestions = filteredQuestions.concat(
      questions.filter((q) => {
        return q.topic === topic;
      }),
    );
  });

  return filteredQuestions;
}

export default useQuestionManageFilter;
