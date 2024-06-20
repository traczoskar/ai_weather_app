import WeatherDisplay from "../features/weather/WeatherDisplay";
import Header from "../components/Header";
import { useWeatherData } from "../hooks/api/useWeatherData";
import { useEffect, useState } from "react";
import { GeocodingData } from "../types/types";
import { useAirPollutionData } from "../hooks/api/useAirPollutionData";
import { useForecastData } from "../hooks/api/useForecastData";
import WeatherForecast from "../features/weather/WeatherForecast";
import InfoDisplay from "../features/info/InfoDisplay";
import Footer from "../components/Footer";

const App: React.FC = () => {
  //---Geocoding Hooks---

  const [selectedLocation, setSelectedLocation] =
    useState<GeocodingData | null>(null);

  //---Weather Hooks---

  const weatherData = useWeatherData(
    selectedLocation?.lat || null,
    selectedLocation?.lon || null
  );

  const [nightTemp, setNightTemp] = useState<number | null>(null);

  //---Forecast Hooks---

  const forecastData = useForecastData(
    selectedLocation?.lat || null,
    selectedLocation?.lon || null
  );

  useEffect(() => {
    console.log("Forecast Data: ", forecastData.data);
  }, [forecastData.data]);

  //---Air Pollution Hooks---

  const airPollutionData = useAirPollutionData(
    selectedLocation?.lat || null,
    selectedLocation?.lon || null
  );

  // //---AI Hooks---

  // const [aiData, setAiData] = useState<QueryData>({
  //   isPending: false,
  //   data: null,
  //   error: null,
  // });

  // const prompt = usePromptDataBase(weatherData);

  // const { refetch, isFetching: isAIFetching } = useAIResponse(
  //   prompt.systemMessage,
  //   prompt.userMessage
  // );

  // useEffect(() => {
  //   setAiData((prev) => ({
  //     ...prev,
  //     isPending: isAIFetching,
  //   }));
  // }, [isAIFetching]);

  // //---AI Request Function---

  // const getWeatherAdvice = async () => {
  //   setAiData((prev) => ({
  //     ...prev,
  //     isPending: true,
  //   }));
  //   try {
  //     const { data: aiResponse, error: aiError } = await refetch();
  //     setAiData({
  //       isPending: false,
  //       data: aiResponse,
  //       error: aiError,
  //     });
  //   } catch (error) {
  //     setAiData({
  //       isPending: false,
  //       data: null,
  //       error: error,
  //     });
  //   }
  // };

  //---Description Modal---

  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

  const handleInfoClose = () => {
    setIsInfoOpen(false);
  };

  const handleInfoOpen = () => {
    setIsInfoOpen(true);
  };

  useEffect(() => {
    if (isInfoOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isInfoOpen]);

  return (
    <main
      className={`flex flex-col items-center gap-8 pt-6 ${
        weatherData.data ? "pb-20" : "pb-6"
      }`}
    >
      <Header
        title="WeatherWise.ai"
        openInfo={handleInfoOpen}
        setSelectedLocation={setSelectedLocation}
      />
      <InfoDisplay isInfoOpen={isInfoOpen} closeInfo={handleInfoClose} />
      <div className="flex flex-col items-center gap-8 w-full relative">
        <WeatherDisplay
          selectedLocation={selectedLocation}
          weatherData={weatherData}
          nightTemp={nightTemp}
          airPollutionData={airPollutionData}
        />
        {/* <SuggestionDisplay
          weatherData={weatherData}
          aiData={aiData}
          aiRequest={getWeatherAdvice}
          selectedLocation={selectedLocation}
        /> */}
        <WeatherForecast
          forecastData={forecastData}
          setNightTemp={setNightTemp}
        />
      </div>
      <Footer />
    </main>
  );
};

export default App;
