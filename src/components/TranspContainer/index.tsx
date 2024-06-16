interface TranspContainerProps {
  children: React.ReactNode;
}

const TranspContainer = ({ children }: TranspContainerProps) => {
  return (
    <div className="flex bg-white p-14 rounded-3xl w-full shadow-lg">
      {children}
    </div>
  );
};

export default TranspContainer;
