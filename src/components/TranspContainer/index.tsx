interface TranspContainerProps {
  children: React.ReactNode;
}

const TranspContainer = ({ children }: TranspContainerProps) => {
  return (
    <div className="flex bg-white p-10 rounded-3xl w-full shadow-lg">
      {children}
    </div>
  );
};

export default TranspContainer;
