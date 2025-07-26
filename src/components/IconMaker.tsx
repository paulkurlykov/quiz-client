import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaVuejs } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Level } from "@/types/main.types";
import { TopicColor } from "@/data/helperData.types";

interface IconMakerProps {
  name: Level;
  size?: string;
  color?: string | TopicColor;
  className?: string;
}

function IconMaker({ name, color, className, size }: IconMakerProps) {
  return (
    <>
      {
        {
          html: (
            <FaHtml5
              className={className}
              style={{ color: color }}
              size={size}
            />
          ),
          css: (
            <FaCss3Alt
              className={className}
              style={{ color: color }}
              size={size}
            />
          ),
          js: (
            <FaJsSquare
              className={className}
              style={{ color: color }}
              size={size}
            />
          ),
          react: (
            <FaReact
              className={className}
              style={{ color: color }}
              size={size}
            />
          ),
          vue: (
            <FaVuejs
              className={className}
              style={{ color: color }}
              size={size}
            />
          ),
        }[name]
      }
    </>
  );
}

export default IconMaker;
