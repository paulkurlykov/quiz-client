import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Level } from "@/types/main.types";
import { TopicColor } from "@/data/helperData.types";


interface IconMakerProps {
  name: Level;
  size?: string;
  color?: string | TopicColor;
  className?: string
}

function IconMaker({ name, color, className }: IconMakerProps) {
  return (
    <>
      {
        {
          html: (
            <FaHtml5
            className={className}
              style={{color: color }}
            />
          ),
          css: (
            <FaCss3Alt
            className={className}
            style={{color: color }}
            />
          ),
          js: (
            <FaJsSquare
            className={className}
            style={{color: color }}
            />
          ),
          react: (
            <FaReact
            className={className}
            style={{color: color }}
            />
          ),
          
        }[name]
      }
    </>
  );
}

export default IconMaker;
