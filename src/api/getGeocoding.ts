export const getGeocoding = async (town: string) => {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${town}&limit=5&appid=${
      import.meta.env.VITE_API_KEY
    }`
  );
  if (!response.ok) {
    new Error(response.statusText);
  }
  return await response.json();
};
