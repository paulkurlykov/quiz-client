import { motion } from "framer-motion";
import {DetailedHTMLProps, HTMLAttributes, ReactNode, ChangeEvent} from 'react';
import { Level } from "@/types/main.types";
import { TopicOption, TypeQuestionOption, rightAnswerOption } from "@/data/helperData.types";


interface RadioInputProps {
  children?: ReactNode;
  checked: boolean;
  id: TypeQuestionOption['id'] | rightAnswerOption['id'] | TopicOption['id'];
  value: string;
  label: TypeQuestionOption['label'] | rightAnswerOption['label'] | TopicOption['label'];
  hidden?: boolean | null;
  addStyles: string;
  handle?: ((event: string) => void) | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function RadioInput({ children, checked, id, value, onChange, hidden, addStyles, label, handle = null, ...props }: RadioInputProps) {
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
            {handle && handle(e.target.value)};
          }}
        />
        {children}
        <label htmlFor={id}>{label}</label>
      </label>
    </li>
  );
}

export default RadioInput;
