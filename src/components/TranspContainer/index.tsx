interface TranspContainerProps {
  children: React.ReactNode;
  isCollapsed?: boolean;
}

const TranspContainer = ({ children, isCollapsed }: TranspContainerProps) => {
  return (
    <div
      className={`${
        isCollapsed ? "sm:px-14 sm:py-6 px-7 py-2" : "sm:p-14 p-7"
      } flex bg-white  dark:bg-sky-800 border-t border-t-sky-50 dark:border-t-sky-700 transition-all sm:p-14 p-7 rounded-3xl w-full shadow-lg`}
    >
      {children}
    </div>
  );
};

export default TranspContainer;
