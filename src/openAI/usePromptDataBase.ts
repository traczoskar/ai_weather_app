import { useSelector } from "react-redux";
import { selectWeatherData } from "../slices/apiDataSlice";
import { getCurrentDate } from "../utils/getCurrentDate";
import { formatTemperature } from "../utils/dataFormatting";

const activities = {
  rain: "Rain weather activities: movie watching, book reading, board games, baking cookies, crafting art, music listening, indoor exercises, museum visits, journal writing, yoga session",
  clear:
    "Clear weather activities: picnic, beach day, hiking, cycling, running, outdoor exercises, gardening, BBQ party, camping, fishing, swimming, sunbathing, outdoor yoga",
  clouds:
    "Clouds weather activities: walk in the park, coffee with friends, shopping, visit to the zoo, visit to the aquarium, visit to the botanical garden, trampoline park, visit to the cinema, visit to the theater, visit to the opera, DIY crafting session, spa day, wine tasting, indoor rock climbing",
  snow: "Snow weather activities: skiing, snowboarding, ice skating, snowball fight, building a snowman, sledging, stay at home with hot chocolate, winter photography, restaurants with fireplace, date with your partner",
  thunderstorm:
    "Thunderstorm weather activities: stay at home with a good book, movie marathon, board games, baking cookies, crafting art, music listening, indoor exercises, museum visits, journal writing, yoga session, meditation, relaxing bath, thunderstorm photography",
  drizzle:
    "Drizzle weather activities: walk in the park, coffee with friends, shopping, coffee tasting, light jogging, quick hikes, street wandering, patio sitting, gallery touring, flower arranging, short cycling.",
  special:
    "Special weather activities: indoor painting, home organizing, virtual reality, documentary watching, meditation session, digital art, home workouts, recipe trying, online shopping, safety planning.",
};

const getContext = (weatherType: string) => {
  switch (weatherType) {
    case "Rain":
      return activities.rain;
    case "Clear":
      return activities.clear;
    case "Clouds":
      return activities.clouds;
    case "Snow":
      return activities.snow;
    case "Thunderstorm":
      return activities.thunderstorm;
    case "Drizzle":
      return activities.drizzle;
    case "Atmosphere":
      return activities.special;
    default:
      return activities.clear;
  }
};

export const usePromptDataBase = () => {
  const weatherResponse = useSelector(selectWeatherData);

  const systemMessage = `I am your day planning assistant integrated with a weather application. After reviewing today's weather and considering your interests and the current season, I suggest personalized activities and appropriate attire. My suggestions aim to be engaging and tailored to make your day enjoyable. I use a casual and encouraging tone, with emoticons to enhance the visual experience and separate suggestions for readability. I answer in Markdown format. Let's make the most of your day!
  ###
  Example activities for this weather: ${
    weatherResponse ? getContext(weatherResponse.weather[0].main) : ""
  }###`;

  const userMessage = `Dane pogodowe:
- dzisiejsza data: ${getCurrentDate()} r.,
- lokalizacja: ${weatherResponse?.name},
- opis pogody: ${weatherResponse?.weather[0].description},
- temperatura: ${
    weatherResponse ? formatTemperature(weatherResponse?.main.temp) : ""
  }°C
- temperatura odczuwalna: ${
    weatherResponse ? formatTemperature(weatherResponse?.main.feels_like) : ""
  }°C
- ciśnienie: ${weatherResponse?.main.pressure} hPa
- wilgotność: ${weatherResponse?.main.humidity}%
- prędkość wiatru: ${weatherResponse?.wind.speed} m/s
Udziel mi proszę rozbudowanej odpowiedzi.`;
  return {
    systemMessage,
    userMessage,
  };
};
