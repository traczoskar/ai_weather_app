import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AICompletionState, AIQuery } from "../types/types";

const initialState: AICompletionState = {
  isLoading: false,
  error: null,
  query: {
    systemMessage: "",
    userMessage: "",
  },
  response: null,
};

const aiCompletionSlice = createSlice({
  name: "aiCompletion",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<AIQuery>) => {
      state.isLoading = true;
      state.error = null;
      state.query = action.payload;
      state.response = null;
    },
    setLoadingError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.response = null;
    },
    setResponse: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = null;
      state.response = action.payload;
    },
  },
});

export const { setQuery, setLoadingError, setResponse } =
  aiCompletionSlice.actions;

export const selectAICompletionState = (state: any) => state.aiCompletion;
export const selectAIIsLoading = (state: any) =>
  selectAICompletionState(state).isLoading;
export const selectAIQuery = (state: any) =>
  selectAICompletionState(state).query;
export const selectAIError = (state: any) =>
  selectAICompletionState(state).error;
export const selectAIResponse = (state: any) =>
  selectAICompletionState(state).response;

export default aiCompletionSlice.reducer;
