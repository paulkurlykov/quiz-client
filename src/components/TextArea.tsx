import { DetailedHTMLProps, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface TextAreaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>{
  errorLabel: string | undefined

}

function TextArea({ errorLabel, ...props }: TextAreaProps) {
  return (
    <div>
      <textarea
        {...props}
        className={`bg-inputBackgroundPrimary text-tertiary h-52 w-full rounded-mini border ${errorLabel ? " border-error" : "border-borderPrimary"} border-solid p-4`}
      />
      <label className="text-error text-[1.5rem]" >{errorLabel}</label>
    </div>
  );
}

export default TextArea;
