export const getAirQualityRating = (value: number) => {
  if (value === 1) return "Very Good";
  if (value === 2) return "Good";
  if (value === 3) return "Moderate";
  if (value === 4) return "Bad";
  if (value === 5) return "Very Bad";
  return "Unknown";
};
