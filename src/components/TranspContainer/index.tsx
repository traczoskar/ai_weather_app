interface TranspContainerProps {
  children: React.ReactNode;
}

const TranspContainer = ({ children }: TranspContainerProps) => {
  return (
    <div className="flex bg-white dark:bg-sky-800 border-t border-t-sky-50 dark:border-t-sky-700 transition-colors sm:p-14 p-7 rounded-3xl w-full shadow-lg">
      {children}
    </div>
  );
};

export default TranspContainer;
