import { useSelector } from "react-redux";
import {
  selectError,
  selectGeoCodingData,
  selectStatus,
  selectWeatherData,
} from "../../../slices/apiDataSlice";

function WeatherDisplay() {
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const weatherResponse = useSelector(selectWeatherData);
  const geocodingResponse = useSelector(selectGeoCodingData);

  return (
    <section className="flex justify-center align-center">
      <h2>Weather Display</h2>
    </section>
  );
}

export default WeatherDisplay;
