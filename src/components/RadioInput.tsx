import { motion } from "framer-motion";
import {DetailedHTMLProps, HTMLAttributes, ReactNode, ChangeEvent} from 'react';
import { Level } from "@/types/main.types";
import { TopicOption, TypeQuestionOption, rightAnswerOption } from "@/data/helperData.types";
import { Dispatch, SetStateAction } from "react";


interface RadioInputProps {
  children?: ReactNode;
  checked: boolean;
  id: TypeQuestionOption['id'] | rightAnswerOption['id'] | TopicOption['id'];
  value: TypeQuestionOption['id'] | TopicOption['id'] | rightAnswerOption['id'];
  label: TypeQuestionOption['label'] | rightAnswerOption['label'] | TopicOption['label'];
  hidden?: boolean | null;
  addStyles: string;
  handle?: Dispatch<SetStateAction<"options" | "text">> | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function RadioInput({ children, checked, id, value, onChange, hidden, addStyles, label, handle = null, ...props }: RadioInputProps) {

console.log("value in RadioInput: ", value);

  return (
    <li className={`list-none ${addStyles} flex items-center`} >
      <label
        htmlFor={id}
        className={`inline-flex text-[1.6rem] md:text-[2rem] w-full h-full cursor-pointer items-center justify-start gap-6 rounded-lg border hover:text-gray-600`}
      >
        <input
          checked={checked}
          type="radio"
          id={id}
          className={` ${hidden && "peer hidden"} w-[3rem] aspect-square cursor-pointer rounded-md p-4  md:text-2xl text-xl accent-inputBackgroundDark`}
          value={value}
          onChange={(e) => {
            onChange(e);
            {handle && handle(e.target.value as "options" | "text")};
          }}
        />
        {children}
        <label htmlFor={id}>{label}</label>
      </label>
    </li>
  );
}

export default RadioInput;
