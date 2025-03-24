import { updateQuestion } from "../api/questionApi";
import { CompletedFormData, Question, QuestionFields } from "@/types/main.types";
import {Dispatch} from 'react';
import { ActionType } from "@/context/context.types";

async function useUpdateQuestion(id: Question['_id'] , question: CompletedFormData, dispatch: Dispatch<ActionType>) {

    try {
      dispatch({ type: "setLoading" });
      const updatedQuestion = await updateQuestion(id, question);
      if(!updatedQuestion) throw new Error('there is no data')
      console.log(updatedQuestion);
      dispatch({ type: "questionUpdated", payload: updatedQuestion });
    } catch (err) {
      if(err instanceof Error) {
        console.error("Exception " + err.message);
        dispatch({ type: "setError", payload: err.message });
      } else {
        console.error("Exception " + err);
      }

    }

}

export default useUpdateQuestion