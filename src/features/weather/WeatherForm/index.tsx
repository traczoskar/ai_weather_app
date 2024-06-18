import { GeocodingData } from "../../../types/types";
import { useEffect, useRef, useState } from "react";
import Select from "../../../components/Select";
import Loader from "../../../components/Loader";
import { useGeocodingData } from "../../../hooks/api/useGeocodingData";
import MagnifyIcon from "../../../assets/icons/magnify.svg?react";
import TargetIcon from "../../../assets/icons/target.svg?react";

interface WeatherFormProps {
  setSelectedLocation: (location: GeocodingData) => void;
}

const WeatherForm: React.FC<WeatherFormProps> = ({ setSelectedLocation }) => {
  const [cityName, setCityName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { isFetching, data: locations } = useGeocodingData(
    cityName.length > 2 ? cityName.trim() : null
  );

  useEffect(() => {
    console.log("Locations: ", locations);
  }, [locations]);

  const handleLocationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  const handleReset = (): void => {
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
    setSelectedLocation({
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      name: "Browser Location",
      country: "",
      state: "",
    });
  };

  return (
    <>
      <form className="flex justify-center items-center gap-4 relative">
        {/* {isFetching && <Loader borderColor="border-gray-600" />} */}

        <label className="w-full">
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center text-gray-600 ps-3.5 pointer-events-none">
              <MagnifyIcon width={16} height={16} stroke="2" />
            </div>
            {(cityName.length >= 1 || isFetching) && !locations && (
              <div className="absolute inset-y-0 end-0 flex items-center  pe-14 pointer-events-none">
                <Loader width="w-6" height="h-6" color="text-slate-300" />
              </div>
            )}
            <div
              onClick={handleLocation}
              className="absolute inset-y-0 end-4 flex items-center  hover:cursor-pointer text-gray-600"
            >
              <TargetIcon width={20} height={20} />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={cityName}
              onChange={handleLocationInput}
              placeholder="Enter city name..."
              className="block w-96 max-w-3xl p-4 ps-10 text-sm  border border-sky-200 rounded-xl bg-white  focus:ring-blue-500 focus:border-sky-600 placeholder:text-slate-400 hover:bg-sky-50 hover:placeholder:text-sky-700
        focus:outline-none "
            ></input>
          </div>
        </label>

        {locations && locations.length > 0 && cityName !== "" && (
          <div className="absolute top-full mt-1 w-full max-w-3xl bg-white border border-slate-200 rounded 3xl shadow-lg z-10">
            {locations.map((location: GeocodingData, index: number) => (
              <Select
                key={index}
                onClick={() => {
                  setSelectedLocation(location);
                  handleReset();
                }}
              >
                <span className="text-sky-700 font-bold">{location.name}</span>,{" "}
                <span className="text-sky-700 font-semibold">
                  <span className="text-slate-600 font-normal text-xs">
                    Country:
                  </span>{" "}
                  {location.country}{" "}
                </span>
                <span className="text-slate-500 font-normal text-xs">
                  ({location.state})
                </span>
              </Select>
            ))}
          </div>
        )}
      </form>
    </>
  );
};

export default WeatherForm;
