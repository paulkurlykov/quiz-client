import { Question, QuestionFields, CompletedFormData } from "@/types/main.types";
import { useSearchParams } from "react-router-dom";


export const baseUrl = import.meta.env.VITE_BASE_URL;

export const getQuestions = async (params: URLSearchParams | null = null) => {
  try {
    const queryString = params ? params.toString() : "";
    const res = await fetch(`api/question${queryString ? `?${queryString}` : ""}`);

    if (!res.ok) throw new Error("could not fetch data");


    const data = await res.json();
    // console.log(data);
    if (data.length !== 0) return data;
    if (data.length === 0) throw new Error(`Questions Array has zero items`)
  } catch (err) {
    console.error("Exception " + err);
  }
};

export const getQuestion = async (id: Question['_id']) => {
  try {
    const res = await fetch(`api/question/${id}`);
    if (!res.ok) throw new Error("could not fetch data");
    const data = await res.json();
    if (data._id) return data;
    if (!data._id) throw new Error(`There is no question with this ID`)
  } catch (err) {
    console.error("Exception " + err);
  }
};

export async function createQuestion(question: CompletedFormData) {
  try {

    const res = await fetch(`api/question`, {
      method: "POST",
      body: JSON.stringify(question),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("could not send data via createQuestion");

    const data = await res.json();

    return data;
  } catch (err) {
    console.error("Exception " + err);
  }
}

export async function deleteQuestion(id: Question['_id']) {
  try {
    const res = await fetch(`api/question/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`couldn't delete question`);
  } catch (err) {
    console.error("Exception " + err);
  }
}

export const updateQuestion = async (id: Question['_id'], updatedQuestion: CompletedFormData) => {
  try {
    const res = await fetch(`api/question/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedQuestion),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("could not fetch data");
    const data = await res.json();
    if (data._id) return data;
    if (!data._id) throw new Error(`There is no question with this ID`)
  } catch (err) {
    console.error("Exception " + err);
  }
};



