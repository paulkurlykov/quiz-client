import { Question } from "@/types/main.types";
import {Dispatch} from 'react';
import { ActionType } from "@/context/context.types";
import { getQuestion } from "../api/questionApi";


async function useGetQuestion(dispatch: Dispatch<ActionType>, id: Question['_id']){

    // console.log('inside hook useGetQuestion');

    try {
      dispatch({ type: "setLoading" });
      const question = await getQuestion(id);
      // console.log(question);
      dispatch({type: "questionLoaded", payload: question})
    } catch (err) {
      if(err instanceof Error) {
        console.error("Exception " + err.message);
        dispatch({ type: "setError", payload: err.message });
      } else {
        console.error(`There is an unknown error. Check your error-component ${err}`);
      }

    }

}

export default useGetQuestion; 