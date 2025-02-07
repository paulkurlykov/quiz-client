import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

interface TitleProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>  {
    children: ReactNode;
    tag: "h1" | "h2" | "h3" | "h4";
}


function Title({ children, tag, className="" }: TitleProps) {
    return (
        <>
            {{
                h1: <h1 className={`text-[3rem] leading-[3.5rem] font-bold ${className}`} >{children}</h1>,
                h2: <h2 className={`text-[2.8rem] leading-[3rem] font-semibold ${className}`} >{children}</h2>,
                h3: <h3 className={`text-[2.5rem] leading-[2.7rem] font-medium ${className}`} >{children}</h3>,
                h4: <h4 className={`text-[2rem] leading-[2.7rem] font-semibold ${className}`} >{children}</h4>,
            }[tag]}
        </>
    );
}

export default Title;