import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface TextInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string,
  errorLabel: string | undefined;
}



function TextInput({ name, label, errorLabel, ...field}: TextInputProps) {

  return (
    <div className="flex md:w-1/2 md:max-w-[35rem] flex-col gap-2">
      <label className="text-secondary" htmlFor={name}>{label}</label>
      <input {...field} id={name} className={`w-full border ${errorLabel ? " border-error" : "border-borderPrimary"} border-solid rounded-mini p-4 text-tertiary bg-inputBackgroundPrimary`} />
      <label  className="text-error text-[1.5rem]"  >{errorLabel}</label>
    </div>
  );
}

export default TextInput;
