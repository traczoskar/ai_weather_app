import { useSelector } from "react-redux";
import {
  selectError,
  selectStatus,
  selectWeatherData,
} from "../../../slices/apiDataSlice";
import Lottie from "react-lottie";
import rainy_cloud from "../../../assets/animations/rainy_cloud.json";
import TranspContainer from "../../../components/TranspContainer";
import {
  formatDescription,
  formatTemperature,
} from "../../../utils/dataFormattingFunc";
import { getWeatherAnimation } from "../../../utils/getWeatherAnimation";

function WeatherDisplay() {
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const weatherResponse = useSelector(selectWeatherData);
  const defaultOptions = (animationData) => ({
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  });

  return (
    <section className="flex justify-center mt-10">
      <TranspContainer>
        {status === "loading" && <h3>Loading...</h3>}
        {status === "failed" && <h3>{error}</h3>}
        {status === "success" && (
          <article className="w-80 h-80 flex flex-col">
            {weatherResponse && (
              // dodać ikonkę lokalizacji oraz datę, dopasować układ i rozmiary kontenera,
              // zacząć robić integrację z AI
              <>
                <h3 className="font-normal text-lg">W tej chwili</h3>
                <h4 className="font-bold text-3xl">{weatherResponse.name}</h4>
                <p className="text-lg font-light py-2">
                  {formatDescription(weatherResponse.weather[0].description)}
                </p>
                <p className="text-6xl font-semibold py-2">
                  {formatTemperature(weatherResponse.main.temp)}°C
                </p>
                <div>
                  <Lottie
                    options={defaultOptions(
                      getWeatherAnimation(weatherResponse.weather[0].main)
                    )}
                    height={100}
                    width={100}
                  />
                </div>
                <p className="text-lg py-1">
                  Odczuwalne:{" "}
                  <span className="ml-2 text-xl font-semibold">
                    {formatTemperature(weatherResponse.main.feels_like)}°C
                  </span>
                </p>
                <p className="text-lg py-1">
                  Wilgotność:{" "}
                  <span className="ml-2 text-xl font-semibold">
                    {weatherResponse.main.humidity}%
                  </span>
                </p>
              </>
            )}
          </article>
        )}
      </TranspContainer>
    </section>
  );
}

export default WeatherDisplay;

{
  /* <div>
        <Lottie options={defaultOptions} height={50} width={50} />
      </div> */
}
