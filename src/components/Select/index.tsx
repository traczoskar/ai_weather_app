interface SelectProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Select = ({ onClick, children }: SelectProps) => {
  return (
    <div
      onClick={onClick}
      className="w-full px-3 py-2 text-sm  bg-white dark:bg-slate-700 dark:hover:bg-slate-800
        hover:bg-sky-100 hover:border-slate-300 hover:border  hover:cursor-pointer"
    >
      {children}
    </div>
  );
};

export default Select;
