import { Question } from "@/types/main.types";
import { FilteredTopics, QuestionType } from "@/context/context.types";

function useFilter(
  rawQuestions: Question[],
  filterTopics: FilteredTopics,
  answerType: QuestionType | null,
  maxQuestionsAmount: number | null = null,
): Question[] | [] {
  let result: Question[] = [];

    /// filter by topics
  if (filterTopics.length < 4) {
    filterTopics.map((topic) => {
      result = result.concat(
        rawQuestions.filter((question) => question.topic === topic),
      );
    });
  } else {
    result = rawQuestions;
  }

 /// filter by answer type
  if (answerType) {
    result = result.filter((question) => question.answerType === answerType);
  }

  /// filter by maxQuestionNum (after diff level picking)
  if(maxQuestionsAmount && maxQuestionsAmount < result.length) {
    return result.slice(
        0,
        maxQuestionsAmount,
      );
  }

  return result;

}

export default useFilter;
