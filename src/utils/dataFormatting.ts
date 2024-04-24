// Functions that format data for display
export const formatDescription = (description: string) => {
  return description.charAt(0).toUpperCase() + description.slice(1);
};

export const formatTemperature = (temp: number) => {
  return temp.toFixed(1);
};
