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
        <div
          aria-label="Info Window"
          className="flex justify-center items-center w-full h-full fixed left-0 top-0 backdrop-blur-md z-40 "
        >
          <button
            onClick={closeInfo}
            aria-label="Close Info Window"
            className="fixed flex justify-center items-center p-1 rounded-full text-sky-200 dark:text-sky-800 bg-sky-800 opacity-80 dark:bg-sky-200 top-4 left-4 hover:brightness-105 hover:scale-105 active:scale-90 transition-all"
          >
            <CloseIcon />
          </button>
          <motion.div
            className="flex flex-col w-[90vw] h-[90vh] z-50 relative lg:max-w-[90vw] lg:max-h-[90vh] p-8 sm:p-16 rounded-2xl gap-4  shadow-xl items-center  border-t dark:border-t-sky-700 bg-sky-900 border-t-sky-300 dark:bg-sky-800 bg-opacity-80 overflow-auto dark:bg-opacity-70"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
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
              <ul className="flex flex-col gap-3 text-mdsm:text-lg marker:text-sky-400 self-start">
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
                This application is mainly designed to be connected with AI via{" "}
                <strong>Open AI API</strong> to provide users with suggestions
                for leisure activities and clothing based on weather data
                retrieved from the API. The model used for this is feature is
                Chat GPT-3.5-Turbo in JSON mode.
              </p>

              <span className="font-bold  text-lg md:text-xl self-start text-sky-200">
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
