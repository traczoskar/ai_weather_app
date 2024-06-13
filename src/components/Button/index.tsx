interface ButtonProps {
  onClick: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, icon, children }) => {
  return (
    <button
      onClick={onClick}
      className="flex gap-2 hover:cursor-pointer text-gray-100 text-md font-normal hover:bg-gray-700 active:bg-gray-500 bg-gray-600 px-3 py-2 rounded-lg items-center"
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
