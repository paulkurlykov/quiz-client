export type Level = "js" | "react" | "css" | "html";

// export interface Question {
//     _id: string;
//     question: string;
//     label: Level;
//     answerType: "options" | "text";
//     options: string[] | [];
//     textAnswer: string;
//     codeSnippet: string;
//   }

  interface BaseQuestion {
    _id: string;
    question: string;
    topic: Level;
  }

  interface OptionQuestion extends BaseQuestion {
    answerType: "options",
    options: string[],
    rightAnswer: "1" | "2" | "3" | "4";
    textAnswer: "";
    codeSnippet: "";
  }

  interface TextQuestion extends BaseQuestion {
    answerType: "text",
    options: [];
    rightAnswer: "";
    textAnswer: string;
    codeSnippet: string;
  }

  export type Question = OptionQuestion | TextQuestion

  export type QuestionRawFormData = Omit<Question, "_id">

export type CompletedFormData = Omit<Question, "_id">;

  export interface MyFormData {
    question: string;
    topic: Level;
    answerType: "options" | "text";
    textAnswer: string;
    rightAnswer: "1" | "2" | "3" | "4" | "";
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    codeSnippet: string;
  }