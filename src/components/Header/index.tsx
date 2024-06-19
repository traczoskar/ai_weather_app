import WeatherForm from "../../features/weather/WeatherForm";
import AppLogo from "../../assets/icons/app_logo.svg?react";
import ThemeSwitch from "../ThemeSwitch";
import { useDispatch, useSelector } from "react-redux";
import { selectIsDarkMode, toggleDarkMode } from "../../slices/themeSlice";
import { useEffect } from "react";

interface HeaderProps {
  title: string;
  setSelectedLocation: (location: any) => void;
}

const Header = ({ title, setSelectedLocation }: HeaderProps) => {
  const isDarkMode = useSelector(selectIsDarkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (e.matches !== isDarkMode) {
        dispatch(toggleDarkMode());
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [isDarkMode, dispatch]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <header className="w-full flex flex-col gap-6">
      <div className="flex flex-col min-[415px]:flex-row gap-6 justify-between items-center w-full mt-6">
        <div className="flex text-sky-800 dark:text-sky-300 dark:drop-shadow-md drop-shadow-lg items-center transition-colors">
          <AppLogo className="w-8 h-8 mr-3" />
          <h1 className="text-3xl font-bold font-['Raleway'] ">{title}</h1>
        </div>
        <ThemeSwitch />
      </div>
      <WeatherForm setSelectedLocation={setSelectedLocation} />
    </header>
  );
};

export default Header;
