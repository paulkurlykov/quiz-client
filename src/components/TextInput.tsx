import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface TextInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string,
  errorLabel: string | undefined;
}



function TextInput({ name, label, errorLabel, ...field}: TextInputProps) {

  return (
    <div className="flex flex-col gap-2">
      <label className="text-secondary" htmlFor={name}>{label}</label>
      <input {...field} id={name} className={`max-w-[30rem] border ${errorLabel ? " border-error" : "dark:border-borderAccentLight border-borderAccentDark"} border-solid rounded-mini p-4 text-2xl text-text bg-inputBackgroundWhite  dark:bg-inputBackgroundDark`} />
      <label  className="text-error text-[1.5rem]"  >{errorLabel}</label>
    </div>
  );
}

export default TextInput;
