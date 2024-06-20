import CloseIcon from "../../../assets/icons/close.svg?react";
import { motion } from "framer-motion";
import Footer from "../../../components/Footer";

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
              className="absolute flex justify-center items-center p-1 rounded-full text-sky-600 dark:text-sky-800 bg-sky-200 top-6 right-6 hover:brightness-105 hover:scale-105 active:scale-90 transition-all"
            >
              <CloseIcon />
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
            <Footer isOnInfoDisplay={true} />
          </motion.div>
        </div>
      )}
    </>
  );
};

export default InfoDisplay;
