import WeatherForm from "../../features/weather/WeatherForm";
import AppLogo from "../../assets/icons/app_logo.svg?react";

interface HeaderProps {
  title: string;
  setSelectedLocation: (location: any) => void;
}

const Header = ({ title, setSelectedLocation }: HeaderProps) => {
  return (
    <header className="flex flex-col md:flex-row gap-6  justify-between items-center w-full mt-6">
      <div className="flex text-sky-800 dark:text-sky-300 dark:drop-shadow-md drop-shadow-lg items-center transition-colors">
        <AppLogo className="w-8 h-8 mr-3" />
        <h1 className="text-3xl font-bold font-['Raleway'] ">{title}</h1>
      </div>
      <WeatherForm setSelectedLocation={setSelectedLocation} />
    </header>
  );
};

export default Header;
