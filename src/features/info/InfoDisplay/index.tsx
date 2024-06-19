import GitHubIcon from "../../../assets/icons/github.svg?react";
import { motion } from "framer-motion";

interface InfoDisplayProps {
  isInfoOpen: boolean;
  closeInfo: () => void;
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({ isInfoOpen, closeInfo }) => {
  return (
    <>
      {isInfoOpen && (
        <div className="flex justify-center items-center w-full h-full fixed left-0 top-0 backdrop-blur-md z-50 ">
          <motion.div
            className="flex flex-col w-9/12 h-9/12 p-10 rounded-2xl gap-4 relative items-center justify-center bg-sky-900 dark:bg-sky-300 bg-opacity-70 dark:bg-opacity-25"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={closeInfo}
              className="absolute flex justify-center items-center p-1 rounded-full text-sky-600 bg-sky-200 top-4 right-4 hover:brightness-105 hover:scale-105 active:scale-90 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <p className="text-sky-200 font-light text-sm drop-shadow-sm">
              Hello! Thanks for visiting my App! Feel free to try it every way
              you want and please let me know if there is still something to
              improve. This App is built with React, TypeScript, TailwindCSS,
              and Framer Motion. It uses OpenWeatherMap API for weather data.
            </p>
            <p className="text-sky-200 font-light text-sm drop-shadow-sm">
              This application was originally designed to use the Open AI API to
              provide users with suggestions for leisure activities and clothing
              based on weather data retrieved from the API. Unfortunately,
              during development, it turned out that to set up such an
              application, a private server with a backend is needed to act as a
              bridge between the frontend application and OpenAI (mainly for
              security purposes). I am currently working on this solution and
              will soon release a fully functional version. For now, you can run
              the AI weather advice feature on your local instance. Just
              download this repository, then paste your OpenAI API key into the
              .env file and start the development server. Next, uncomment the
              line of code that imports the "SuggestionDisplay" component in the
              App.tsx file. Let me know how you like this feature!
            </p>

            <GitHubIcon className="w-8 h-8 text-sky-300" />
          </motion.div>
        </div>
      )}
    </>
  );
};

export default InfoDisplay;
