import { QueryData } from "../../../../types/types";
import { getAirQualityClass } from "../../../../utils/getAirQualityClass";
import { getAirQualityName } from "../../../../utils/getAirQualityName";
import BreathIcon from "../../../../assets/icons/breathing.svg?react";
import { motion } from "framer-motion";
import { getAirQualityRating } from "../../../../utils/getAirQualityRating";

interface AirPollutionProps {
  airPollutionData: QueryData;
}

const AirPollutionInfo: React.FC<AirPollutionProps> = ({
  airPollutionData,
}) => {
  const { data } = airPollutionData;
  const airComponents = data?.list[0].components;

  const formatKey = (key: string) => {
    switch (key) {
      case "co":
        return <>CO</>;
      case "no":
        return <>NO</>;
      case "no2":
        return (
          <>
            NO<sup>2</sup>
          </>
        );
      case "o3":
        return (
          <>
            O<sup>3</sup>
          </>
        );
      case "so2":
        return (
          <>
            SO<sup>2</sup>
          </>
        );
      case "pm2_5":
        return (
          <>
            PM<sup>2.5</sup>
          </>
        );
      case "pm10":
        return (
          <>
            PM<sup>10</sup>
          </>
        );
      case "nh3":
        return (
          <>
            NH<sup>3</sup>
          </>
        );
      default:
        return key;
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full border-t dark:border-t-slate-400 pt-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row sm:items-center gap-8 sm:gap-0 justify-between"
      >
        <h2 className="text-sky-700 transition-colors dark:text-sky-200 text-2xl font-semibold flex gap-4 drop-shadow items-center">
          Air Quality <BreathIcon width={28} height={28} />
        </h2>
        <h3 className="text-slate-500 transition-colors  dark:text-sky-300 self-center sm:self-start text-lg font-normal">
          Overall rating:{" "}
          <span className="text-sky-600 transition-colors  dark:text-sky-50 ml-2 px-2 py-1 sm:p-0 shadow-md sm:shadow-none sm:border-none border-2 border-sky-600 dark:border-sky-200 rounded-lg font-semibold">
            {getAirQualityRating(data?.list[0].main.aqi)}
          </span>
        </h3>
      </motion.div>
      <ul className="grid justify-between place-items-stretch grid-cols-2 gap-4 lg:grid-cols-8 lg:gap-2 md:grid-cols-4 ">
        {airComponents
          ? Object.entries(airComponents).map(([key, value]) => (
              <motion.li
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                key={key}
                className="flex flex-col items-center justify-center p-2 border dark:border-x-0 dark:border-b-0 rounded-xl transition-colors shadow dark:bg-sky-700 dark:border-sky-600 border-slate-200"
              >
                <h5 className=" text-lg mb-4 font-bold text-slate-700 transition-colors dark:text-sky-100">
                  {formatKey(key)}
                </h5>
                <div
                  className={`flex flex-col shadow-md p-4 w-20 h-20  transition-colors items-center justify-center ${getAirQualityClass(
                    value as number,
                    key
                  )} rounded-lg`}
                >
                  <div className="flex flex-col items-center justify-center">
                    <span className=" text-md font-semibold ">
                      {value as number}
                    </span>
                    <span className=" text-xs">
                      μg/m<sup>3</sup>
                    </span>
                  </div>
                </div>
                <span className=" text-md mt-4 font-normal text-slate-700 dark:text-sky-300 transition-colors">
                  {getAirQualityName(value as number, key)}
                </span>
              </motion.li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default AirPollutionInfo;
