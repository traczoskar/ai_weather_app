import { all } from "redux-saga/effects";
import { apiDataSaga } from "./apiDataSaga";

export default function* rootSaga() {
  yield all([apiDataSaga()]);
}
