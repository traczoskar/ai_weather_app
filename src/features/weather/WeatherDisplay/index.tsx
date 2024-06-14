import TranspContainer from "../../../components/TranspContainer";
import Loader from "../../../components/Loader";
import { AiData, GeocodingData, WeatherResponse } from "../../../types/types";
import StarsIcon from "../../../assets/icons/stars.svg?react";
import DetailedInfo from "./DetailedInfo";
import Button from "../../../components/Button";
import MainInfo from "./MainInfo";

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
  const { isPending, isWeatherFetching, data, error } = weatherData;
  const { isPending: isAILoading } = aiData;

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
                    <MainInfo
                      weather={data}
                      selectedLocation={selectedLocation}
                    />
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
