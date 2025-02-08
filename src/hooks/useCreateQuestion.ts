import { createQuestion } from "../api/questionApi";
import { CompletedFormData, MyFormData } from "@/types/main.types";
import {Dispatch} from 'react';
import { ActionType } from "@/context/context.types";

async function useCreateQuestion(question: CompletedFormData, dispatch: Dispatch<ActionType>) {

    try {
      dispatch({ type: "setLoading" });
      const data = await createQuestion(question);
      if(!data) throw new Error('there is no data')
      console.log(data);
      dispatch({ type: "questionUploaded", payload: data });
    } catch (err) {
      if(err instanceof Error) {
        console.error("Exception " + err.message);
        dispatch({ type: "setError", payload: err.message });
      } else {
        console.error("Exception " + err);
      }

    }

}

export default useCreateQuestion

