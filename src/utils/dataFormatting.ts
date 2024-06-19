import { Forecast } from "../types/types";

// Functions that format data to display

export const formatDescription = (description: string) =>
  description.charAt(0).toUpperCase() + description.slice(1);

export const formatPrimaryTemp = (temp: number) => temp.toFixed(0);

export const formatSecondaryTemp = (temp: number) => temp.toFixed(1);

export const formatTime = (time: number) =>
  new Date(time * 1000).toLocaleTimeString();

export const formatHoursMinutes = (time: number) =>
  new Date(time * 1000).toLocaleTimeString().slice(0, 5);

export const formatWindSpeed = (speed: number) => (speed * 3.6).toFixed(1);

export const processForecastData = (data: Forecast["list"]) => {
  const days: { [key: string]: any } = {};

  data?.forEach((entry) => {
    const date = new Date(entry.dt * 1000);
    const day = date.toISOString().split("T")[0];
    const time = entry.dt_txt.split(" ")[1];
    const hour = parseInt(time.split(":")[0], 10);
    const isNighttime = (hour >= 0 && hour <= 6) || (hour >= 21 && hour <= 23);

    if (!days[day]) {
      days[day] = {
        dayTemps: [],
        nightTemps: [],
        dayPressures: [],
        nightPressures: [],
        dayHumidities: [],
        nightHumidities: [],
        description: entry.weather[0].description,
        icon: entry.weather[0].main,
        date: day,
      };
    }
    if (isNighttime) {
      days[day].nightTemps.push(entry.main.temp);
    } else {
      days[day].dayTemps.push(entry.main.temp);
    }

    if (isNighttime) {
      days[day].nightHumidities.push(entry.main.humidity);
    } else {
      days[day].dayHumidities.push(entry.main.humidity);
    }

    if (isNighttime) {
      days[day].nightPressures.push(entry.main.pressure);
    } else {
      days[day].dayPressures.push(entry.main.pressure);
    }
  });

  return Object.values(days).slice(0, 5);
};

export const calculateAverage = (temps: number[]) => {
  if (temps.length === 0) return null;
  const sum = temps.reduce((a, b) => a + b, 0);
  return (sum / temps.length).toFixed(0);
};
