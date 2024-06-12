import { useQuery } from "@tanstack/react-query";

const fetchGeocoding = async (city: string) => {
  console.log("Fetching geocoding for:", city);
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${
      import.meta.env.VITE_API_KEY
    }`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch geocoding data!");
  }
  return await response.json();
};

export const useGeocodingData = (city: string | null) => {
  return useQuery({
    queryKey: city ? ["geocoding", city] : [],
    queryFn: () => fetchGeocoding(city!),
    enabled: !!city && city.length > 2,
  });
};
