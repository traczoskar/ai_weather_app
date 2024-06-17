import { QueryData } from "../../../../types/types";
import { getAirQualityClass } from "../../../../utils/getAirQualityClass";
import { getAirQualityName } from "../../../../utils/getAirQualityName";
import BreathIcon from "../../../../assets/icons/breathing.svg?react";

interface AirPollutionProps {
  airPollutionData: QueryData;
}

const AirPollutionInfo: React.FC<AirPollutionProps> = ({
  airPollutionData,
}) => {
  const { isPending, data, error } = airPollutionData;
  const airComponents = data?.list[0].components;
  console.log(data?.list[0].main.aqi);

  const getAirQualityRating = (value: number) => {
    if (value === 1) return "Very Good";
    if (value === 2) return "Good";
    if (value === 3) return "Moderate";
    if (value === 4) return "Poor";
    if (value === 5) return "Bad";
    return "Unknown";
  };

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
    <div className="flex flex-col gap-8 w-full border-t pt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-sky-700 text-2xl font-semibold flex gap-4 drop-shadow items-center">
          Air Quality <BreathIcon width={28} height={28} />
        </h2>
        <h3 className="text-slate-500 text-lg font-normal">
          Overall rating:{" "}
          <span className="text-sky-600 pl-2 font-semibold">
            {getAirQualityRating(data?.list[0].main.aqi)}
          </span>
        </h3>
      </div>
      <ul className="flex justify-between gap-2">
        {airComponents
          ? Object.entries(airComponents).map(([key, value]) => (
              <li
                key={key}
                className="flex flex-col items-center justify-center p-2 border rounded-xl shadow border-slate-200"
              >
                <h5 className=" text-lg mb-4 font-bold text-slate-700">
                  {formatKey(key)}
                </h5>
                <div
                  className={`flex flex-col shadow-md p-4 w-20 h-20  items-center justify-center ${getAirQualityClass(
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
                <span className=" text-md mt-4 font-normal text-slate-700">
                  {getAirQualityName(value as number, key)}
                </span>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default AirPollutionInfo;
