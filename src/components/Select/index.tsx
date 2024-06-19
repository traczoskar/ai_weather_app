interface SelectProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Select = ({ onClick, children }: SelectProps) => {
  return (
    <div
      onClick={onClick}
      className="w-full px-4 py-4 text-sm  bg-white overflow-hidden dark:bg-sky-950 dark:hover:bg-sky-800
        hover:bg-sky-100 hover:border-slate-300 hover:border  hover:cursor-pointer"
    >
      {children}
    </div>
  );
};

export default Select;
