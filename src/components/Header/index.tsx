import WeatherForm from "../../features/weather/WeatherForm";
import AppLogo from "../../assets/icons/app_logo.svg?react";
import ThemeSwitch from "../ThemeSwitch";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { selectIsDarkMode, toggleDarkMode } from "../../slices/themeSlice";
import { useEffect, useState } from "react";
import InfoButton from "../InfoButton";
import StarsIcon from "../../assets/icons/stars.svg?react";
import { GeocodingData, QueryData } from "../../types/types";
import Button from "../Button";

interface HeaderProps {
  title: string;
  openInfo: () => void;
  setSelectedLocation: (location: any) => void;
  selectedLocation: GeocodingData | null;
  aiData: QueryData;
  aiRequest: () => void;
}

const Header = ({
  title,
  setSelectedLocation,
  openInfo,
  aiData,
  aiRequest,
  selectedLocation,
}: HeaderProps) => {
  const isDarkMode = useSelector(selectIsDarkMode);
  const dispatch = useDispatch();
  const { isPending: isAiPending, data } = aiData;
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  useEffect(() => {
    setAiResponse(data);
  }, [data]);

  useEffect(() => {
    setAiResponse(null);
  }, [selectedLocation]);

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
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          title="App Logo"
          className="flex text-sky-800 dark:text-sky-300 dark:drop-shadow-md drop-shadow-lg items-center transition-colors"
        >
          <AppLogo className="w-8 h-8 mr-3" />
          <h1 className="text-3xl font-bold font-['Raleway'] ">{title}</h1>
        </motion.div>
        <motion.nav
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center items-center gap-4"
        >
          <InfoButton onClick={openInfo} />
          {!aiResponse && selectedLocation && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex self-end gap-4 items-center "
            >
              <Button
                disabled={isAiPending}
                onClick={aiRequest}
                icon={<StarsIcon width={18} height={18} />}
              >
                Ask AI for advice
              </Button>
            </motion.div>
          )}

          <ThemeSwitch />
        </motion.nav>
      </div>
      <WeatherForm setSelectedLocation={setSelectedLocation} />
    </header>
  );
};

export default Header;
