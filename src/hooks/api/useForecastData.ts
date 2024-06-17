import { useQuery } from "@tanstack/react-query";

const fetchForecast = async (lat: number, lon: number) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_API_KEY
    }&lang=en&units=metric`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch weather data!");
  }

  return await response.json();
};

export const useForecastData = (lat: number | null, lon: number | null) => {
  return useQuery({
    queryKey: lat && lon ? ["forecast", lat, lon] : [],
    queryFn: () => fetchForecast(lat!, lon!),
    enabled: !!lat && !!lon,
  });
};
