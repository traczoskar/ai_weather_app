interface TranspContainerProps {
  children: React.ReactNode;
}

const TranspContainer = ({ children }: TranspContainerProps) => {
  return (
    <div className="flex justify-center  bg-black/10 backdrop-blur-md p-6 max-w-4xl rounded-3xl">
      {children}
    </div>
  );
};

export default TranspContainer;
