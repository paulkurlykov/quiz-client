import { ElementRef, ReactNode, useEffect, useRef } from "react";



function useOutsideClick(handler: () => void, ref: React.RefObject<HTMLElement>) {
    
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {

            if (!ref.current) return null;

            if (ref.current && !ref.current.contains(e.target as Node)) {
                handler();
            }
        };

        document.addEventListener("click", handleClick, true);
        return () => document.removeEventListener("click", handleClick, true);

    }, [handler]);

    return ref;
}

export default useOutsideClick;