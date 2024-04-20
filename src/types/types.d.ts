export interface GeocodingResponse {
  lat: number;
  lon: number;
}

export interface GeocodingData extends GeocodingResponse {
  name: string;
  local_names?: Record<string, any>;
  country: string;
  state?: string;
}

export interface WeatherResponse {
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  weather: [
    {
      description: string;
      main: string;
    }
  ];
  coord: GeocodingResponse;
  clouds: {
    all: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
}
