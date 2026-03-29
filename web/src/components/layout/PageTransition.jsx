import { motion, AnimatePresence } from "framer-motion";
import { pageVariants } from "../../animations/variants";

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}