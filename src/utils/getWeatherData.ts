export const getWeatherData = async (lat: number, lon: number) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_API_KEY
    }&lang=pl`
  );
  if (!response.ok) {
    new Error(response.statusText);
  }
  return await response.json();
};
