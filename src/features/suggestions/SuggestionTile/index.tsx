interface SuggestionTileProps {
  title?: string;
  data?: string[];
  isArray?: boolean;
  mood?: {
    title: string;
    text: string;
  };
  general_advice?: {
    title: string;
    text: string;
  };
}

const SuggestionTile: React.FC<SuggestionTileProps> = ({
  data,
  mood,
  general_advice,
  title,
  isArray,
}) => {
  return (
    <div className="flex flex-col gap-4 bg-sky-700 p-6 rounded-lg shadow-md border-t border-t-sky-600">
      {isArray ? (
        <>
          <h4 className="text-xl font-bold text-sky-300">{title}</h4>
          {data && data.length > 0 ? (
            <ul className="flex flex-col gap-3 text-sm list-disc pl-4">
              {data.map((item, index) => (
                <li className="text-sky-100" key={index}>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sky-400 text-sm">
              No data from AI for this section today 🤷‍♂️
            </p>
          )}
        </>
      ) : (
        <>
          <h4 className="text-xl font-bold text-sky-300">{mood?.title}</h4>
          <p className="text-sky-100">{mood?.text}</p>
          <h4 className="text-xl font-bold text-sky-300">
            {general_advice?.title}
          </h4>
          <p className="text-sky-100">{general_advice?.text}</p>
        </>
      )}
    </div>
  );
};

export default SuggestionTile;
