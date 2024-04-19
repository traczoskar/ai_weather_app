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

export default function App() {
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const weatherResponse = useSelector(selectWeatherData);
  const geocodingResponse = useSelector(selectGeoCodingData);
  const dispatch = useDispatch();

  const getGeocodingData = async () => {
    if (geocodingResponse) {
      const geocodingData: GeocodingData = {
        lat: geocodingResponse[0].lat,
        lon: geocodingResponse[0].lon,
      };
      console.log(geocodingData);
      return geocodingData;
    }
  };

  const handleFetchWeather = async () => {
    const geocodingData = await getGeocodingData();
    if (geocodingData) {
      dispatch(fetchWeather(geocodingData as any));
    }
  };

  return (
    <main>
      <header className="flex justify-center align-center mt-20">
        <h1 className="text-4xl font-bold">Weather App</h1>
      </header>

      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
          onClick={() => dispatch(fetchGeoCoding())}
        >
          Pobierz dane geolokalizacyjne
        </button>
        {status === "loading" && <p>Ładowanie...</p>}
        {status === "error" && <p>Wystąpił błąd: {error}</p>}
        {geocodingResponse && (
          <pre>{JSON.stringify(geocodingResponse[0], null, 2)}</pre>
        )}
      </div>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleFetchWeather}
        >
          Pobierz dane pogodowe
        </button>
        {status === "loading" && <p>Ładowanie...</p>}
        {status === "error" && <p>Wystąpił błąd: {error}</p>}
        {weatherResponse && (
          <pre>{JSON.stringify(weatherResponse, null, 2)}</pre>
        )}
      </div>
      <WeatherForm />
    </main>
  );
}
