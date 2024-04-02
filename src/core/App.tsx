import { useDispatch, useSelector } from "react-redux";
import {
  fetchGeoCoding,
  fetchWeather,
  selectError,
  selectGeoCodingData,
  selectStatus,
  selectWeatherData,
} from "./apiDataSlice";
import { getGeocoding } from "../utils/getGeocoding";

interface GeocodingData {
  lat: number;
  lon: number;
}

export default function App() {
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const weatherResponse = useSelector(selectWeatherData);
  const geocodingResponse = useSelector(selectGeoCodingData);
  const dispatch = useDispatch();

  const getGeocodingData = async () => {
    if (geocodingResponse) {
      const geocodingData: GeocodingData = {
        lat: geocodingResponse[0].lat.toFixed(2),
        lon: geocodingResponse[0].lon.toFixed(2),
      };
      console.log(geocodingData);
      return geocodingData;
    }
  };

  return (
    <>
      <h1 className="text-3xl">Hello world!</h1>
      <div>
        <button onClick={() => dispatch(fetchGeoCoding())}>
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
          onClick={() => dispatch(fetchWeather(getGeocodingData() as any))}
        >
          Pobierz dane pogodowe
        </button>
        {status === "loading" && <p>Ładowanie...</p>}
        {status === "error" && <p>Wystąpił błąd: {error}</p>}
        {weatherResponse && (
          <pre>{JSON.stringify(weatherResponse, null, 2)}</pre>
        )}
      </div>
    </>
  );
}
