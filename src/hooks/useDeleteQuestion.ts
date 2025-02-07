import { Question } from "@/types/main.types";
import {Dispatch} from 'react';
import { ActionType } from "@/context/context.types";

import { deleteQuestion } from "../api/questionApi";

async function useDeleteQuestion( id: Question['_id'], 
dispatch: Dispatch<ActionType>, 
onSuccess?: () => void, 
onError?: (error: Error) => void){

    console.log('inside hook useDeleteQuestion');

    try {
      console.log(id);
      dispatch({ type: "setLoading" });
      await deleteQuestion(id);
      dispatch({ type: "questionDeleted", payload: id });
      onSuccess?.(); // Вызываем колбэк успеха, если он передан
    } catch (err) {
      if(err instanceof Error) {
        console.error("Exception " + err.message);
        dispatch({ type: "setError", payload: err.message });
        onError?.(err); // Вызываем колбэк ошибки, если он передан
      } else {
        console.error(`There is an unknown error. Check your error-component ${err}`);
      }

    }

}

export default useDeleteQuestion