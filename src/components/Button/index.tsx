interface ButtonProps {
  onClick: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  icon,
  children,
  disabled,
}) => {
  return (
    <button
      aria-label="Get AI Advice"
      title="Get AI Advice"
      onClick={onClick}
      disabled={disabled}
      className="flex gap-2  text-sky-100 text-sm bg-sky-800 dark:bg-sky-700 disabled:text-slate-600 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:border-none border-t-sky-900 shadow-md border-b-0 border-x-0 dark:border-t-sky-600 dark:hover:border-sky-500 rounded-full border active:scale-90 active:brightness-110 transition-all hover:scale-105 px-4 py-1.5  items-center"
    >
      {icon ? (
        <span className={disabled ? "text-slate-600" : "text-fuchsia-400"}>
          {icon}
        </span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
