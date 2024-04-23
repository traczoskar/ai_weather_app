import WeatherDisplay from "../features/weather/WeatherDisplay";
import Header from "../components/Header";
import SuggestionDisplay from "../features/suggestions/SuggestionDisplay";

export default function App() {
  return (
    <main className="flex flex-col items-center bg-custom-bg bg-cover bg-center h-full m-16 rounded-3xl border-solid border-2">
      <Header title="WeatherWise.ai" />
      <div className="flex items-center gap-8">
        <WeatherDisplay />
        <SuggestionDisplay message="It's a good day to go out!" />
      </div>
    </main>
  );
}
