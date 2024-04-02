import { configureStore } from "@reduxjs/toolkit";
import apiDataReducer from "./apiDataSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    apiData: apiDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
