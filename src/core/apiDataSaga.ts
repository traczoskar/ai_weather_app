import { call, put, takeLatest, all } from "redux-saga/effects";
import {
  fetchGeoCoding,
  setGeoCodingSuccess,
  fetchDataError,
  setLoading,
  fetchWeather,
  setWeatherDataSuccess,
} from "./apiDataSlice";
import { getGeocoding } from "../utils/getGeocoding";
import { getWeatherData } from "../utils/getWeatherData";

interface Response<T> {
  data: T[];
}
interface FetchGeocodingAction {
  type: string;
  payload: JSON;
}

interface FetchWeatherAction {
  type: string;
  payload: { lat: number; lon: number };
}

function* fetchGeoCodingDataHandler(action: FetchGeocodingAction) {
  try {
    yield put(setLoading());
    const geoCodingData: Response<JSON> = yield call(
      getGeocoding as any,
      action.payload
    );
    console.log(geoCodingData);
    yield put(setGeoCodingSuccess(geoCodingData as any));
  } catch (error) {
    yield put(fetchDataError());
  }
}

function* fetchWeatherDataHandler(action: FetchWeatherAction) {
  try {
    yield put(setLoading());
    const { lat, lon } = action.payload;
    const weatherData: Response<JSON> = yield call(getWeatherData, lat, lon);
    console.log(weatherData);
    yield put(setWeatherDataSuccess(weatherData as any));
  } catch (error) {
    yield put(fetchDataError());
  }
}

export function* apiDataSaga() {
  yield all([
    takeLatest(fetchGeoCoding.type, fetchGeoCodingDataHandler),
    takeLatest(fetchWeather.type, fetchWeatherDataHandler),
  ]);
}
