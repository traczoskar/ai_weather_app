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

  const animationData = weather
    ? getWeatherAnimation(weather.weather[0].main)
    : null;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-3xl drop-shadow text-sky-700">
        {selectedLocation?.name}
      </h2>
      <div className="flex items-center gap-3 text-slate-500">
        <LocationIcon width={28} height={28} />
        <h4 className="font-normal text-lg">
          {weather?.name}
          {selectedLocation?.country ? `, ${selectedLocation.country}` : null}
        </h4>
      </div>
      <div className="flex items-center gap-3  text-slate-500">
        <CalendarIcon width={28} height={28} />
        <h4 className="font-normal text-lg tracking-wide">
          {currentDate}, {""}
          {weather ? <Clock timezone={weather.timezone} /> : null}
        </h4>
      </div>
      <p
        className="text-xl font-semibold
       text-sky-600 pt-2"
      >
        {weather ? formatDescription(weather.weather[0].description) : null}
      </p>
      <div className="flex items-center justify-center pb-2 gap-4">
        {weather && animationData ? (
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: "150px", height: "150px" }}
          />
        ) : null}

        <p className="text-6xl font-semibold text-sky-900 drop-shadow-md">
          {weather ? formatPrimaryTemp(weather.main.temp) : null}°C
        </p>
      </div>
    </div>
  );
};

export default MainInfo;
