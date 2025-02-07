import { motion } from "framer-motion";
import {ReactNode} from "react"



function Motion({ children }: {children: ReactNode}) {
  return (
    <>
      <motion.div
      className="shadow-xl"
        initial={{ opacity: 0, scale: 0.95 }} // начальная точка
        animate={{ opacity: 1, scale: 1 }} // конечная точка анимации
        exit={{ opacity: 0, scale: 0.95 }} // точка, к которой идет анмация при удалении из dom
        transition={{ duration: 0.2 }}
        style={{overflow: "hidden", borderRadius: "40px"}} // добавление других стилей контейнеру, которые не относятся к анимации
      >
        {children}
      </motion.div>
    </>
  );
}

export default Motion;
