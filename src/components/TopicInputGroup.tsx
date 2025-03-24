import IconMaker from "./IconMaker";
import { topicOptions } from "@/data/helperData";
import RadioInputGroup from "./RadioInputGroup";
import RadioInput from "./RadioInput";
import { Controller, Control } from "react-hook-form";
import { Level, QuestionFields } from "@/types/main.types";
function TopicInputGroup({control, addStyles = "", defaultValue}: {control: Control<QuestionFields>, addStyles?: string, defaultValue?: Level}) {

  return (
    <ul
    className={`flex items-start justify-between md:justify-start px-8 gap-2 md:gap-12`}
  >
    {topicOptions.map((option) => (
      <Controller
        key={option.id}
        name="topic"
        control={control}
        defaultValue={defaultValue ? defaultValue : topicOptions[0]?.id}
        render={({ field: { onChange, value } }) => (
          <RadioInput
            checked={value === option.id}
            id={option.id}
            value={option.id}
            label={option.label}
            addStyles={addStyles}
            onChange={onChange}
            hidden
          >
            <div className="flex flex-col items-center gap-4" >
                    <IconMaker
                      name={option.id}
                      color={value !== option.id ? "#545f60" : option.color}
                      className=" w-[4rem] h-[4rem] md:h-[6rem] md:w-[6rem] hover:scale-105 transition-all"
                    />
                    <span className="text-2xl font-semibold peer-checked:text-sky-300 peer-hover:text-accentBright">
                      {option.id.toUpperCase()}
                    </span>
                  </div>
          </RadioInput>
        )}
      />
    ))}
  </ul>
  );
}

export default TopicInputGroup;
