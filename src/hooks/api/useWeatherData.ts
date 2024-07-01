import { useQuery } from "@tanstack/react-query";

const fetchWeather = async (lat: number, lon: number) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_API_KEY
    }&lang=en&units=metric`
  );
  if (!response.ok) {
    throw new Error(
      "Failed to fetch weather data! Response status: " +
        response.status +
        " - " +
        response.statusText
    );
  }

  return await response.json();
};

export const useWeatherData = (lat: number | null, lon: number | null) => {
  return useQuery({
    queryKey: lat && lon ? ["weather", lat, lon] : [],
    queryFn: () => fetchWeather(lat!, lon!),
    enabled: !!lat && !!lon,
  });
};
