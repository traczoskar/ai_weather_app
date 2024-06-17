import TranspContainer from "../../../components/TranspContainer";
import { QueryData } from "../../../types/types";

interface WeatherForecastProps {
  forecastData: QueryData;
}

interface Forecast {
  list: Array<{
    dt: number;
    main: {
      temp: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }>;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecastData }) => {
  const processForecastData = (data: Forecast["list"]) => {
    const days: { [key: string]: any } = {};

    data?.forEach((entry) => {
      const date = new Date(entry.dt * 1000);
      const day = date.toISOString().split("T")[0];
      const isDaytime = entry.sys.pod === "d";

      if (!days[day]) {
        days[day] = {
          dayTemps: [],
          nightTemps: [],
          description: entry.weather[0].description,
          icon: entry.weather[0].icon,
          date: day,
        };
      }

      if (isDaytime) {
        days[day].dayTemps.push(entry.main.temp);
      } else {
        days[day].nightTemps.push(entry.main.temp);
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

  return (
    <TranspContainer>
      {forecastDays?.map((day, index) => (
        <div
          key={index}
          className="forecast-day p-4 m-2 border rounded-lg shadow-lg"
        >
          <h3 className="text-lg font-bold">
            {new Date(day.date).toLocaleDateString("en-EN", {
              weekday: "long",
            })}
          </h3>
          <p className="text-sm">{day.date}</p>
          <img
            src={`http://openweathermap.org/img/wn/${day.icon}.png`}
            alt={day.description}
            className="weather-icon"
          />
          <p className="text-sm">{day.description}</p>
          <p className="text-sm">
            Średnia temperatura dzienna: {calculateAverage(day.dayTemps)}°C
          </p>
          <p className="text-sm">
            Średnia temperatura nocna: {calculateAverage(day.nightTemps)}°C
          </p>
        </div>
      ))}
    </TranspContainer>
  );
};
export default WeatherForecast;
