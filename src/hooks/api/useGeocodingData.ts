import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const fetchGeocoding = async (city: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${
      import.meta.env.VITE_API_KEY
    }`
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch geocoding data! Please check your internet connection or contact developer. 🙏 Response status: ${response.status} - ${response.statusText}`
    );
  }
  return await response.json();
};

export const useGeocodingData = (city: string | null) => {
  const [debouncedCity, setDebouncedCity] = useState<string | null>(city);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCity(city);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [city]);

  return useQuery({
    queryKey: debouncedCity ? ["geocoding", debouncedCity] : [],
    queryFn: () => fetchGeocoding(debouncedCity!),
    enabled: !!debouncedCity && debouncedCity.length > 2,
  });
};
