import WeatherForm from "../features/weather/WeatherForm";
import WeatherDisplay from "../features/weather/WeatherDisplay";
import Header from "../components/Header";

export default function App() {
  return (
    <main className="flex flex-col items-center bg-custom-bg bg-cover bg-center h-full m-16 rounded-3xl border-solid border-2">
      <Header title="WeatherWise.ai" />
      <WeatherDisplay />
    </main>
  );
}
