import { call, put, takeEvery } from "redux-saga/effects";
import { getAiResponse } from "../openAI/openAIRequest"; // Import your Redux actions
import {
  setLoadingError,
  setResponse,
  setQuery,
  setLoading,
} from "../slices/aiCompletionSlice";

interface RequestAIAction {
  type: string;
  payload: { systemMessage: string; userMessage: string };
}

function* handleAICompletion(action: RequestAIAction) {
  try {
    const { systemMessage, userMessage } = action.payload;
    yield put(setLoading());
    console.log("Fetching AI completion... for", systemMessage, userMessage);
    const completion: string = yield call(
      getAiResponse,
      systemMessage,
      userMessage
    );
    if (!completion) {
      throw new Error("No ai completion found.");
    }
    console.log(completion);
    yield put(setResponse(completion));
  } catch (error: string | any) {
    console.error("Error fetching AI completion:", error);
    yield put(setLoadingError(error.message));
  }
}

export function* aiCompletionSaga() {
  yield takeEvery(setQuery.type, handleAICompletion);
}
