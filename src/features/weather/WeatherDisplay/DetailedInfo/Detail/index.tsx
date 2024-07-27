import { ReactNode } from "react";
import { motion } from "framer-motion";

interface DetailProps {
  icon?: ReactNode;
  title: string;
  data: string;
  width?: string;
  textSize?: string;
}

const Detail: React.FC<DetailProps> = ({
  icon,
  title,
  data,
  width,
  textSize,
}) => {
  return (
    <motion.li
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-4 text-slate-500 dark:text-sky-300 transition-colors list-none"
    >
      {icon}
      <p
        className={`flex items-center gap-6 justify-between  ${
          width ? width : "w-full"
        } ${textSize ? textSize : "text-md"} font-normal}`}
      >
        {title}{" "}
        <span className="text-sky-600 dark:text-sky-100 transition-colors text-md font-semibold">
          {data}
        </span>
      </p>
    </motion.li>
  );
};

export default Detail;
