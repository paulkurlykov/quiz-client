import { Dispatch } from "react";
import { Question, Level, MyFormData } from "@/types/main.types";
import { DifficultOption } from "@/data/helperData.types";
import { SetStateAction } from "react";
import { TopicOption } from "@/data/helperData.types";


export type ActionType =
  | { type: "questionsLoaded"; payload: Question[] }
  | { type: "setLoading" }
  | { type: "setError"; payload: string }
  | { type: "questionUploaded"; payload: Question }
  | { type: "questionDeleted"; payload: Question["_id"] }
  | { type: "setLevel"; payload: Level }
  | { type: "setCurrentQuestionIndex"; payload: number }
  | {
      type: "setCurrentDifficultLevel";
      payload: { level: DifficultOption["level"] | null; num: number | null };
    }
  | { type: "addRightAnswer" }
  | { type: "addWrongAnswer" }
  | { type: "nextQuestion" }
  | { type: "finishQuiz" }
  | { type: "clear" }
  | { type: "start" }
  | { type: "setMaxQuestionsNum", payload: number };

export interface PersonalRecord {
  successRatio: number;
  date: Date;
}

export interface IinitialState {
  questions: Question[] | [];
  status: "good" | "loading" | "error";
  message: string | null;
  topic: Level | null;
  curDifficultLevel: DifficultOption["level"] | null;
  currentQuestionIndex: number;
  rightAnswersNum: number;
  wrongAnswersNum: number;
  maxQuestionsNum: number | null;
  successRatio: number;
  personalRecord: PersonalRecord;
}

export interface IMainContext extends IinitialState {
  dispatch: Dispatch<ActionType>;
}


export type QuestionType = "both" | "text" | "options";

export interface FilteredContextInitialState {
  filteredTopics: Level[];
  questionType: QuestionType;
}

export type FilteredTopics = Level[];

// export type FilterContextType = {
//   filteredTopics: FilteredTopics;
//   setFilteredTopics: Dispatch<SetStateAction<FilteredTopics>>;
//   questionType: QuestionType | null;
//   setQuestionType: Dispatch<SetStateAction<QuestionType | null>>;
// };

export type FilterActionsType = 
  {type: "SET_FILTER_QUESTIONS", payload: Question[]} |
  {type: "SET_FILTERED_TOPICS", payload: FilteredTopics} |
  {type: "SET_ANSWER_TYPE", payload: QuestionType | null}

export interface FilterInitialState {
  filteredQuestions: Question[],
  filteredTopics: FilteredTopics,
  answerType: QuestionType | null
}

export interface FilterContextType extends FilterInitialState {
  dispatch: Dispatch<FilterActionsType>;
  };

