import { call, put, takeLatest, all, debounce } from "redux-saga/effects";
import {
  fetchGeoCoding,
  setGeoCodingSuccess,
  fetchDataError,
  setLoading,
  fetchWeather,
  setWeatherDataSuccess,
} from "../slices/apiDataSlice";
import { getGeocoding } from "../api/getGeocoding";
import { getWeatherData } from "../api/getWeatherData";

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
    debounce(1000, fetchGeoCoding.type, fetchGeoCodingDataHandler),
    takeLatest(fetchWeather.type, fetchWeatherDataHandler),
  ]);
}
