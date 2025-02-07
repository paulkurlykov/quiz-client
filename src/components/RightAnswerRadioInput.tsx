import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import Motion from "./Motion";

interface RightAnswerRadioInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  rightAnswer: string;
}

function RightAnswerRadioInput({ value, onChange, rightAnswer }: RightAnswerRadioInputProps) {
  const num = Number(value);
  return (
    <>
      <input
        checked={+rightAnswer == num}
        value={value}
        onChange={onChange}
        type="radio"
        name="right-answer"
        className={`h-10 w-10 transition-all duration-300 ${+rightAnswer === num ? "accent-radioInput" : "accent-gray-950"}`}
      />
      {+rightAnswer === num && <label>Правильный ответ</label>}
    </>
  );
}

export default RightAnswerRadioInput;
