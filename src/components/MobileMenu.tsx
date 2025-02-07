import { Dispatch, ReactNode, SetStateAction } from "react";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

function MobileMenu({
  children,
  onClose,
  showMenu,
}: {
  children: ReactNode;
  onClose: Dispatch<SetStateAction<boolean>>;
  showMenu: boolean;
}) {

  return (
    <AnimatePresence>
      {showMenu && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-[9999] h-full w-full bg-backgroundLight2 dark:bg-backgroundDarkGray"
        >
          <IoClose
            onClick={() => onClose(false)}
            className="hover:text-backgroundDarkGray2 text-backgroundDark dark:text-accent absolute right-5 top-5 z-[9999] cursor-pointer text-[5rem] active:scale-95"
          />

          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
