import { useSelector } from "react-redux";
import {
  selectError,
  selectGeoCodingData,
  selectStatus,
  selectWeatherData,
} from "../../../slices/apiDataSlice";
import Lottie from "react-lottie";
import rainy_cloud from "../../../assets/animations/rainy_cloud.json";

function WeatherDisplay() {
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const weatherResponse = useSelector(selectWeatherData);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: rainy_cloud, // wcześniej zaimportowane dane animacji
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <section className="flex justify-center mt-10">
      <h2>Weather Display</h2>
      <div>
        <Lottie options={defaultOptions} height={50} width={50} />
      </div>
    </section>
  );
}

export default WeatherDisplay;
