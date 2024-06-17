const veryGood = "bg-green-500 text-white";
const good = "bg-lime-500 text-white";
const moderate = "bg-yellow-300 text-black";
const poor = "bg-amber-500 text-black";
const bad = "bg-red-700 text-white";
const veryBad = "bg-fuchsia-900 text-white";

export const getAirQualityClass = (value: number, pollutant: string) => {
  switch (pollutant) {
    case "so2":
      if (value <= 50) return veryGood;
      if (value <= 100) return good;
      if (value <= 200) return moderate;
      if (value <= 350) return poor;
      if (value <= 500) return bad;
      return veryBad;
    case "pm2_5":
      if (value <= 12) return veryGood;
      if (value <= 36) return good;
      if (value <= 60) return moderate;
      if (value <= 84) return poor;
      if (value <= 120) return bad;
      return veryBad;
    case "pm10":
      if (value <= 20) return veryGood;
      if (value <= 60) return good;
      if (value <= 100) return moderate;
      if (value <= 140) return poor;
      if (value <= 200) return bad;
      return veryBad;
    case "no2":
      if (value <= 40) return veryGood;
      if (value <= 100) return good;
      if (value <= 200) return moderate;
      if (value <= 400) return poor;
      if (value <= 600) return bad;
      return veryBad;
    case "o3":
      if (value <= 60) return veryGood;
      if (value <= 120) return good;
      if (value <= 180) return moderate;
      if (value <= 240) return poor;
      if (value <= 300) return bad;
      return veryBad;
    case "no":
      if (value <= 40) return veryGood;
      if (value <= 100) return good;
      if (value <= 200) return moderate;
      if (value <= 400) return poor;
      if (value <= 600) return bad;
      return veryBad;
    case "co":
      if (value <= 2000) return veryGood;
      if (value <= 4000) return good;
      if (value <= 10000) return moderate;
      if (value <= 17000) return poor;
      if (value <= 34000) return bad;
      return veryBad;
    case "nh3":
      if (value <= 200) return veryGood;
      if (value <= 400) return good;
      if (value <= 800) return moderate;
      if (value <= 1200) return poor;
      if (value <= 1600) return bad;
      return veryBad;
    default:
      return "bg-green-600 text-white";
  }
};
