import TranspContainer from "../../../components/TranspContainer";
import { QueryData } from "../../../types/types";
import Lottie from "lottie-react";
import { getWeatherAnimation } from "../../../utils/getWeatherAnimation";
import ForecastIcon from "../../../assets/icons/fortune-teller.svg?react";
import NightIcon from "../../../assets/icons/night.svg?react";
import HumidityIcon from "../../../assets/icons/drop.svg?react";
import PressureIcon from "../../../assets/icons/barometer.svg?react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loader from "../../../components/Loader";
import {
  calculateAverage,
  processForecastData,
} from "../../../utils/dataFormatting";

interface WeatherForecastProps {
  forecastData: QueryData;
  setNightTemp: (temp: number | null) => void;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({
  forecastData,
  setNightTemp,
}) => {
  const [forecastDays, setForecastDays] = useState<any[]>(null as any);

  const { isFetching: isForecastFetching, error } = forecastData;

  useEffect(() => {
    if (forecastData.data) {
      const processedDays = processForecastData(forecastData.data.list);
      setForecastDays(processedDays);

      const todaysNightTemp = calculateAverage(processedDays[0].nightTemps);
      setNightTemp(todaysNightTemp ? parseInt(todaysNightTemp) : null);
    }
  }, [forecastData.data, setNightTemp]);

  return (
    <>
      {error && <h3>{error.message}</h3>}
      {isForecastFetching ? (
        <motion.section
          className="flex w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <TranspContainer>
            <div className="w-full h-36 flex justify-center items-center gap-4 animate-pulseQuick">
              <span className="font-normal text-xl text-sky-600 dark:text-sky-200 drop-shadow">
                Loading fresh forecast data...
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
          {!forecastDays ? null : (
            <TranspContainer>
              <div className="flex flex-col items-center justify-between w-full gap-8">
                <h2 className="text-sky-700 dark:text-sky-200 transition-colors text-2xl self-start font-semibold flex gap-4 drop-shadow items-center">
                  Forecast <ForecastIcon width={28} height={28} />
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center w-full gap-3">
                  {forecastDays?.map((day, index) => (
                    <li
                      key={index}
                      className="flex flex-col h-full p-6 sm:p-4 border transition-colors dark:bg-sky-600 dark:border-sky-500 border-slate-200 rounded-xl shadow-md"
                    >
                      <h3 className="text-lg text-sky-800 dark:text-sky-100 transition-colors font-bold">
                        {new Date(day.date).toLocaleDateString("en-EN", {
                          weekday: "long",
                        })}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-sky-300 transition-colors font-semibold">
                        {new Date(day.date).toLocaleDateString("en-EN", {
                          day: "2-digit",
                          month: "2-digit",
                        })}
                      </p>
                      <div className="flex items-center gap-2 py-3">
                        {day.icon && (
                          <Lottie
                            animationData={getWeatherAnimation(day.icon)}
                            loop={true}
                            autoplay={true}
                            style={{ width: "45px", height: "45px" }}
                          />
                        )}
                        <p className="text-2xl text-sky-900 dark:text-sky-100 transition-colors font-bold drop-shadow">
                          {day.dayTemps.length > 0
                            ? calculateAverage(day.dayTemps)
                            : calculateAverage(day.nightTemps)}{" "}
                          °C
                        </p>
                      </div>
                      <p
                        className="text-md capitalize drop-shadow-sm font-semibold
           text-sky-600 dark:text-sky-300 transition-colors"
                      >
                        {day.description}
                      </p>
                      <div className="flex flex-row  sm:flex-col gap-6 sm:gap-3 pt-4">
                        <div className="flex  text-slate-400 dark:text-sky-200 transition-colors items-center gap-3 ">
                          <PressureIcon width={20} height={20} />
                          <p className="text-sm text-slate-500 dark:text-sky-200 transition-colors font-semibold drop-shadow">
                            {day.dayPressures.length > 0
                              ? calculateAverage(day.dayPressures)
                              : calculateAverage(day.nightPressures)}{" "}
                            hPa
                          </p>
                        </div>
                        <div className="flex  text-slate-400 dark:text-sky-200 transition-colors items-center gap-3 ">
                          <HumidityIcon width={20} height={20} />
                          <p className="text-sm text-slate-500 dark:text-sky-200 transition-colors font-semibold drop-shadow">
                            {day.dayHumidities.length > 0
                              ? calculateAverage(day.dayHumidities)
                              : calculateAverage(day.nightHumidities)}{" "}
                            %
                          </p>
                        </div>
                      </div>
                      <div className="flex self-center text-sky-700 dark:text-amber-200 transition-colors items-center gap-3 pt-3 mt-3 w-full justify-center border-t">
                        <NightIcon width={32} height={32} />
                        <p className="text-lg font-bold drop-shadow">
                          {day.nightTemps.length > 0
                            ? calculateAverage(day.nightTemps)
                            : calculateAverage(day.dayTemps)}{" "}
                          °C
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </TranspContainer>
          )}
        </motion.section>
      )}
    </>
  );
};
export default WeatherForecast;
