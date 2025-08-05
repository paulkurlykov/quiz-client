import { Question } from "@/types/main.types";
import {Dispatch} from 'react';
import { ActionType } from "@/context/context.types";
import { getQuestions } from "../api/questionApi";


async function useGetQuestions(dispatch: Dispatch<ActionType>, params: URLSearchParams | null = null){
    try {
      dispatch({ type: "setLoading" });
      if(!params) {
        console.log('no params exist!');
        const questions = await getQuestions();
        console.log(questions);
        dispatch({ type: "questionsLoaded", payload: questions });
      } 
      
      if(params) {
        console.log('params exist');
        for (const [key, value] of params) {
          console.log(`${key}, ${value}`);
        }
        const data = await getQuestions(params);
        console.log(data);
        dispatch({ type: "paginatedQuestionsLoaded", payload: data });
      }

    } catch (err) {
      if(err instanceof Error) {
        console.error("Exception " + err.message);
        dispatch({ type: "setError", payload: err.message });
      } else {
        console.error(`There is an unknown error. Check your error-component ${err}`);
      }

    }

}

export default useGetQuestions;