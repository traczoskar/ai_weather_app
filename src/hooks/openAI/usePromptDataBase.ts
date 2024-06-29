import { useCurrentDate } from "../useCurrentDate";
import {
  formatPrimaryTemp,
  formatSecondaryTemp,
} from "../../utils/dataFormatting";
import { ChatPrompt, GeocodingData, QueryData } from "../../types/types";

const currentDate: string = useCurrentDate();

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

export const usePromptDataBase = (
  weatherResponse: QueryData,
  selectedLocation: GeocodingData | null
) => {
  //---Weather Data---
  const { data: weatherData } = weatherResponse;

  //---System Message---
  const systemMessage = `I am your day planning assistant integrated with a weather application. After reviewing today's weather and considering your interests and the current season, I suggest personalized activities and appropriate attire. My suggestions aim to be engaging and tailored to make your day enjoyable. I use a casual and encouraging tone, with emoticons to enhance the visual experience and separate suggestions for readability. I answer in JSON format. Let's make the most of your day!
  ###
  Example activities for this weather: ${
    weatherData ? getContext(weatherData.weather[0].main) : ""
  }###
  Respond only with a JSON object in the following format:
  {
    "date": "YYYY-MM-DD",
    "location": "City Name",
    "suggestions": {
      "mood": "Suggested mood",
      "indoor_activities": ["Indoor Activity 1", "Indoor Activity 2", ...],
      "outdoor_activities": ["Outdoor Activity 1", "Outdoor Activity 2", ...],
      "attire": ["Clothing item 1", "Clothing item 2", ...],
      "food_suggestions": ["Food item 1", "Food item 2", ...],
      "health_tips": ["Health tip 1", "Health tip 2", ...]
      "places_to_visit": ["Place #1 near the location", "Place #2 near the location", ...]
      "music": ["Artist - title #1", "Artist - title #2", ...]
      "movies": ["Movie title #1", "Movie title #2", ...]
      "general_advice": "General encouraging advice for the day"
    }
  }
    
  ### For every suggestion in each category please provide proper emoticon - for example: "💧 Stay hydrated", "🧖‍♀️ Spa day" `;

  //---User Message---
  const userMessage = `Weather data:
- current date: ${currentDate} r.,
- location: ${
    selectedLocation?.name ? selectedLocation.name : weatherData?.name
  },
${
  selectedLocation?.country
    ? `- country: ${selectedLocation.country}` + ","
    : ""
}
- weather description: ${weatherData?.weather[0].description},
- temperature: ${weatherData ? formatPrimaryTemp(weatherData?.main.temp) : ""}°C
- feels like: ${
    weatherData ? formatSecondaryTemp(weatherData?.main.feels_like) : ""
  }°C
- pressure: ${weatherData?.main.pressure} hPa
- humidity: ${weatherData?.main.humidity}%
- wind speed: ${weatherData?.wind.speed} m/s
Answer in JSON format.`;

  const prompt: ChatPrompt = {
    systemMessage: {
      role: "system",
      content: systemMessage,
    },
    userMessage: {
      role: "user",
      content: userMessage,
    },
  };

  return prompt;
};
