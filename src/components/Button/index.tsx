interface ButtonProps {
  onClick: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, icon, children }) => {
  return (
    <button
      onClick={onClick}
      className="flex gap-2 hover:cursor-pointer shadow-sm text-sky-800 border transition-all border-sky-200 bg-sky-100 text-sm font-normal hover:border-sky-700 active:bg-sky-200 active:scale-90 px-3 py-2 rounded-xl items-center"
    >
      {icon ? <span className="text-fuchsia-700">{icon}</span> : null}
      {children}
    </button>
  );
};

export default Button;
