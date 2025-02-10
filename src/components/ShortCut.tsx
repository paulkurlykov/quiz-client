import { IoIosArrowForward } from "react-icons/io";
import { ReactNode, useState } from "react";
import { motion } from "framer-motion";

function ShortCut({children, title}: {children: ReactNode, title: string}) {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  return (
    <>

    {/* spoiler  */}
      <div
        onClick={() => setShowAnswer((st) => !st)}
        className=" mt-2 rounded-3xl border-gray-50 px-12 py-12 text-4xl font-bold"
      >
        <div className="hover:text-accentDark flex cursor-pointer items-center gap-2 text-textPrimary dark:hover:text-accent">
          <IoIosArrowForward
            className={` ${showAnswer ? "rotate-90" : ""} h-[5rem] w-[5rem] transition-all`}
          />
          <p className="cursor-pointer transition-all">{`${showAnswer ? `Убрать ${title}` : `Показать ${title}`}`}</p>
        </div>
      </div>


    {/* spoiler  content */}
      <motion.div
        initial={{ height: 0 }}
        animate={showAnswer ? { height: "auto" } : { height: 0 }}
        // exit={{ height: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 overflow-hidden"
      >
        <div className=" mt-2 flex flex-col gap-8 rounded-3xl border border-gray-50 px-12 py-12 text-2xl ">
          {children}
        </div>

      </motion.div>
    </>
  );
}

export default ShortCut;
