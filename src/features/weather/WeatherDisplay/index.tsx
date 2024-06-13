import Lottie from "react-lottie";
import TranspContainer from "../../../components/TranspContainer";
import {
  formatDescription,
  formatTemperature,
} from "../../../utils/dataFormatting";
import { getWeatherAnimation } from "../../../utils/getWeatherAnimation";
import { useCurrentDate } from "../../../hooks/useCurrentDate";
import Loader from "../../../components/Loader";
import Clock from "../../../components/Clock";
import { AiData, GeocodingData, WeatherResponse } from "../../../types/types";
import BarometerIcon from "../../../assets/icons/barometer.svg?react";
import LocationIcon from "../../../assets/icons/location.svg?react";
import CalendarIcon from "../../../assets/icons/calendar.svg?react";
import StarsIcon from "../../../assets/icons/stars.svg?react";
import DetailedInfo from "./DetailedInfo";
import Button from "../../../components/Button";

interface WeatherDisplayProps {
  selectedLocation: GeocodingData | null;
  weatherData: {
    isPending: boolean;
    isWeatherFetching: boolean;
    data: WeatherResponse | null;
    error: Error | null;
  };
  aiRequest: () => void;
  aiData: AiData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  selectedLocation,
  weatherData,
  aiRequest,
  aiData,
}) => {
  const defaultOptions = (animationData: string) => ({
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  });
  const { isPending, isWeatherFetching, data, error } = weatherData;
  const { isPending: isAILoading } = aiData;
  const currentDate = useCurrentDate();

  return (
    <>
      {!isPending && (
        <section className="flex w-full">
          <TranspContainer>
            {isWeatherFetching && (
              <div>
                Loading ... <Loader borderColor="black" />
              </div>
            )}
            {error && <h3>{error.message}</h3>}
            {!isPending && (
              <div className="flex w-full">
                <article className="flex ">
                  <div className="flex gap-24 justify-between w-full">
                    <div>
                      <h3 className="font-semibold text-xl">Now</h3>
                      <div className="flex items-center my-2">
                        <LocationIcon width={40} height={40} />
                        <h4 className="font-normal text-md text-gray-800">
                          {`${selectedLocation?.name}, ${data?.name}`}
                        </h4>
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon />
                        <h4 className="font-normal text-md text-gray-600">
                          {currentDate}, {""}
                          {data ? <Clock timezone={data.timezone} /> : null}
                        </h4>
                      </div>

                      <p className="text-lg font-light py-2">
                        {data
                          ? formatDescription(data.weather[0].description)
                          : null}
                      </p>
                      <div className="flex items-center justify-center gap-4">
                        {data ? (
                          <Lottie
                            options={defaultOptions(
                              getWeatherAnimation(data.weather[0].main)
                            )}
                            height={120}
                            width={120}
                          />
                        ) : null}

                        <p className="text-6xl font-semibold py-2">
                          {data ? formatTemperature(data.main.temp) : null}°C
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex self-end gap-4 items-center absolute translate-x-9 -translate-y-4">
                        {isAILoading ? (
                          <div className="flex text-sky-700 text-sm font-light gap-4">
                            Waiting for AI response...
                            <Loader borderColor="border-sky-700" />
                          </div>
                        ) : (
                          <Button onClick={aiRequest} icon={<StarsIcon />}>
                            Ask AI for advice
                          </Button>
                        )}
                      </div>
                      <DetailedInfo weather={data} />
                    </div>
                  </div>
                </article>
              </div>
            )}
          </TranspContainer>
        </section>
      )}
    </>
  );
};

export default WeatherDisplay;

{
  /* <div>
        <Lottie options={defaultOptions} height={50} width={50} />
      </div> */
}
