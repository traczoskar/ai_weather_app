export const getGeocoding = async () => {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=Bolesławice&limit=5&appid=${
      import.meta.env.VITE_API_KEY
    }`
  );
  if (!response.ok) {
    new Error(response.statusText);
  }
  return await response.json();
};
