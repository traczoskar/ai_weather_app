import { call, put, takeLatest, all, debounce } from "redux-saga/effects";
import {
  fetchGeoCoding,
  fetchDataError,
  fetchWeather,
  fetchGeoCodingSuccess,
  fetchWeatherDataSuccess,
} from "../slices/apiDataSlice";
import { getGeocoding } from "../api/getGeocoding";
import { getWeatherData } from "../api/getWeatherData";

interface Response<T> {
  data: T[];
}
interface FetchGeocodingAction {
  type: string;
  payload: string;
}

interface FetchWeatherAction {
  type: string;
  payload: { lat: number; lon: number };
}

function* fetchGeoCodingDataHandler(action: FetchGeocodingAction) {
  try {
    const cityName = action.payload;
    const geoCodingData: Response<JSON> = yield call(getGeocoding, cityName);
    if (!geoCodingData) {
      throw new Error("No data found.");
    }
    console.log(geoCodingData);
    yield put(fetchGeoCodingSuccess(geoCodingData as any));
  } catch (error) {
    yield put(fetchDataError());
  }
}

function* fetchWeatherDataHandler(action: FetchWeatherAction) {
  try {
    const { lat, lon } = action.payload;
    const weatherData: Response<JSON> = yield call(getWeatherData, lat, lon);
    if (!weatherData) {
      throw new Error("No weather data received.");
    }
    console.log(weatherData);
    yield put(fetchWeatherDataSuccess(weatherData as any));
  } catch (error) {
    console.error("Error fetching weather data:", error);
    yield put(fetchDataError());
  }
}

export function* apiDataSaga() {
  yield all([
    debounce(1000, fetchGeoCoding.type, fetchGeoCodingDataHandler),
    takeLatest(fetchWeather.type, fetchWeatherDataHandler),
  ]);
}
