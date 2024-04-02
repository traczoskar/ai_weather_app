import { all } from "redux-saga/effects";
import { apiDataSaga } from "./core/apiDataSaga";

export default function* rootSaga() {
  yield all([apiDataSaga()]);
}
