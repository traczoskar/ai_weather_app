import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsDarkMode, toggleDarkMode } from "../../slices/themeSlice";
import SunIcon from "../../assets/icons/sun.svg?react";
import MoonIcon from "../../assets/icons/moon.svg?react";

const ThemeSwitch: React.FC = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectIsDarkMode);

  return (
    <button
      className="flex px-3 py-1.5 bg-sky-800 dark:bg-sky-700 border-t-sky-900 shadow-md border-b-0 border-x-0 dark:border-t-sky-600 rounded-full border  font-semibold text-sm  active:brightness-110 transition-all hover:scale-105"
      onClick={() => dispatch(toggleDarkMode())}
    >
      <div className="flex  justify-between items-center w-12">
        <div
          className={`flex items-center transition-all  ${
            isDarkMode ? "translate-x-8" : "-translate-x-0.5"
          }`}
        >
          {isDarkMode ? (
            <SunIcon width={18} height={18} className="animate-pulseOnce" />
          ) : (
            <MoonIcon width={18} height={18} className="animate-pulseOnce" />
          )}
        </div>
        <div
          className={`rounded-full flex items-center dark:bg-slate-300 bg-sky-100 p-2.5 justify-center transition-all duration-300 ${
            isDarkMode ? "-translate-x-8" : "translate-x-1"
          }`}
        ></div>
      </div>
    </button>
  );
};

export default ThemeSwitch;
