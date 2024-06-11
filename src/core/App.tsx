import WeatherDisplay from "../features/weather/WeatherDisplay";
import Header from "../components/Header";
import SuggestionDisplay from "../features/suggestions/SuggestionDisplay";

export default function App() {
  return (
    <main className="flex flex-col items-center gap-8">
      <Header title="WeatherWise.ai" />

      <div className="flex flex-col items-center gap-8 w-full">
        <SuggestionDisplay />
        <WeatherDisplay />
      </div>
    </main>
  );
}
