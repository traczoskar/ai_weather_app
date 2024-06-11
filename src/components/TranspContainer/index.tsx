interface TranspContainerProps {
  children: React.ReactNode;
}

const TranspContainer = ({ children }: TranspContainerProps) => {
  return (
    <div className="flex  bg-sky-100 p-6 rounded-3xl w-full shadow-lg">
      {children}
    </div>
  );
};

export default TranspContainer;
