import { useDispatch, useSelector } from "react-redux";
import { GeocodingData } from "../../../types/types";
import {
  fetchGeoCoding,
  selectGeoCodingData,
  selectStatus,
} from "../../../slices/apiDataSlice";
import { useRef, useState } from "react";
import Select from "../../../components/Select";
import Loader from "../../../components/Loader";
import { useGeocodingData } from "../../../api/useGeocodingData";

interface WeatherFormProps {
  updateLocation: (location: GeocodingData) => void;
}

interface GeocodingState {
  isPending: boolean;
  data: GeocodingData[] | null;
  error: Error | null;
}

const WeatherForm: React.FC<WeatherFormProps> = ({ updateLocation }) => {
  const [cityName, setCityName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const status = useSelector(selectStatus);
  // const geocodingResponse = useSelector(selectGeoCodingData);
  // const dispatch = useDispatch();

  const {
    isFetching,
    data: locations,
    error,
  } = useGeocodingData(cityName.length > 2 ? cityName.trim() : null);

  const handleLocationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  const handleReset = () => {
    setCityName("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleLocation = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (navigator.geolocation) {
      console.log("Geolocation is available");
      navigator.geolocation.getCurrentPosition(
        getGeolocation,
        handleGeolocationError
      );
    } else {
      alert("Sorry, geolocation is not supported by this browser.");
    }
  };

  const handleGeolocationError = (error: GeolocationPositionError) => {
    console.error("Error obtaining location: ", error.message);
    alert(`Error obtaining location: ${error.message}`);
  };

  const getGeolocation = (position: GeolocationPosition) => {
    updateLocation({
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      name: "Current Location",
      country: "",
      state: "",
    });
  };

  return (
    <>
      <form className="flex justify-center items-center gap-4">
        <label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4  text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <div
              onClick={handleLocation}
              className="absolute inset-y-0 end-2 flex items-center ps-3 hover:cursor-pointer"
            >
              <svg
                className="w-5 h-5 text-gray-600"
                aria-hidden="true"
                id="fi_2136283"
                height="512"
                viewBox="0 0 512 512"
                width="512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="m497 241h-19.939c-3.556-53.537-26.094-103.381-64.386-141.675-38.294-38.293-88.138-60.831-141.675-64.386v-19.939c0-8.284-6.716-15-15-15s-15 6.716-15 15v19.939c-53.537 3.556-103.381 26.093-141.675 64.387-38.293 38.293-60.831 88.137-64.386 141.674h-19.939c-8.284 0-15 6.716-15 15s6.716 15 15 15h19.939c3.556 53.537 26.094 103.381 64.386 141.674 38.294 38.294 88.138 60.831 141.675 64.387v19.939c0 8.284 6.716 15 15 15s15-6.716 15-15v-19.939c53.537-3.556 103.381-26.093 141.675-64.387 38.293-38.293 60.831-88.138 64.386-141.674h19.939c8.284 0 15-6.716 15-15s-6.716-15-15-15zm-226 205.986v-18.844c0-8.284-6.716-15-15-15s-15 6.716-15 15v18.844c-93.698-7.291-168.695-82.288-175.986-175.986h18.844c8.284 0 15-6.716 15-15s-6.716-15-15-15h-18.844c7.291-93.698 82.288-168.695 175.986-175.986v18.843c0 8.284 6.716 15 15 15s15-6.716 15-15v-18.843c93.698 7.291 168.695 82.288 175.986 175.986h-18.844c-8.284 0-15 6.716-15 15s6.716 15 15 15h18.844c-7.291 93.698-82.288 168.695-175.986 175.986z"
                ></path>
                <path
                  fill="currentColor"
                  d="m256 181.324c-41.177 0-74.676 33.5-74.676 74.676s33.499 74.676 74.676 74.676 74.676-33.5 74.676-74.676-33.499-74.676-74.676-74.676zm0 119.352c-24.635 0-44.676-20.042-44.676-44.676s20.041-44.676 44.676-44.676 44.676 20.042 44.676 44.676-20.041 44.676-44.676 44.676z"
                ></path>
              </svg>
            </div>
            <input
              ref={inputRef}
              type="text"
              value={cityName}
              onChange={handleLocationInput}
              placeholder="Enter city name..."
              className="block w-96 max-w-3xl p-4 ps-10 text-sm  border border-sky-300 rounded-lg bg-white  focus:ring-blue-500 focus:border-sky-500 placeholder:text-gray-400 hover:bg-gray-100 
        focus:outline-none w-200"
            ></input>
          </div>
        </label>

        {locations && locations.length > 0 && cityName !== "" && (
          <div className="absolute">
            {locations.map((location: GeocodingData, index: number) => (
              <Select
                key={index}
                onClick={() => {
                  updateLocation(location);
                  handleReset();
                }}
              >
                {location.name}, {location.country}, ({location.state})
              </Select>
            ))}
          </div>
        )}
        {isFetching && <Loader borderColor="border-gray-600" />}
      </form>
    </>
  );
};

export default WeatherForm;
