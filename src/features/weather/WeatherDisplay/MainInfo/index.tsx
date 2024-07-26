import { GeocodingData, WeatherResponse } from "../../../../types/types";
import LocationIcon from "../../../../assets/icons/location.svg?react";
import CalendarIcon from "../../../../assets/icons/calendar.svg?react";
import { useCurrentDate } from "../../../../hooks/useCurrentDate";
import Clock from "../../../../components/Clock";
import {
  formatDescription,
  formatPrimaryTemp,
} from "../../../../utils/dataFormatting";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { getWeatherAnimation } from "../../../../utils/getWeatherAnimation";
import { useMediaQuery } from "react-responsive";

interface MainInfoProps {
  weather: WeatherResponse | null;
  selectedLocation: GeocodingData | null;
}

const MainInfo: React.FC<MainInfoProps> = ({ weather, selectedLocation }) => {
  const currentDate = useCurrentDate();

  const isMobile: boolean = useMediaQuery({
    query: `(max-width: 767px)`,
  });

  const isSmallMobile: boolean = useMediaQuery({
    query: `(max-width: 639px)`,
  });

  const animationData = weather
    ? getWeatherAnimation(weather.weather[0].main)
    : null;

  return (
    <div
      data-test="weather-main-info"
      className="flex lg:flex-col justify-between gap-4 pb-8 lg:pb-0"
    >
      <div className="flex flex-col gap-2 sm:gap-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="font-bold text-[6vw] sm:text-2xl max-w-xs drop-shadow text-sky-700 dark:text-sky-50"
        >
          {selectedLocation?.name}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-3 text-slate-500 dark:text-sky-300"
        >
          <LocationIcon className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          <h4 className="font-normal text-[3.5vw] sm:text-lg">
            {weather?.name}
            {selectedLocation?.country ? `, ${selectedLocation.country}` : null}
          </h4>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-3  text-slate-500 dark:text-sky-300"
        >
          <CalendarIcon className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
          <h4 className="font-normal text-[3.5vw] sm:text-lg tracking-wide">
            {currentDate}, {""}
            {weather ? <Clock timezone={weather.timezone} /> : null}
          </h4>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          data-test="main-description"
          className="text-md sm:text-xl font-semibold
       text-sky-600 dark:text-sky-100 pt-0 sm:pt-2"
        >
          {weather ? formatDescription(weather.weather[0].description) : null}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col sm:flex-row items-center justify-center self-end gap-2 sm:gap-4"
      >
        {weather && animationData ? (
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{
              width: isSmallMobile ? "18vw" : isMobile ? "100px" : "150px",
              height: isSmallMobile ? "18vw" : isMobile ? "100px" : "150px",
            }}
          />
        ) : null}

        <p
          data-test="main-temperature"
          className="text-[8.5vw] sm:text-5xl md:text-6xl font-semibold text-sky-900 dark:text-sky-200 drop-shadow-md"
        >
          {weather ? formatPrimaryTemp(weather.main.temp) : null}°C
        </p>
      </motion.div>
    </div>
  );
};

export default MainInfo;
