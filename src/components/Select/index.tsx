interface SelectProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Select = ({ onClick, children }: SelectProps) => {
  return (
    <div
      onClick={onClick}
      className="px-3 py-2 text-sm text-gray-800 bg-neutral-100
        hover:bg-neutral-200 hover:border-neutral-300 hover:cursor-pointer"
    >
      {children}
    </div>
  );
};

export default Select;
