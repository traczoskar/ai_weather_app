import rain from "../assets/animations/rain.json";
import clouds from "../assets/animations/clouds.json";
import clear from "../assets/animations/clear.json";
import snow from "../assets/animations/snow.json";
import thunderstorm from "../assets/animations/thunderstorm.json";
import drizzle from "../assets/animations/drizzle.json";
import special from "../assets/animations/special.json";

export const getWeatherAnimation = (weatherType: string): any => {
  switch (weatherType) {
    case "Rain":
      return rain;
    case "Clear":
      return clear;
    case "Clouds":
      return clouds;
    case "Snow":
      return snow;
    case "Thunderstorm":
      return thunderstorm;
    case "Drizzle":
      return drizzle;
    case "Atmosphere":
      return special;
    default:
      return clear;
  }
};
