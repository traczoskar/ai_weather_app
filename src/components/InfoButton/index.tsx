interface InfoButtonProps {
  onClick: () => void;
}

const InfoButton: React.FC<InfoButtonProps> = ({ onClick: openInfo }) => {
  return (
    <button
      onClick={openInfo}
      aria-label="Open Additional Info"
      title="Open Additional Info"
      className="p-4 flex items-center w-6 h-6 justify-center drop-shadow-lg rounded-full font-bold text-sky-700 dark:text-sky-300 transition-all text-2xl hover:scale-125 hover:brightness-110 hover:bg-sky-100 dark:hover:bg-sky-700"
    >
      ?
    </button>
  );
};

export default InfoButton;
