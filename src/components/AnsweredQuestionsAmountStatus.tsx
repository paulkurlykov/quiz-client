import {ReactNode} from "react";


function AnsweredQuestionsAmountStatus({children, type, num}: {children: ReactNode, type: "wrong" | "right", num: number}) {
    const baseStyle = `rounded-mini border-2 leading-6 h-[8rem] border-solid px-4 py-2 flex flex-col items-center justify-center gap-6 w-[8rem]`;
    const rightAnswer = "border-rightAnswer";
    const wrongAnswer = "border-wrongAnswer";
    return (
        <div className={`${baseStyle} ${type === "wrong" ? wrongAnswer : rightAnswer}`}>
          <span className={`text-[3.5rem]  font-bold ${type === "wrong" ? "text-wrongAnswer" : "text-rightAnswer"}`} >{num}</span>
          <span className="font-bold text-quaternary self-center ">{children}</span>
        </div>
    )
}

export default AnsweredQuestionsAmountStatus
