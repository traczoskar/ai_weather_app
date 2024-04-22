import WeatherForm from "../../features/weather/WeatherForm";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="flex justify-center items-center gap-12 bg-black/10 backdrop-blur-md p-6 w-full rounded-3xl">
      <h1 className="text-4xl font-bold font-['Raleway'] ">{title}</h1>
      <WeatherForm />
    </header>
  );
};

export default Header;
