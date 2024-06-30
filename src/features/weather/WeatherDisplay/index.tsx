import Container from "../../../components/Container";
import Loader from "../../../components/Loader";
import { GeocodingData, QueryData } from "../../../types/types";
import DetailedInfo from "./DetailedInfo";
import { motion } from "framer-motion";
import MainInfo from "./MainInfo";
import AirPollutionInfo from "./AirPollutionInfo";

interface WeatherDisplayProps {
  selectedLocation: GeocodingData | null;
  weatherData: QueryData;
  nightTemp: number | null;
  airPollutionData: QueryData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  selectedLocation,
  weatherData,
  nightTemp,
  airPollutionData,
}) => {
  const { isFetching: isWeatherFetching, data: weather, error } = weatherData;

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
          <Container>
            <div className="w-full h-40 flex justify-center items-center gap-4 animate-pulseQuick">
              <span className="font-semibold text-md md:text-xl text-sky-600 dark:text-sky-200 drop-shadow">
                🍋 Loading fresh data ...
              </span>
              <Loader />
            </div>
          </Container>
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
            <Container>
              <div className="flex w-full">
                <article className="flex w-full flex-col gap-4">
                  <div className="flex justify-between w-full flex-col lg:flex-row">
                    <MainInfo
                      weather={weather}
                      selectedLocation={selectedLocation}
                    />
                    <div className="lg:w-px bg-slate-300 dark:bg-slate-400 h-px lg:h-full w-full " />
                    <DetailedInfo weather={weather} nightTemp={nightTemp} />
                  </div>
                  <AirPollutionInfo airPollutionData={airPollutionData} />
                </article>
              </div>
            </Container>
          )}
        </motion.section>
      )}
    </>
  );
};

export default WeatherDisplay;
