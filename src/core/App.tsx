import { useDispatch, useSelector } from "react-redux";
import {
  fetchGeoCoding,
  fetchWeather,
  selectError,
  selectGeoCodingData,
  selectStatus,
  selectWeatherData,
} from "../slices/apiDataSlice";
import WeatherForm from "../features/weather/WeatherForm";
import { GeocodingData } from "../types/types";
import WeatherDisplay from "../features/weather/WeatherDisplay";

export default function App() {
  return (
    <main>
      <header className="flex justify-center align-center mt-20">
        <h1 className="text-4xl font-bold">Weather App</h1>
      </header>
      <WeatherForm />
      <WeatherDisplay />
    </main>
  );
}
