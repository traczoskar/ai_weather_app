import { useDispatch, useSelector } from "react-redux";
import { GeocodingData } from "../../../types/types";
import {
  fetchWeather,
  selectError,
  selectGeoCodingData,
  selectStatus,
  selectWeatherData,
} from "../../../slices/apiDataSlice";

function WeatherForm() {
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
    <form className="flex justify-center align-center">
      <label className="relative block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Enter city name..."
          className="input placeholder:text-neutral-400 hover:bg-neutral-600 hover:border-neutral-200
          hover:cursor-pointer focus:outline-none"
        ></input>
      </label>
      <button
        type="submit"
        className="btn  hover:bg-neutral-600 hover:border-neutral-200"
      >
        Get Weather
      </button>
    </form>
  );
}

export default WeatherForm;
