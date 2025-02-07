import { ImCross } from "react-icons/im";
import { FaCheck,FaArrowUp,FaArrowRight, FaArrowLeft } from "react-icons/fa";
import {ReactNode} from "react"

interface StylesOptions {
  wrong: string;
  right: string;
  pick: string;
  back: string;
}

interface AnswerButtonProps {
  children: ReactNode;
  type: keyof StylesOptions;
  onClick?: () => void;
}

function AnswerButton({ children, type, onClick }: AnswerButtonProps) {

  const styleOptions = {
    wrong: "hover:border-wrongAnswer",
    right: "hover:border-rightAnswer",
    pick: "hover:border-accent ml-auto",
    back: "ml-auto"
  }

  const baseStyle = `group rounded-mini border-1 border-solid border-borderGreyDark dar:borderGreyLight px-2 py-8 flex items-center gap-4 md:gap-6 w-[18rem] md:w-[20rem] justify-center cursor-pointer ${styleOptions[type]} transition duration-300  active:translate-y-1`;

  const iconStyle = "transition group-hover:scale-110 text-[2rem] md:text-[3rem]"
  
  const iconRenderOptions = {
    wrong: (
      <ImCross
      className={`${iconStyle} text-wrongAnswer`}
      />
      ),
      right: (<FaCheck className={`${iconStyle} text-rightAnswer`}  />),
      answer: (<FaArrowRight className={`${iconStyle} text-accent`}  />),
      pick: (<FaArrowUp className={`${iconStyle} text-accent`}  />),
      back: (<FaArrowLeft className={`${iconStyle} text-accent`}  />)
    }
    

  
  return (
    <div onClick={onClick} className={`${baseStyle}`}>
      {iconRenderOptions[type]}
      <span className=" text-tertiary md:text-secondary font-bold whitespace-nowrap">{children}</span>
    </div>
  );
}

export default AnswerButton;


