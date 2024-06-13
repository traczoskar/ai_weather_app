import { WeatherResponse } from "../../../../types/types";
import {
  formatTemperature,
  formatTime,
} from "../../../../utils/dataFormatting";
import ArrowUpIcon from "../../../../assets/icons/arrow-up.svg?react";
import ArrowDownIcon from "../../../../assets/icons/arrow-down.svg?react";
import HumidityIcon from "../../../../assets/icons/drop.svg?react";
import PressureIcon from "../../../../assets/icons/barometer.svg?react";
import VisibilityIcon from "../../../../assets/icons/binoculars.svg?react";
import WindIcon from "../../../../assets/icons/wind.svg?react";
import CloudinessIcon from "../../../../assets/icons/cloud.svg?react";
import SunRiseIcon from "../../../../assets/icons/sunrise.svg?react";
import SunSetIcon from "../../../../assets/icons/sunset.svg?react";
import Detail from "./Detail";

interface DetailedInfoProps {
  weather: WeatherResponse | null;
}

const DetailedInfo: React.FC<DetailedInfoProps> = ({ weather }) => {
  return (
    <div className="flex flex-col gap-8">
      {weather?.main.feels_like ? (
        <Detail
          title="Feels like:"
          data={`${formatTemperature(weather.main.feels_like)}°C`}
        />
      ) : null}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <Detail
          icon={<ArrowUpIcon />}
          title="Max:"
          data={`${weather?.main.temp_max}°C`}
        />
        <Detail
          icon={<ArrowDownIcon />}
          title="Min:"
          data={`${weather?.main.temp_min}°C`}
        />
        <Detail
          icon={<HumidityIcon />}
          title="Humidity:"
          data={`${weather?.main.humidity} %`}
        />
        <Detail
          icon={<PressureIcon />}
          title="Pressure:"
          data={`${weather?.main.pressure} hPa`}
        />
        <Detail
          icon={<WindIcon />}
          title="Wind:"
          data={`${weather?.wind.speed} m/s`}
        />
        <Detail
          icon={<CloudinessIcon />}
          title="Cloudiness:"
          data={weather?.clouds.all + " %"}
        />
        <Detail
          icon={<VisibilityIcon />}
          title="Visibility:"
          data={weather?.visibility + " m"}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {weather?.sys.sunrise ? (
          <Detail
            icon={<SunRiseIcon />}
            title="Sunrise:"
            data={formatTime(weather.sys.sunrise)}
          />
        ) : null}
        {weather?.sys.sunset ? (
          <Detail
            icon={<SunSetIcon />}
            title="Sunset:"
            data={formatTime(weather.sys.sunset)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default DetailedInfo;
