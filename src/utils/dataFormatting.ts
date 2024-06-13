// Functions that format data for display
export const formatDescription = (description: string) =>
  description.charAt(0).toUpperCase() + description.slice(1);

export const formatTemperature = (temp: number) => temp.toFixed(1);

export const formatTime = (time: number) =>
  new Date(time * 1000).toLocaleTimeString();
