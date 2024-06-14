// Functions that format data for display
export const formatDescription = (description: string) =>
  description.charAt(0).toUpperCase() + description.slice(1);

export const formatPrimaryTemp = (temp: number) => temp.toFixed(0);

export const formatSecondaryTemp = (temp: number) => temp.toFixed(1);

export const formatTime = (time: number) =>
  new Date(time * 1000).toLocaleTimeString();

export const formatHoursMinutes = (time: number) =>
  new Date(time * 1000).toLocaleTimeString().slice(0, 5);

export const formatWindSpeed = (speed: number) => (speed * 3.6).toFixed(1);
