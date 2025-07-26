import {
  TopicOption,
  TopicColor,
  TypeQuestionOption,
  rightAnswerOption,
  DifficultOption,

} from "./helperData.types";

export const topicOptions: TopicOption[] = [
  { id: "html", label: "", color: TopicColor.Html },
  { id: "css", label: "", color: TopicColor.Css },
  { id: "js", label: "", color: TopicColor.Js },
  { id: "react", label: "", color: TopicColor.React },
  {id: "vue", label: "", color: TopicColor.Vue}
];

export const baseTopicsCount: number = topicOptions.map(opt => opt.id).length;



// export const topicOptions: TopicOption[] = [
//   { id: "html", label: "", color: "#ce5050" },
//   { id: "css", label: "", color: "#3b82f6" },
//   { id: "js", label: "", color: "#fcd34d" },
//   { id: "react", label: "", color: "#22d3ee" },
// ];

export const typeQuestionOptions: TypeQuestionOption[] = [
  { id: "options", label: "У меня буду варианты ответа" },
  { id: "text", label: "Ответ будет просто текстом" },
];

export const answerOptions = [
  { id: "option1", label: "Вариант 1" },
  { id: "option2", label: "Вариант 2" },
  { id: "option3", label: "Вариант 3" },
  { id: "option4", label: "Вариант 4" },
];

export const rightAswerOptions: rightAnswerOption[] = [
  { id: "1", label: "" },
  { id: "2", label: "" },
  { id: "3", label: "" },
  { id: "4", label: "" },
];

export const difficultOptions: DifficultOption[]  = [
  { level: "light", emoji: "😌", questionsNum: "7" },
  { level: "normal", emoji: "👌", questionsNum: "50" },
  { level: "hard", emoji: "😓", questionsNum: "75" },
  { level: "ultimate", emoji: "👹", questionsNum: "100" },
];


  

