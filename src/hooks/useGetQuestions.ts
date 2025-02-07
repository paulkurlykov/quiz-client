import { Question } from "@/types/main.types";
import {Dispatch} from 'react';
import { ActionType } from "@/context/context.types";

import { getQuestions } from "../api/questionApi";

async function useGetQuestions(dispatch: Dispatch<ActionType>){

    // console.log('inside hook useGetQuestion');

    try {
      dispatch({ type: "setLoading" });
      const questions = await getQuestions();
      dispatch({ type: "questionsLoaded", payload: questions });
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