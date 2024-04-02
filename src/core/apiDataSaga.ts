import { call, put, takeLatest, all } from "redux-saga/effects";
import {
  fetchGeoCoding,
  setGeoCodingSuccess,
  fetchDataError,
  setLoading,
} from "./apiDataSlice";
import { getGeocoding } from "../utils/getGeocoding";

interface GeoCodingResponse {
  data: {}[];
}
interface FetchGeocodingDataAction {
  type: string;
  payload: JSON;
}

function* fetchGeoCodingDataHandler(action: FetchGeocodingDataAction) {
  try {
    yield put(setLoading());
    const geoCodingData: GeoCodingResponse = yield call(
      getGeocoding as any,
      action.payload
    );
    console.log(geoCodingData);
    yield put(setGeoCodingSuccess(geoCodingData as any));
  } catch (error) {
    yield put(fetchDataError());
  }
}

export function* apiDataSaga() {
  yield all([takeLatest(fetchGeoCoding.type, fetchGeoCodingDataHandler)]);
}
