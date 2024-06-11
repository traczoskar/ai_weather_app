import WeatherDisplay from "../features/weather/WeatherDisplay";
import Header from "../components/Header";
import SuggestionDisplay from "../features/suggestions/SuggestionDisplay";

import { useWeatherData } from "../api/useWeatherData";
import { useEffect, useState } from "react";
import { GeocodingData } from "../types/types";

const App = () => {
  const [selectedLocation, setSelectedLocation] =
    useState<GeocodingData | null>(null);

  const { isPending, data, error } = useWeatherData(
    selectedLocation?.lat || null,
    selectedLocation?.lon || null
  );

  useEffect(() => {
    console.log("isPending: ", isPending);
    console.log("data: ", data);
    console.log("error: ", error);
  }, [isPending, data, error]);

  return (
    <main className="flex flex-col items-center gap-8">
      <Header
        title="WeatherWise.ai"
        updateLocation={setSelectedLocation}
        weatherData={{ isPending, data, error }}
      />

      <div className="flex flex-col items-center gap-8 w-full">
        <SuggestionDisplay />
        <WeatherDisplay weatherData={{ isPending, data, error }} />
      </div>
    </main>
  );
};

export default App;
