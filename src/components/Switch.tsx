import { ComponentProps, forwardRef } from "react";
import { MdNightlight, MdSunny } from "react-icons/md";

interface SwitchProps extends ComponentProps<"input"> {
    addStyles?: string
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  function ({addStyles = "", ...props}, ref) {
    return (
      <label className={`cursor-pointer ${addStyles} `}>
        <input type="checkbox" className="hidden" ref={ref} {...props} />
        <div
          className={`w-[6rem] h-[3.8rem] flex items-center rounded-full ${props.checked ? "bg-blue-200" : "bg-gray-200"}`}
        >
          <div
            className={`w-fit rounded-full p-4 text-white shadow-sm transition-all duration-300 ${
              props.checked
                ? "translate-x-10 rotate-0 bg-blue-500"
                : " -translate-x-2 -rotate-180 bg-gray-400"
            }`}
          >
            {props.checked ? <MdNightlight className="text-[2.5rem]" /> : <MdSunny  className="text-[2.5rem]" />}
          </div>
        </div>
      </label>
    );
  },
);

export default Switch;
