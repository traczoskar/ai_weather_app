interface ContainerProps {
  children: React.ReactNode;
  isCollapsed?: boolean;
  isButton?: boolean;
}

const Container = ({ children, isCollapsed, isButton }: ContainerProps) => {
  return (
    <>
      {!isButton && (
        <div
          className={`${
            isCollapsed
              ? "sm:px-14 sm:pt-12 sm:pb-14 px-7 pb-y pt-5"
              : "sm:p-14 p-7"
          } flex bg-white  dark:bg-sky-800 border-t  border-t-sky-50 dark:border-t-sky-700 transition-all sm:p-14 p-7 rounded-3xl w-full shadow-lg`}
        >
          {children}
        </div>
      )}
      {isButton && (
        <div
          className={`sm:px-6 sm:py-3 px-7 py-2 flex bg-white hover:scale-[1.02] hover:brightness-105 dark:bg-sky-800 border-t border-t-sky-50 dark:border-t-sky-700 transition-all sm:p-14 p-7 rounded-2xl w-full shadow-lg`}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default Container;
