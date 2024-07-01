import { GeocodingData } from "../../../types/types";
import { useRef, useState } from "react";
import Select from "../../../components/Select";
import Loader from "../../../components/Loader";
import { useGeocodingData } from "../../../hooks/api/useGeocodingData";
import MagnifyIcon from "../../../assets/icons/magnify.svg?react";
import TargetIcon from "../../../assets/icons/target.svg?react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectIsDarkMode } from "../../../slices/themeSlice";

interface WeatherFormProps {
  setSelectedLocation: (location: GeocodingData) => void;
}

const WeatherForm: React.FC<WeatherFormProps> = ({ setSelectedLocation }) => {
  const isDarkMode: boolean = useSelector(selectIsDarkMode);
  const [cityName, setCityName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    isFetching,
    data: locations,
    error: geocodingError,
  } = useGeocodingData(cityName.length > 2 ? cityName.trim() : null);

  //---Handling the input---

  const handleLocationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  const handleReset = (): void => {
    setCityName("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  //---Handling the Geolocation (Device location)---

  const handleLocation = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (navigator.geolocation) {
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
    alert(
      `Error obtaining location: ${error.message}. Please allow your browser to use geolocation. We use it only to serve proper weather data.`
    );
  };

  const getGeolocation = (position: GeolocationPosition) => {
    setSelectedLocation({
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      name: "Browser Location",
      country: "",
      state: "",
    });
  };

  //---Handling reset of the viewport---

  const resetViewport = () => {
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0"
      );
    }
  };

  //---Handling the Select---

  const handleSelect = (location: GeocodingData) => {
    setSelectedLocation(location);
    handleReset();
    resetViewport();
  };

  return (
    <>
      {geocodingError ? (
        <Select>
          <span className="text-sky-700 dark:text-sky-400 transition-colors font-bold">
            🚨 Error during fetching location data has occured:{" "}
          </span>
          <span className="text-sky-700 dark:text-sky-400 transition-colors font-normal">
            {geocodingError.message}
          </span>
        </Select>
      ) : null}
      <motion.form
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex justify-center items-center gap-4 w-full relative"
      >
        <label className="w-full">
          <div className="flex justify-end relative w-full">
            <div
              aria-hidden="true"
              className="absolute inset-y-0  start-2 flex items-center text-gray-400 ps-3.5 pointer-events-none"
            >
              <MagnifyIcon width={16} height={16} stroke="2" />
            </div>
            {(cityName.length >= 1 || isFetching) && !locations && (
              <>
                <div
                  aria-busy="true"
                  className="absolute inset-y-0 end-0 flex items-center  pe-14 pointer-events-none"
                >
                  <Loader
                    width="w-6"
                    height="h-6"
                    color={isDarkMode ? "text-sky-700" : "text-slate-300"}
                    element={isDarkMode ? "fill-sky-50" : "fill-sky-600"}
                  />
                </div>
                <span className="sr-only">Loading...</span>
              </>
            )}
            <button
              onClick={handleLocation}
              aria-label="Use my geolocation to get weather data"
              title="Use my location"
              className="absolute inset-y-0 end-5 flex items-center hover:cursor-pointer transition-all hover:scale-110 dark:hover:text-gray-100 hover:text-sky-600 text-gray-400 active:scale-75"
            >
              <TargetIcon width={20} height={20} />
            </button>
            <input
              ref={inputRef}
              type="text"
              value={cityName}
              aria-expanded="false"
              aria-label="Search for city."
              onChange={handleLocationInput}
              placeholder="Enter city name..."
              className="block w-full  px-4 py-3 sm:py-4 ps-14 text-sky-900 dark:text-slate-200 border transition-colors border-sky-200 dark:border-sky-700 shadow rounded-2xl bg-white dark:bg-sky-900 focus:ring-blue-500 focus:border-sky-600 placeholder:text-slate-400 dark:hover:bg-sky-950 hover:bg-sky-50 dark:hover:placeholder:text-slate-300 hover:placeholder:text-slate-500
        focus:outline-none "
            ></input>
          </div>
        </label>
        {locations && locations.length > 0 && cityName !== "" && (
          <nav
            aria-label="Location search results"
            aria-expanded="true"
            className="absolute top-full mt-1 w-full border border-slate-200 dark:border-slate-400 transition-colors rounded-2xl overflow-hidden shadow-lg z-10"
          >
            {locations.map((location: GeocodingData, index: number) => (
              <Select key={index} onClick={() => handleSelect(location)}>
                <span className="text-sky-700 dark:text-sky-400 transition-colors font-bold">
                  {location.name}
                </span>
                ,{" "}
                <span className="text-sky-700 dark:text-sky-400 transition-colors font-semibold">
                  <span className="text-slate-600 dark:text-slate-400 transition-colors font-normal text-xs">
                    Country:
                  </span>{" "}
                  {location.country}{" "}
                </span>
                <span className="text-slate-500 dark:text-slate-400 transition-colors font-normal text-xs">
                  ({location.state})
                </span>
              </Select>
            ))}
          </nav>
        )}
      </motion.form>
    </>
  );
};

export default WeatherForm;
