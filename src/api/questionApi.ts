import { Question, MyFormData, CompletedFormData } from "@/types/main.types";

export const baseUrl = import.meta.env.VITE_BASE_URL;

export const getQuestions = async () => {
  try {
    const res = await fetch(`api/question`);
    if (!res.ok) throw new Error("could not fetch data");
    const data = await res.json();
    if (data.length !== 0) return data;
    if (data.length === 0) throw new Error(`Questions Array has zero items`)
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


const obj = {
  // someProperty: "someValue",
  // anotherProperty: "anotherValue"
}

const values = Object.values(obj);
console.log(!!values.length); // ['someValue', 'anotherValue']


