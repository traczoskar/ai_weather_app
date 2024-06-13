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
              <div className="flex justify-between gap-12">
                <article className="flex flex-col">
                  <div className="flex gap-12">
                    <div>
                      <h3 className="font-semibold text-xl">Now</h3>
                      <div className="flex items-center my-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="currentColor"
                          className="w-5 h-5 mr-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                          />
                        </svg>
                        <h4 className="font-normal text-md text-gray-800">
                          {`${selectedLocation?.name}, ${data?.name}`}
                        </h4>
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="currentColor"
                          className="w-5 h-5 mr-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                          />
                        </svg>
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
                    <div>
                      <p className="text-lg py-1">
                        Odczuwalne:{" "}
                        <span className="ml-2 text-xl font-semibold">
                          {data
                            ? formatTemperature(data.main.feels_like)
                            : null}
                          °C
                        </span>
                      </p>
                      <p className="text-lg py-1">
                        Wilgotność:{" "}
                        <span className="ml-2 text-xl font-semibold">
                          {data?.main.humidity}%
                        </span>
                      </p>
                    </div>
                  </div>
                </article>
                <div className="flex flex-col gap-8">
                  <button
                    onClick={aiRequest}
                    className="flex gap-2 hover:cursor-pointer hover:bg-gray-700 active:bg-gray-500 bg-gray-600 px-3 py-2 rounded-lg items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="gold"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                      />
                    </svg>
                    <h4 className="text-gray-300 text-md font-normal">
                      Ask AI for advice
                    </h4>
                  </button>
                  {isAILoading && (
                    <p className="text-gray-800 text-md font-light">
                      Waiting for AI response...
                      <Loader borderColor="gray" />
                    </p>
                  )}
                </div>
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
