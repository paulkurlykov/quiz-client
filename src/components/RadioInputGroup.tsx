import IconMaker from "./IconMaker";
import { useState } from "react";
import { Controller } from "react-hook-form";
import RadioInput from "./RadioInput";
import { cloneElement } from "react";
import { TopicOption, TypeQuestionOption } from "@/data/helperData.types";
import { Control } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { Level, MyFormData } from "@/types/main.types";
import { topicOptions } from "@/data/helperData";

interface RadioInputGroupBaseProps {
  control: Control<MyFormData>;
  hidden: boolean | null;
  addStyles: string;
  handle: ((event: string) => void) | null;
}

interface TopicOptionsProps extends RadioInputGroupBaseProps {
  name: "topic";
  options: TopicOption[];
  render: ({
    option,
    value,
  }: {
    option: TopicOption;
    value: string;
  }) => JSX.Element;
}

interface TypeQuestionProps extends RadioInputGroupBaseProps {
  name: "answerType";
  options: TypeQuestionOption[];
  render: null;
}

type RadioInputGroupProps = TopicOptionsProps | TypeQuestionProps;

function isTopicOption(
  option: TopicOption | TypeQuestionOption,
): option is TopicOption {
  return (
    (option as TopicOption).color !== undefined ||
    typeof (option as TopicOption).id === "string"
  );
}

function RadioInputGroup({
  control,
  name,
  options,
  hidden,
  addStyles,
  render,
  handle,
}: RadioInputGroupProps) {
  return (
    <>
      <ul
        className={`flex ${addStyles} items-start justify-between md:justify-start px-4 md:px-8 gap-2 md:gap-12`}
      >
        {options.map((option) => (
          <Controller
            key={option.id}
            name={name}
            control={control}
            defaultValue={options[0]?.id}
            render={({ field: { onChange, value } }) => (
              <RadioInput
                checked={value === option.id}
                id={option.id}
                hidden={hidden}
                value={option.id}
                onChange={onChange}
                label={option.label}
                addStyles={addStyles}
                handle={handle}
              >
                {name === "topic" &&
                  render &&
                  isTopicOption(option) &&
                  render({ option, value })}
                {name === "answerType" && ""}
              </RadioInput>
            )}
          />
        ))}
      </ul>
    </>
  );
}

export default RadioInputGroup;
