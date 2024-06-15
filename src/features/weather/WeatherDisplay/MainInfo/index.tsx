import { GeocodingData, WeatherResponse } from "../../../../types/types";
import LocationIcon from "../../../../assets/icons/location.svg?react";
import CalendarIcon from "../../../../assets/icons/calendar.svg?react";
import { useCurrentDate } from "../../../../hooks/useCurrentDate";
import Clock from "../../../../components/Clock";
import {
  formatDescription,
  formatPrimaryTemp,
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
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-3xl text-sky-700">
        {selectedLocation?.name}
      </h2>
      <div className="flex items-center  text-slate-600">
        <LocationIcon width={45} height={45} />
        <h4 className="font-normal text-lg">{`${weather?.name}`}</h4>
      </div>
      <div className="flex items-center">
        <CalendarIcon width={45} height={45} />
        <h4 className="font-normal text-lg text-slate-600 tracking-wide">
          {currentDate}, {""}
          {weather ? <Clock timezone={weather.timezone} /> : null}
        </h4>
      </div>
      <p
        className="text-xl font-semibold
       text-sky-600"
      >
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

        <p className="text-6xl font-semibold">
          {weather ? formatPrimaryTemp(weather.main.temp) : null}°C
        </p>
      </div>
    </div>
  );
};

export default MainInfo;
