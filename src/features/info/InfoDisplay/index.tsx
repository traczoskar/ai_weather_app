import GitHubIcon from "../../../assets/icons/github.svg?react";
import LinkedInIcon from "../../../assets/icons/linkedIn.svg?react";
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
            className="flex flex-col w-[90vw] h-[90vh] lg:w-9/12 lg:h-9/12 p-10 rounded-2xl gap-4 relative shadow-xl items-center justify-center border-t dark:border-t-sky-700 bg-sky-900 border-t-sky-300 dark:bg-sky-800 bg-opacity-70 overflow-auto dark:bg-opacity-70"
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
            <p className="text-sky-200 font-light text-md drop-shadow-sm">
              Hello! Thanks for visiting my App! Feel free to try it every way
              you want and please let me know if there is still something to
              improve. This App is built with React, TypeScript, TailwindCSS,
              and Framer Motion. It uses OpenWeatherMap API for weather data.
            </p>
            <p className="text-sky-200 font-light text-md drop-shadow-sm">
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
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/traczoskar/"
                className="flex items-center no-underline transition-all hover:text-sky-200 text-sky-300 "
              >
                <LinkedInIcon className="w-6 h-6 " />
              </a>
              <a
                href="https://github.com/traczoskar/ai_weather_app"
                className="flex items-center no-underline  transition-all hover:text-sky-200 text-sky-300 "
              >
                <GitHubIcon className="w-6 h-6" />
              </a>
              <div className="flex gap-2 text-sky-300 text-sm self-end font-extralight">
                Developed by{" "}
                <a
                  href="https://traczoskar.dev"
                  className="transition-all underline underline-offset-2 hover:text-sky-200 text-sky-500"
                >
                  Oskar Tracz
                </a>{" "}
                @2024
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default InfoDisplay;
