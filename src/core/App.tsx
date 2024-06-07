import WeatherDisplay from "../features/weather/WeatherDisplay";
import Header from "../components/Header";
import SuggestionDisplay from "../features/suggestions/SuggestionDisplay";

export default function App() {
  return (
    <main className="flex flex-col items-center h-full max-w-screen-lg mx-auto">
      <Header title="WeatherWise.ai" />

      <div className="flex flex-col items-center gap-8 mx-8 my-2">
        <WeatherDisplay />
        <SuggestionDisplay />
      </div>
    </main>
  );
}
