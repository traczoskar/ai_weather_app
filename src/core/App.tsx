import WeatherDisplay from "../features/weather/WeatherDisplay";
import Header from "../components/Header";
import SuggestionDisplay from "../features/suggestions/SuggestionDisplay";

import { useWeatherData } from "../api/useWeatherData";
import { useEffect, useState } from "react";
import { AiData, GeocodingData } from "../types/types";
import { usePromptDataBase } from "../openAI/usePromptDataBase";
import { useAIResponse } from "../openAI/useAIResponse";

const App: React.FC = () => {
  //---Geocoding Hooks---

  const [selectedLocation, setSelectedLocation] =
    useState<GeocodingData | null>(null);

  //---Weather Hooks---

  const {
    isPending,
    isFetching: isWeatherFetching,
    data,
    error,
  } = useWeatherData(
    selectedLocation?.lat || null,
    selectedLocation?.lon || null
  );

  useEffect(() => {
    console.log("isPending: ", isPending);
    console.log("data: ", data);
    console.log("error: ", error);
  }, [isPending, data, error]);

  //---AI Hooks---

  const [aiData, setAiData] = useState<AiData>({
    isPending: false,
    data: null,
    error: null,
  });

  const prompt = usePromptDataBase(data);

  const { refetch, isFetching: isAIFetching } = useAIResponse(
    prompt.systemMessage,
    prompt.userMessage
  );

  useEffect(() => {
    setAiData((prev) => ({
      ...prev,
      isPending: isAIFetching,
    }));
  }, [isAIFetching]);

  //---AI Request Function---

  const getWeatherAdvice = async () => {
    setAiData((prev) => ({
      ...prev,
      isPending: true,
    }));
    try {
      const { data: aiResponse, error: aiError } = await refetch();
      setAiData({
        isPending: false,
        data: aiResponse,
        error: aiError,
      });
    } catch (error) {
      setAiData({
        isPending: false,
        data: null,
        error: error,
      });
    }
  };

  return (
    <main className="flex flex-col items-center gap-8">
      <Header
        title="WeatherWise.ai"
        updateLocation={setSelectedLocation}
        weatherData={{ isPending, data, error }}
      />
      <div className="flex flex-col items-center gap-8 w-full">
        <WeatherDisplay
          selectedLocation={selectedLocation}
          weatherData={{ isPending, isWeatherFetching, data, error }}
          aiData={aiData}
          aiRequest={getWeatherAdvice}
        />
        <SuggestionDisplay aiData={aiData} />
      </div>
    </main>
  );
};

export default App;
