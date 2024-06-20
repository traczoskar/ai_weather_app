import CloseIcon from "../../../assets/icons/close.svg?react";
import { motion } from "framer-motion";
import Footer from "../../../components/Footer";
import { INFO_DATA } from "../infoData";

interface InfoDisplayProps {
  isInfoOpen: boolean;
  closeInfo: () => void;
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({ isInfoOpen, closeInfo }) => {
  return (
    <>
      {isInfoOpen && (
        <div className="flex justify-center items-center w-full h-full fixed left-0 top-0 backdrop-blur-md z-40 ">
          <motion.div
            className="flex flex-col w-[90vw] h-[90vh] z-50 relative lg:max-w-[90vw] lg:max-h-[90vh] p-8 sm:p-16 rounded-2xl gap-4  shadow-xl items-center  border-t dark:border-t-sky-700 bg-sky-900 border-t-sky-300 dark:bg-sky-800 bg-opacity-80 overflow-auto dark:bg-opacity-70"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={closeInfo}
              className="absolute flex justify-center items-center p-1 rounded-full text-sky-600 dark:text-sky-800 bg-sky-200 top-6 right-6 hover:brightness-105 hover:scale-105 active:scale-90 transition-all"
            >
              <CloseIcon />
            </button>
            <article className="flex flex-col items-center justify-center relative gap-8">
              <h2 className="text-sky-50 font-bold flex flex-col sm:flex-row items-center gap-2 text-[3.8vw] sm:text-xl md:text-2xl lg:text-3xl drop-shadow-sm">
                {INFO_DATA.title}
                <span>{INFO_DATA.subTitle}</span>
              </h2>
              <p className="text-sky-200 font-light text-[3.8vw] sm:text-lg drop-shadow-sm max-w-3xl text-center ">
                {INFO_DATA.description}
              </p>
              <div className="w-full h-px bg-sky-300 dark:bg-sky-300"></div>
              <h3 className="text-sky-50 font-bold  text-lg md:text-2xl lg:text-3xl drop-shadow-sm self-start ">
                Key Features:
              </h3>
              <ul className="flex flex-col gap-3 text-lg marker:text-sky-400 self-start">
                {INFO_DATA.keyFeatures.map((feature, index) => (
                  <li
                    key={index}
                    className="flex lg:flex-row flex-col gap-4 drop-shadow-md"
                  >
                    <h4 className="font-bold text-sky-100">
                      {feature.feature}:{" "}
                    </h4>
                    <p className=" text-sky-200">{feature.text}</p>
                  </li>
                ))}
              </ul>
              <div className="w-full h-px bg-sky-300 dark:bg-sky-300"></div>
              <h3 className="text-sky-50 font-bold text-lg md:text-2xl lg:text-3xl drop-shadow-md self-start">
                Built with:
              </h3>
              <ul className="flex flex-wrap gap-3 text-md self-start">
                {INFO_DATA.builtWith.map((tool, index) => (
                  <li
                    key={index}
                    className="text-sky-100 rounded-2xl flex justify-center font-semibold border border-sky-600 shadow-md bg-sky-800 px-4 py-2"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
              <div className="w-full h-px bg-sky-300 dark:bg-sky-300"></div>
              <h3 className="text-sky-100 font-bold text-lg md:text-2xl lg:text-3xl drop-shadow-sm self-start  ">
                About this App
              </h3>
              <p className="text-sky-200 text-md tracking-wide md:text-lg drop-shadow-sm">
                This application was originally designed to use the{" "}
                <strong>Open AI API</strong> to provide users with suggestions
                for leisure activities and clothing based on weather data
                retrieved from the API. Unfortunately, during development, it
                turned out that to set up such an application, a private server
                with a backend is needed to act as a bridge between the frontend
                application and OpenAI (mainly for security purposes).
              </p>
              <p className="text-sky-200  text-lg drop-shadow-sm">
                I am currently working on this solution and will soon release a
                fully functional version.{" "}
                <strong>
                  For now, you can run the AI weather advice feature on your
                  local instance.
                </strong>{" "}
                How to do it?:
              </p>
              <ol className="list-decimal  text-sky-200  text-lg drop-shadow-sm self-start pl-8 marker:font-bold bg-sky-900 py-1 my-4 marker:text-sky-400">
                <li className="list-item tracking-wide px-2 py-2 ">
                  Download this repository
                </li>
                <li className="list-item tracking-wide px-2 py-2 ">
                  Paste your OpenAI API key into the .env file
                </li>
                <li className="list-item tracking-wide px-2 py-2 ">
                  Uncomment the line of code that imports the
                  'SuggestionDisplay' component in the App.tsx file
                </li>
                <li className="list-item tracking-wide px-2 py-2 ">
                  Start the development server.
                </li>
              </ol>{" "}
              <span className="font-bold text-xl self-start text-sky-200">
                Let me know how you like this feature! 🔥🚀
              </span>
              <Footer isOnInfoDisplay={true} />
            </article>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default InfoDisplay;
