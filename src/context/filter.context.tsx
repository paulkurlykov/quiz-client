import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import {
  FilterContextType,
  FilterInitialState,
  FilterActionsType,
} from "./context.types";
import { topicOptions } from "@/data/helperData";

const initialState = {
  filteredQuestions: [],
  filteredTopics: [...topicOptions.map((option) => option.id)],
  answerType: null,
};

const reducer = (
  state: FilterInitialState,
  action: FilterActionsType,
): FilterInitialState => {
  switch (action.type) {
    case "SET_FILTER_QUESTIONS":
      return { ...state, filteredQuestions: action.payload };
    case "SET_FILTERED_TOPICS":
      return { ...state, filteredTopics: action.payload };
    case "SET_ANSWER_TYPE":
      return { ...state, answerType: action.payload };
  }
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

function FilterContextProvider({ children }: { children: ReactNode }) {
  const [{ filteredQuestions, filteredTopics, answerType }, dispatch] =
    useReducer(reducer, initialState);

  return (
    <FilterContext.Provider
      value={{
        filteredQuestions,
        filteredTopics,
        answerType,
        dispatch,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a MyProvider");
  }
  return context;
};

export { FilterContextProvider, useFilterContext };
