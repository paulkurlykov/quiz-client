import {ReactNode} from "react";

interface FormSectionProps {
    children: ReactNode;
    title?: string
}


function FormSection({children, title}: FormSectionProps) {
    return (
        <div className="border-[3px] py-16 px-12 md:py-24 md:px-20 shadow-xl rounded-primary bg-backgroundSecondary text-textDarkAccent dark:text-textLightAccent dark:shadow-dark">
            <h1 className=" text-3xl md:text-4xl font-semibold mb-8" >{title}</h1>
            {children}
        </div>
    )
}

export default FormSection
