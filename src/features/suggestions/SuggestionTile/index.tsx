import React from "react";

interface SuggestionTileProps {
  title?: string;
  data?: string[];
  isArray?: boolean;
  icon?: React.ReactNode;
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
  icon,
  isArray,
}) => {
  return (
    <div className="flex flex-col gap-4 bg-sky-700 p-6 rounded-lg shadow-md border-t border-t-sky-600 hover:scale-[1.02] hover:shadow-lg transition-all">
      {isArray ? (
        <>
          <h4 className="flex gap-3  items-center text-xl font-bold drop-shadow-md text-sky-300">
            <span className="text-sky-400">{icon}</span>
            {title}
          </h4>
          {data && data.length > 0 ? (
            <ul className="flex flex-col gap-3 text-sm lg:text-md list-disc pl-4">
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
