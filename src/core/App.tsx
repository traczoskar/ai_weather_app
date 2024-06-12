import WeatherDisplay from "../features/weather/WeatherDisplay";
import Header from "../components/Header";
import SuggestionDisplay from "../features/suggestions/SuggestionDisplay";

import { useWeatherData } from "../api/useWeatherData";
import { useEffect, useState } from "react";
import { GeocodingData } from "../types/types";
import { usePromptDataBase } from "../openAI/usePromptDataBase";
import { useAIResponse } from "../openAI/useAIResponse";

interface AiData {
  isPending: boolean;
  data: any | null;
  error: any | null;
}

const App = () => {
  const [selectedLocation, setSelectedLocation] =
    useState<GeocodingData | null>(null);
  const [aiData, setAiData] = useState<AiData>({
    isPending: false,
    data: null,
    error: null,
  });
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

  const prompt = usePromptDataBase(data);

  const {
    refetch,
    isFetching,
    data: aiResponse,
    error: aiError,
  } = useAIResponse(prompt.systemMessage, prompt.userMessage);

  const getWeatherAdvice = async () => {
    setAiData((prev) => ({
      ...prev,
      isPending: true,
    }));
    try {
      const { data } = await refetch();
      setAiData({
        isPending: false,
        data: data,
        error: null,
      });
    } catch (error) {
      setAiData({
        isPending: false,
        data: null,
        error,
      });
    }
  };

  useEffect(() => {
    setAiData((prev) => ({
      ...prev,
      isPending: isFetching,
    }));
  }, [isFetching]);

  useEffect(() => {
    console.log("aiData: ", aiData.data);
    console.log("aiData error: ", aiData.error);
    console.log("aiData isPending: ", aiData.isPending);
  }, [aiData.data, aiData.error, aiData.isPending]);

  return (
    <main className="flex flex-col items-center gap-8">
      <Header
        title="WeatherWise.ai"
        updateLocation={setSelectedLocation}
        weatherData={{ isPending, data, error }}
      />

      <div className="flex flex-col items-center gap-8 w-full">
        <SuggestionDisplay aiData={aiData} />
        <WeatherDisplay
          aiData={aiData}
          weatherData={{ isPending, isWeatherFetching, data, error }}
          aiRequest={getWeatherAdvice}
        />
      </div>
    </main>
  );
};

export default App;
