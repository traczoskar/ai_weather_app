import { GeocodingData, WeatherResponse } from "../../../../types/types";
import LocationIcon from "../../../../assets/icons/location.svg?react";
import CalendarIcon from "../../../../assets/icons/calendar.svg?react";
import { useCurrentDate } from "../../../../hooks/useCurrentDate";
import Clock from "../../../../components/Clock";
import {
  formatDescription,
  formatTemperature,
} from "../../../../utils/dataFormatting";
import Lottie from "react-lottie";
import { getWeatherAnimation } from "../../../../utils/getWeatherAnimation";

interface MainInfoProps {
  weather: WeatherResponse | null;
  selectedLocation: GeocodingData | null;
}

const MainInfo: React.FC<MainInfoProps> = ({ weather, selectedLocation }) => {
  const currentDate = useCurrentDate();
  const defaultOptions = (animationData: string) => ({
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  });

  return (
    <div>
      <h3 className="font-semibold text-xl">Now</h3>
      <div className="flex items-center my-2">
        <LocationIcon width={40} height={40} />
        <h4 className="font-normal text-md text-gray-800">
          {`${selectedLocation?.name}, ${weather?.name}`}
        </h4>
      </div>
      <div className="flex items-center">
        <CalendarIcon />
        <h4 className="font-normal text-md text-gray-600">
          {currentDate}, {""}
          {weather ? <Clock timezone={weather.timezone} /> : null}
        </h4>
      </div>

      <p className="text-lg font-light py-2">
        {weather ? formatDescription(weather.weather[0].description) : null}
      </p>
      <div className="flex items-center justify-center gap-4">
        {weather ? (
          <Lottie
            options={defaultOptions(
              getWeatherAnimation(weather.weather[0].main)
            )}
            height={120}
            width={120}
          />
        ) : null}

        <p className="text-6xl font-semibold py-2">
          {weather ? formatTemperature(weather.main.temp) : null}°C
        </p>
      </div>
    </div>
  );
};

export default MainInfo;
