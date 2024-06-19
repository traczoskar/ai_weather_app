import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../core/store";

interface ThemeState {
  darkMode: boolean;
}

const initialState: ThemeState = {
  darkMode: localStorage.getItem("darkMode") === "true",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", state.darkMode.toString());
      document.documentElement.classList.toggle("dark", state.darkMode);
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;

const selectThemeState = (state: RootState) => state.theme;

export const selectIsDarkMode = (state: RootState) =>
  selectThemeState(state).darkMode;

export default themeSlice.reducer;
