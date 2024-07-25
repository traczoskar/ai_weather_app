import { motion } from "framer-motion";

interface SelectProps {
  index?: number;
  onClick?: () => void;
  children: React.ReactNode;
}

const Select = ({ index, onClick, children }: SelectProps) => {
  return (
    <motion.li
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      data-test={`location-select-${index}`}
      aria-label="Select the location"
      role="button"
      className="w-full px-4 py-4 text-sm list-none bg-white overflow-hidden dark:bg-sky-950 dark:hover:bg-sky-800
        hover:bg-sky-100 hover:border-slate-300 hover:border  hover:cursor-pointer"
    >
      {children}
    </motion.li>
  );
};

export default Select;
