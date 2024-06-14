import { WeatherResponse } from "../../../../types/types";
import {
  formatHoursMinutes,
  formatSecondaryTemp,
  formatWindSpeed,
} from "../../../../utils/dataFormatting";
import FeelsLikeIcon from "../../../../assets/icons/feather.svg?react";
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
    <div className="flex flex-col gap-10">
      {weather?.main.feels_like ? (
        <Detail
          icon={<FeelsLikeIcon width={27} height={27} />}
          width="w-auto"
          textSize="text-xl"
          title="Feels like:"
          data={`${formatSecondaryTemp(weather.main.feels_like)}°C`}
        />
      ) : null}
      <div className="grid grid-cols-2 gap-x-20 gap-y-4">
        {weather?.main.temp_max ? (
          <Detail
            icon={<ArrowUpIcon width={22} height={22} />}
            title="Max:"
            data={`${formatSecondaryTemp(weather?.main.temp_max)}°C`}
          />
        ) : null}
        {weather?.main.temp_min ? (
          <Detail
            icon={<ArrowDownIcon width={22} height={22} />}
            title="Min:"
            data={`${formatSecondaryTemp(weather?.main.temp_min)}°C`}
          />
        ) : null}
        <Detail
          icon={<HumidityIcon width={22} height={22} />}
          title="Humidity:"
          data={`${weather?.main.humidity} %`}
        />
        <Detail
          icon={<PressureIcon width={22} height={22} />}
          title="Pressure:"
          data={`${weather?.main.pressure} hPa`}
        />
        {weather?.wind.speed ? (
          <Detail
            icon={<WindIcon width={22} height={22} />}
            title="Wind:"
            data={`${formatWindSpeed(weather?.wind.speed)} km/h`}
          />
        ) : null}
        <Detail
          icon={<CloudinessIcon width={22} height={22} />}
          title="Cloudiness:"
          data={weather?.clouds.all + " %"}
        />
        {weather?.visibility ? (
          <Detail
            icon={<VisibilityIcon width={22} height={22} />}
            title="Visibility:"
            data={
              weather?.visibility >= 10000
                ? "Unlimited"
                : weather.visibility + " m"
            }
          />
        ) : null}
      </div>
      <div className="grid grid-cols-2 gap-x-8 ">
        {weather?.sys.sunrise ? (
          <Detail
            textSize="text-xl"
            icon={<SunRiseIcon width={27} height={27} />}
            title="Sunrise:"
            data={formatHoursMinutes(weather.sys.sunrise)}
          />
        ) : null}
        {weather?.sys.sunset ? (
          <Detail
            textSize="text-xl"
            icon={<SunSetIcon width={27} height={27} />}
            title="Sunset:"
            data={formatHoursMinutes(weather.sys.sunset)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default DetailedInfo;
