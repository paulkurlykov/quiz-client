import { motion } from "framer-motion";
import { ReactNode } from "react";

function MotionPage({ children }: { children: ReactNode }) {
  return (
    <motion.div
    className="motion-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3 } }}
    >
      {children}
    </motion.div>
  );
}

export default MotionPage;
