import { useQuery } from "@tanstack/react-query";

const fetchAirPollution = async (lat: number, lon: number) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_API_KEY
    }`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch air pollution data!");
  }

  return await response.json();
};

export const useAirPollutionData = (lat: number | null, lon: number | null) => {
  return useQuery({
    queryKey: lat && lon ? ["air-pollution", lat, lon] : [],
    queryFn: () => fetchAirPollution(lat!, lon!),
    enabled: !!lat && !!lon,
  });
};
