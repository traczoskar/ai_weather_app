interface SelectProps {
  onClick: () => void;
  children: React.ReactNode;
}

function Select({ onClick, children }: SelectProps) {
  return (
    <div
      onClick={onClick}
      className="px-3 py-2 text-sm text-neutral-400 bg-neutral-800
        hover:bg-neutral-600 hover:border-neutral-200 hover:cursor-pointer"
    >
      {children}
    </div>
  );
}

export default Select;
