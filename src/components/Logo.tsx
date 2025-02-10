import { FaCode, FaQuestionCircle, FaHeart } from "react-icons/fa";

function Logo() {
  return (
    <div className="flex text-[3.5rem] gap-2">
      <FaCode  className="text-accentDark" />
      <FaQuestionCircle   className="text-accentDark" />
      <FaHeart   className="text-accentDark" />
    </div>
  );
}

export default Logo;
