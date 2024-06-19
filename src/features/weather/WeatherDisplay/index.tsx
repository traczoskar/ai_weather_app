import TranspContainer from "../../../components/TranspContainer";
import Loader from "../../../components/Loader";
import { GeocodingData, QueryData } from "../../../types/types";
import StarsIcon from "../../../assets/icons/stars.svg?react";
import DetailedInfo from "./DetailedInfo";
import Button from "../../../components/Button";
import { motion } from "framer-motion";
import MainInfo from "./MainInfo";
import AirPollutionInfo from "./AirPollutionInfo";

interface WeatherDisplayProps {
  selectedLocation: GeocodingData | null;
  weatherData: QueryData;
  nightTemp: number | null;
  aiRequest: () => void;
  airPollutionData: QueryData;
  aiData: QueryData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  selectedLocation,
  weatherData,
  nightTemp,
  aiRequest,
  airPollutionData,
  aiData,
}) => {
  const {
    isPending: isWeatherPending,
    isFetching: isWeatherFetching,
    data: weather,
    error,
  } = weatherData;
  const { isPending: isAILoading } = aiData;

  return (
    <>
      {error && <h3>{error.message}</h3>}
      {isWeatherFetching ? (
        <motion.section
          className="flex w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <TranspContainer>
            <div className="w-full h-40 flex justify-center items-center gap-4 animate-pulseQuick">
              <span className="font-normal text-xl text-sky-600 dark:text-sky-200 drop-shadow">
                Loading fresh data...
              </span>
              <Loader />
            </div>
          </TranspContainer>
        </motion.section>
      ) : (
        <motion.section
          className="flex w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {!weather ? null : (
            <TranspContainer>
              <div className="flex w-full">
                <article className="flex w-full flex-col gap-4">
                  <div className="flex justify-between w-full flex-col lg:flex-row">
                    <MainInfo
                      weather={weather}
                      selectedLocation={selectedLocation}
                    />
                    <div className="lg:w-px bg-slate-300 dark:bg-slate-400 h-px lg:h-full w-full " />
                    <div className="flex flex-col">
                      <div className="flex self-end gap-4 items-center absolute translate-x-3 -translate-y-3">
                        {/* {isAILoading ? (
                          <div className="flex text-sky-700 text-sm font-light gap-4">
                            Waiting for AI response...
                            <Loader />
                          </div>
                        ) : (
                          <Button onClick={aiRequest} icon={<StarsIcon />}>
                            Ask AI for advice
                          </Button>
                        )} */}
                      </div>
                      <DetailedInfo weather={weather} nightTemp={nightTemp} />
                    </div>
                  </div>
                  <AirPollutionInfo airPollutionData={airPollutionData} />
                </article>
              </div>
            </TranspContainer>
          )}
        </motion.section>
      )}
    </>
  );
};

export default WeatherDisplay;
