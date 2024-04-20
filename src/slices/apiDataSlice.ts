import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const apiDataSlice = createSlice({
  name: "apiData",
  initialState: {
    status: "initial",
    locationName: "",
    coordinates: {},
    geoCoding: null as any,
    weatherData: null as any,
  },
  reducers: {
    fetchGeoCoding: (state, action: PayloadAction<string>) => {
      state.status = "loading";
      state.locationName = action.payload;
    },
    fetchGeoCodingSuccess: (state, action: PayloadAction<{}[] | null>) => {
      state.geoCoding = action.payload;
      state.status = "success";
    },
    fetchDataError: (state) => {
      state.status = "error";
    },
    fetchWeather: (state, action: PayloadAction<{}>) => {
      state.status = "loading";
      state.coordinates = action.payload;
    },
    fetchWeatherDataSuccess: (
      state,
      action: PayloadAction<{ lat: number; lon: number }>
    ) => {
      state.weatherData = action.payload;
      state.status = "success";
    },
  },
});

export const {
  fetchGeoCoding,
  fetchGeoCodingSuccess,
  fetchDataError,
  fetchWeatherDataSuccess,
  fetchWeather,
} = apiDataSlice.actions;

export const selectApiDataState = (state: any) => state.apiData;
export const selectStatus = (state: string) => selectApiDataState(state).status;
export const selectCityName = (state: string) =>
  selectApiDataState(state).locationName;
export const selectError = (state: any) => selectApiDataState(state).error;
export const selectGeoCodingData = (state: any) =>
  selectApiDataState(state).geoCoding;
export const selectWeatherData = (state: any) =>
  selectApiDataState(state).weatherData;

export default apiDataSlice.reducer;
