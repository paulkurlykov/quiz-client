import { Level } from "@/types/main.types";

export enum TopicColor {
  Html = "#ce5050",
  Css = "#3b82f6",
  Js = "#fcd34d",
  React = "#22d3ee",
}

export interface TopicOption {
  id: Level;
  label: "";
  color?: TopicColor;
}

export interface TypeQuestionOption {
  id: "options" | "text";
  label: "У меня буду варианты ответа" | "Ответ будет просто текстом";
}

export interface rightAnswerOption {
    id: "1" | "2" | "3" | "4";
    label: ""
  }

  interface LightDifficultLevel {
    level: "light";
    emoji: "😌";
    questionsNum: "7";
  }
  
  interface NormalDifficultLevel {
    level: "normal";
    emoji: "👌";
    questionsNum: "50";
  }
  
  interface HardDifficultLevel {
    level: "hard";
    emoji: "😓";
    questionsNum: "75";
  }
  
  interface UltimateDifficultLevel {
    level: "ultimate";
    emoji: "👹";
    questionsNum: "100";
  }
  
  export type DifficultOption  = LightDifficultLevel | NormalDifficultLevel | HardDifficultLevel | UltimateDifficultLevel
