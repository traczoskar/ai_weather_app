import TranspContainer from "../../../components/TranspContainer";
import Loader from "../../../components/Loader";
import { GeocodingData, QueryData } from "../../../types/types";
import StarsIcon from "../../../assets/icons/stars.svg?react";
import DetailedInfo from "./DetailedInfo";
import Button from "../../../components/Button";
import MainInfo from "./MainInfo";
import AirPollutionInfo from "./AirPollutionInfo";

interface WeatherDisplayProps {
  selectedLocation: GeocodingData | null;
  weatherData: QueryData;
  nightTemp: number | null;
  aiRequest: () => void;
  airPollutionData: QueryData;
  aiData: QueryData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  selectedLocation,
  weatherData,
  nightTemp,
  aiRequest,
  airPollutionData,
  aiData,
}) => {
  const {
    isPending: isWeatherPending,
    isFetching: isWeatherFetching,
    data: weather,
    error,
  } = weatherData;
  const { isPending: isAILoading } = aiData;

  return (
    <>
      {isWeatherFetching && (
        <div className="absolute top-3 left-3">
          Loading ... <Loader />
        </div>
      )}
      {!isWeatherPending && (
        <section className="flex w-full">
          <TranspContainer>
            {error && <h3>{error.message}</h3>}
            {!isWeatherPending && (
              <div className="flex w-full">
                <article className="flex w-full flex-col gap-4">
                  <div className="flex justify-between w-full flex-col lg:flex-row">
                    <MainInfo
                      weather={weather}
                      selectedLocation={selectedLocation}
                    />
                    <div className="lg:w-px bg-slate-300 dark:bg-slate-400 h-px lg:h-full w-full " />
                    <div className="flex flex-col">
                      <div className="flex self-end gap-4 items-center absolute translate-x-3 -translate-y-3">
                        {/* {isAILoading ? (
                          <div className="flex text-sky-700 text-sm font-light gap-4">
                            Waiting for AI response...
                            <Loader />
                          </div>
                        ) : (
                          <Button onClick={aiRequest} icon={<StarsIcon />}>
                            Ask AI for advice
                          </Button>
                        )} */}
                      </div>
                      <DetailedInfo weather={weather} nightTemp={nightTemp} />
                    </div>
                  </div>
                  <AirPollutionInfo airPollutionData={airPollutionData} />
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
