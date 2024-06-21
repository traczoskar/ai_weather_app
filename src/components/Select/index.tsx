import { motion } from "framer-motion";

interface SelectProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Select = ({ onClick, children }: SelectProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      aria-label="Select the location"
      role="button"
      className="w-full px-4 py-4 text-sm  bg-white overflow-hidden dark:bg-sky-950 dark:hover:bg-sky-800
        hover:bg-sky-100 hover:border-slate-300 hover:border  hover:cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

export default Select;
