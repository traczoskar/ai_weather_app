import { useDispatch, useSelector } from "react-redux";
import { GeocodingData, GeocodingResponse } from "../../../types/types";
import {
  fetchGeoCoding,
  fetchWeather,
  selectError,
  selectGeoCodingData,
  selectStatus,
  selectWeatherData,
} from "../../../slices/apiDataSlice";
import { useState } from "react";
import Select from "../../../components/Select";

function WeatherForm() {
  const [cityName, setCityName] = useState<string>("");
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const weatherResponse = useSelector(selectWeatherData);
  const geocodingResponse = useSelector(selectGeoCodingData);
  const dispatch = useDispatch();

  const handleLocationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInput: string = e.target.value;
    setCityName(currentInput);
    if (currentInput.length > 2) {
      console.log("Input updated:", currentInput);
      const trimmedInput = currentInput.trim();
      dispatch(fetchGeoCoding(trimmedInput));
    } else {
      console.log("Location name is empty");
    }
  };

  const getGeocodingData = async () => {
    if (geocodingResponse) {
      const geocodingData: GeocodingResponse = {
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
      <div className="flex flex-col">
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
            value={cityName}
            onChange={handleLocationInput}
            placeholder="Enter city name..."
            className="input placeholder:text-neutral-400 hover:bg-neutral-600 hover:border-neutral-200
          hover:cursor-pointer focus:outline-none"
          ></input>
        </label>
        {geocodingResponse && geocodingResponse.length > 0 && (
          <div className="">
            {geocodingResponse.map((location: GeocodingData, index: number) => (
              <Select
                key={index}
                onClick={() =>
                  dispatch(
                    fetchWeather({ lat: location.lat, lon: location.lon })
                  )
                }
              >
                {location.name}, {location.country}, ({location.state})
              </Select>
            ))}
          </div>
        )}
      </div>

      <button
        disabled
        type="submit"
        className="btn  hover:bg-neutral-600 hover:border-neutral-200 disabled:opacity-20"
      >
        Get Weather
      </button>
    </form>
  );
}

export default WeatherForm;
