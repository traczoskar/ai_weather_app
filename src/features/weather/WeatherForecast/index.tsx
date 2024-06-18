import TranspContainer from "../../../components/TranspContainer";
import { QueryData } from "../../../types/types";
import Lottie from "lottie-react";
import { getWeatherAnimation } from "../../../utils/getWeatherAnimation";
import ForecastIcon from "../../../assets/icons/fortune-teller.svg?react";
import NightIcon from "../../../assets/icons/night.svg?react";
import HumidityIcon from "../../../assets/icons/drop.svg?react";
import PressureIcon from "../../../assets/icons/barometer.svg?react";
import { useEffect } from "react";

interface WeatherForecastProps {
  forecastData: QueryData;
  setNightTemp: (temp: number | null) => void;
}

interface Forecast {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      pressure: number;
      humidity: number;
    };
    weather: Array<{
      description: string;
      main: string;
    }>;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }>;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({
  forecastData,
  setNightTemp,
}) => {
  const processForecastData = (data: Forecast["list"]) => {
    const days: { [key: string]: any } = {};

    data?.forEach((entry) => {
      const date = new Date(entry.dt * 1000);
      const day = date.toISOString().split("T")[0];
      const time = entry.dt_txt.split(" ")[1];
      const hour = parseInt(time.split(":")[0], 10);
      const isNighttime =
        (hour >= 0 && hour <= 6) || (hour >= 21 && hour <= 23);

      if (!days[day]) {
        days[day] = {
          dayTemps: [],
          nightTemps: [],
          dayPressures: [],
          nightPressures: [],
          dayHumidities: [],
          nightHumidities: [],
          description: entry.weather[0].description,
          icon: entry.weather[0].main,
          date: day,
        };
      }
      if (isNighttime) {
        days[day].nightTemps.push(entry.main.temp);
      } else {
        days[day].dayTemps.push(entry.main.temp);
      }

      if (isNighttime) {
        days[day].nightHumidities.push(entry.main.humidity);
      } else {
        days[day].dayHumidities.push(entry.main.humidity);
      }

      if (isNighttime) {
        days[day].nightPressures.push(entry.main.pressure);
      } else {
        days[day].dayPressures.push(entry.main.pressure);
      }
    });

    return Object.values(days).slice(0, 5);
  };

  const calculateAverage = (temps: number[]) => {
    if (temps.length === 0) return null;
    const sum = temps.reduce((a, b) => a + b, 0);
    return (sum / temps.length).toFixed(0);
  };

  if (!forecastData || !forecastData.data || !forecastData.data.list) {
    return null;
  }

  const forecastDays = processForecastData(forecastData?.data.list);
  console.log("Forecast Days:", forecastDays);

  useEffect(() => {
    const todaysNightTemp = calculateAverage(forecastDays[0].nightTemps);
    setNightTemp(todaysNightTemp ? parseInt(todaysNightTemp) : null);
  }, [forecastDays]);

  return (
    <TranspContainer>
      <div className="flex flex-col items-center justify-between w-full gap-8">
        <h2 className="text-sky-700 text-2xl self-start font-semibold flex gap-4 drop-shadow items-center">
          Forecast <ForecastIcon width={28} height={28} />
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center w-full gap-3">
          {forecastDays?.map((day, index) => (
            <li
              key={index}
              className="flex flex-col h-full p-6 sm:p-4 border border-slate-200 rounded-xl shadow-md"
            >
              <h3 className="text-lg text-sky-800 font-bold">
                {new Date(day.date).toLocaleDateString("en-EN", {
                  weekday: "long",
                })}
              </h3>
              <p className="text-sm text-slate-500 font-semibold">
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
                <p className="text-2xl text-sky-900 font-bold drop-shadow">
                  {day.dayTemps.length > 0
                    ? calculateAverage(day.dayTemps)
                    : calculateAverage(day.nightTemps)}{" "}
                  °C
                </p>
              </div>
              <p
                className="text-md capitalize drop-shadow-sm font-semibold
       text-sky-600 "
              >
                {day.description}
              </p>
              <div className="flex flex-row  sm:flex-col gap-6 sm:gap-3 pt-4">
                <div className="flex  text-slate-400 items-center gap-3 ">
                  <PressureIcon width={20} height={20} />

                  <p className="text-sm text-slate-500 font-semibold drop-shadow">
                    {day.dayPressures.length > 0
                      ? calculateAverage(day.dayPressures)
                      : calculateAverage(day.nightPressures)}{" "}
                    hPa
                  </p>
                </div>
                <div className="flex  text-slate-400 items-center gap-3 ">
                  <HumidityIcon width={20} height={20} />

                  <p className="text-sm text-slate-500 font-semibold drop-shadow">
                    {day.dayHumidities.length > 0
                      ? calculateAverage(day.dayHumidities)
                      : calculateAverage(day.nightHumidities)}{" "}
                    %
                  </p>
                </div>
              </div>
              <div className="flex self-center text-sky-700 items-center gap-3 pt-3 mt-3 w-full justify-center border-t">
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
  );
};
export default WeatherForecast;
