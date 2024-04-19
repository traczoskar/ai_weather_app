import { configureStore } from "@reduxjs/toolkit";
import apiDataReducer from "../slices/apiDataSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/saga";

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
