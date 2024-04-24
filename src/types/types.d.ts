// API Data Slice Types
export interface ApiDataState {
  status: string;
  locationName: string;
  coordinates: {};
  geoCoding: GeocodingData | null;
  weatherData: WeatherResponse | null;
}

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

// API Data Saga Types
export interface Response<T> {
  data: T[];
}

export interface FetchWeatherAction {
  type: string;
  payload: { lat: number; lon: number };
}

export interface FetchGeocodingAction {
  type: string;
  payload: string;
}

// AI Completion Types
export interface AICompletionState {
  isLoading: boolean;
  error: string | null;
  query: AIQuery;
  response: string | null;
}

export interface AIQuery {
  systemMessage: string;
  userMessage: string;
}
