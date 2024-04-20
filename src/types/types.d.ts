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
