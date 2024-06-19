import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsDarkMode, toggleDarkMode } from "../../slices/themeSlice";

const ThemeSwitch: React.FC = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectIsDarkMode);

  return (
    <button
      className="px-4 py-2 bg-sky-700 rounded-full border text-sky-100 font-semibold text-sm hover:bg-sky-800 transition-colors hover:scale-105 active:brightness-105"
      onClick={() => dispatch(toggleDarkMode())}
    >
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default ThemeSwitch;
