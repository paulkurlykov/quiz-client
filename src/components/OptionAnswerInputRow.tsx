import { ReactNode } from "react";
function OptionAnswerInputRow({children}: {children: ReactNode}) {
    return (
        <div className="flex gap-8 items-center">
            {children}
        </div>
    )
}

export default OptionAnswerInputRow
