import { useContext, createContext, Dispatch, ReactNode } from "react";
import { useEffect, useReducer } from "react";
import { ActionType, IinitialState, IMainContext } from "./context.types";
import useGetQuestions from "@/hooks/useGetQuestions";
import { useState } from "react";


const MainContext = createContext<IMainContext | undefined>(undefined);

const initState: IinitialState = {
  questions: [],
  question: null,
  status: "good",
  message: null,
  topic: null,
  curDifficultLevel: null,
  currentQuestionIndex: 1,
  rightAnswersNum: 0,
  wrongAnswersNum: 0,
  maxQuestionsNum: null,
  successRatio: 0,
  currentTimer: 0,
  personalRecord: {
    successRatio: 0,
    date: new Date(),
    timer: 0
  },
  pagination: {
    data: [],
    currentPage: 0,
    itemsPerPage: 0,
    totalCount: 0,
    filteredCount: 0,
    totalPages: 0,
    filteredPages: 0,
  }
};

function reducer(state: IinitialState, action: ActionType): IinitialState {
  switch (action.type) {
    case "questionsLoaded":
      // console.log(action.payload);
      return { ...state, questions: action.payload, status: "good" };
    case "questionLoaded":
      return { ...state, question: action.payload, status: "good" };
    case "setLoading":
      return { ...state, status: "loading", message: null };
    case "setError":
      return { ...state, status: "error", message: action.payload };
    case "questionUploaded":
      // console.log(action.payload);
      return {
        ...state,
        status: "good",
        questions: [...state.questions, action.payload],
      };
    case "questionUpdated":
        return {
          ...state,
          status: "good",
          question: action.payload,
        };
    case "paginatedQuestionsLoaded":
        return {
          ...state,
          status: "good",
          pagination: action.payload,
        };
    case "questionDeleted":
      return {
        ...state,
        status: "good",
        questions: state.questions.filter((q) => q._id !== action.payload),
      };
    case "setLevel":
      return { ...state, topic: action.payload };
    case "setCurrentQuestionIndex":
      return { ...state, currentQuestionIndex: action.payload };
    case "setCurrentDifficultLevel":
      return {
        ...state,
        curDifficultLevel: action.payload.level,
        maxQuestionsNum: action.payload.num,
      };
      case "setMaxQuestionsNum":
        return {
          ...state,
          maxQuestionsNum: action.payload,
        };
    case "addRightAnswer":
      return { ...state, rightAnswersNum: state.rightAnswersNum + 1 };
    case "addWrongAnswer":
      return { ...state, wrongAnswersNum: state.wrongAnswersNum + 1 };
    case "nextQuestion":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        topic: state.questions[state.currentQuestionIndex].topic,
      };
      case "updateTimer":
        return {...state, currentTimer: action.payload}
    case "finishQuiz": {
      const successRatio = state.maxQuestionsNum
        ? state.rightAnswersNum / state.maxQuestionsNum
        : 0;

      return {
        ...state,
        successRatio,
        personalRecord: { successRatio, date: new Date(), timer: state.currentTimer},
      };
    }
    case "clear": {
      return {
        ...state,
        currentQuestionIndex: 1,
        rightAnswersNum: 0,
        wrongAnswersNum: 0,
      };
    }
    case "start": {
      return {
        ...state,
        currentQuestionIndex: 1,
        rightAnswersNum: 0,
        wrongAnswersNum: 0,
        topic: state.questions[state.currentQuestionIndex].topic,
      };
    }
  }
}

function MainProvider({ children }: { children: ReactNode }) {

  const [showSubmitResultModal, setShowSubmitResultModal] = useState(false);

  const [
    {
      status,
      questions,
      question,
      topic,
      message,
      currentQuestionIndex,
      curDifficultLevel,
      rightAnswersNum,
      wrongAnswersNum,
      maxQuestionsNum,
      successRatio,
      personalRecord,
      currentTimer,
      pagination

    },
    dispatch
  ] = useReducer(reducer, initState);

  useEffect(() => {
    useGetQuestions(dispatch);
  }, []);

  return (
    <MainContext.Provider
      value={{
        status,
        questions,
        question,
        topic,
        message,
        curDifficultLevel,
        currentQuestionIndex,
        rightAnswersNum,
        wrongAnswersNum,
        maxQuestionsNum,
        successRatio,
        personalRecord,
        currentTimer,
        dispatch,
        pagination,
        showSubmitResultModal,
        setShowSubmitResultModal
      }}
    >
      {children}
    </MainContext.Provider>
  );
} 

function useQuestions() {
  const context = useContext(MainContext);

  if (!context)
    throw new Error(
      `context is undefined, but should be correct context. Check this out, probably you use this context outside of the current Provider`,
    );

  return context;
}

export { MainProvider, useQuestions };
