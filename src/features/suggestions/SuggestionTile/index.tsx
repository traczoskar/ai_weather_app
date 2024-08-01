import LinkIcon from "../../../assets/icons/suggestions/link.svg?react";
import AiIcon from "../../../assets/icons/suggestions/ai.svg?react";
import MoodIcon from "../../../assets/icons/suggestions/mood.svg?react";
import { motion } from "framer-motion";
interface SuggestionTileProps {
  title?: string;
  data?: string[];
  musicOrMovies?: MusicOrMovies[];
  isArray?: boolean;
  isMusicOrMovies?: boolean;
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

interface MusicOrMovies {
  artist?: string;
  title: string;
  link: string;
}

const SuggestionTile: React.FC<SuggestionTileProps> = ({
  data,
  mood,
  general_advice,
  title,
  icon,
  isArray,
  isMusicOrMovies,
  musicOrMovies,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4 dark:bg-sky-700 p-6 rounded-lg shadow-md border dark:border-x-0 dark:border-b-0 dark:border-t-sky-600 hover:scale-[1.01] hover:shadow-lg transition-all"
    >
      {isArray ? (
        <>
          <h4 className="flex gap-3 items-center text-xl font-bold drop-shadow-md text-sky-800 dark:text-sky-300">
            <span className="text-sky-700 dark:text-sky-400">{icon}</span>
            {title}
          </h4>
          <>
            {data && data.length > 0 ? (
              <ul className="flex flex-col gap-3 text-sm lg:text-md list-disc pl-4">
                {data.map((item, index) => (
                  <li className="text-sky-600 dark:text-sky-100" key={index}>
                    {item}
                  </li>
                ))}
              </ul>
            ) : isMusicOrMovies ? null : (
              <p className="text-sky-400 text-sm">
                No suggestion from AI for todays weather 🤷‍♂️
              </p>
            )}
            {musicOrMovies && musicOrMovies.length > 0 ? (
              <ul className="flex flex-col gap-3 text-sm lg:text-md pl-2">
                {musicOrMovies?.map((item, index) => (
                  <li
                    className="text-sky-500 hover:text-sky-700 dark:text-sky-300 dark:hover:text-sky-50 underline underline-offset-4"
                    key={index}
                  >
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex gap-2 items-center "
                    >
                      <LinkIcon
                        height={15}
                        width={15}
                        className="text-sky-500 dark:text-sky-200 drop-shadow-lg"
                      />
                      {item.artist ? (
                        <span>
                          <span className="font-bold">{item.artist} - </span>
                          <span className="font-semibold">{item.title}</span>
                          <span className="no-underline"> 🎶</span>
                        </span>
                      ) : (
                        <span className="font-semibold">{item.title} 🎬</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            ) : !isMusicOrMovies ? null : (
              <p className="text-sky-400 text-sm">
                No data from AI for this section today 🤷‍♂️
              </p>
            )}
          </>
        </>
      ) : (
        <>
          <h4 className="flex gap-3 items-center text-xl drop-shadow-md font-bold text-sky-800 dark:text-sky-300">
            <span className="text-sky-700 dark:text-sky-400">
              <MoodIcon width={20} height={20} />
            </span>{" "}
            {mood?.title}
          </h4>
          <p className="text-sky-600 dark:text-sky-100 text-sm md:text-md">
            {mood?.text}
          </p>
          <h4 className="flex gap-3 items-center text-xl drop-shadow-md font-bold text-sky-800 dark:text-sky-300">
            <span className="text-sky-700 dark:text-sky-400">
              <AiIcon width={20} height={20} />
            </span>{" "}
            {general_advice?.title}
          </h4>
          <p className="text-sky-600 dark:text-sky-100 text-sm md:text-md">
            {general_advice?.text}
          </p>
        </>
      )}
    </motion.div>
  );
};

export default SuggestionTile;
