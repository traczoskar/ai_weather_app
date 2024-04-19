import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const apiDataSlice = createSlice({
  name: "apiData",
  initialState: {
    status: "initial",
    geoCoding: null as any,
    weatherData: null as any,
  },
  reducers: {
    setLoading: (state) => {
      state.status = "loading";
    },
    fetchGeoCoding: () => {},
    setGeoCodingSuccess: (state, action: PayloadAction<{}[] | null>) => {
      state.geoCoding = action.payload;
      state.status = "success";
    },
    fetchDataError: (state) => {
      state.status = "error";
    },
    fetchWeather: () => {},
    setWeatherDataSuccess: (
      state,
      action: PayloadAction<{ lat: number; lon: number }>
    ) => {
      state.weatherData = action.payload;
      state.status = "success";
    },
  },
});

export const {
  setLoading,
  fetchGeoCoding,
  setGeoCodingSuccess,
  fetchDataError,
  setWeatherDataSuccess,
  fetchWeather,
} = apiDataSlice.actions;

export const selectApiDataState = (state: any) => state.apiData;
export const selectStatus = (state: string) => selectApiDataState(state).status;
export const selectError = (state: any) => selectApiDataState(state).error;
export const selectGeoCodingData = (state: any) =>
  selectApiDataState(state).geoCoding;
export const selectWeatherData = (state: any) =>
  selectApiDataState(state).weatherData;

export default apiDataSlice.reducer;
