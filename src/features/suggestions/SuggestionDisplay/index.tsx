import TranspContainer from "../../../components/TranspContainer";
import Loader from "../../../components/Loader";
import { GeocodingData, QueryData } from "../../../types/types";
import { useEffect, useState } from "react";
import LocationIcon from "../../../assets/icons/location.svg?react";
import StarsIcon from "../../../assets/icons/stars.svg?react";
import IndoorIcon from "../../../assets/icons/suggestions/indoor.svg?react";
import OutdoorIcon from "../../../assets/icons/suggestions/outdoor.svg?react";
import AttireIcon from "../../../assets/icons/suggestions/attire.svg?react";
import FoodIcon from "../../../assets/icons/suggestions/food.svg?react";
import HealthIcon from "../../../assets/icons/suggestions/health.svg?react";
import PlacesIcon from "../../../assets/icons/suggestions/places.svg?react";
import MusicIcon from "../../../assets/icons/suggestions/music.svg?react";
import MovieIcon from "../../../assets/icons/suggestions/movie.svg?react";
import SuggestionTile from "../SuggestionTile";
import { motion } from "framer-motion";

interface SuggestionsDisplayProps {
  aiData: QueryData;
  weatherData: QueryData;
  selectedLocation: GeocodingData | null;
}

const SuggestionDisplay: React.FC<SuggestionsDisplayProps> = ({
  aiData,
  selectedLocation,
}) => {
  const { isPending, data, error } = aiData;
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  useEffect(() => {
    setAiResponse(data);
  }, [data]);

  useEffect(() => {
    setAiResponse(null);
  }, [selectedLocation]);

  {
    isPending && <Loader />;
  }
  {
    error && <h3>{error.message}</h3>;
  }

  return (
    <>
      {isPending && (
        <motion.div
          className="flex w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.75 }}
        >
          <TranspContainer>
            <div className="w-full h-36 flex justify-center items-center gap-4 animate-pulseQuick">
              <span className="font-semibold text-md md:text-xl text-sky-600 dark:text-sky-200 drop-shadow">
                🤖 Waiting for AI response ...
              </span>
              <Loader />
            </div>
          </TranspContainer>
        </motion.div>
      )}
      {error && (
        <TranspContainer>
          <h3>{error.message}</h3>
        </TranspContainer>
      )}
      {aiResponse && (
        <TranspContainer>
          <motion.section
            className="flex flex-col w-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.75 }}
          >
            <div className="flex justify-between flex-col gap-4 md:flex-row w-full">
              <h2 className="text-sky-700 transition-colors dark:text-sky-200  text-md sm:text-xl md:text-2xl font-semibold flex flex-wrap gap-3 drop-shadow items-center">
                AI advices for today {`at ${data.location}`}
                <span className="text-fuchsia-400 drop-shadow-md">
                  <StarsIcon width={28} height={28} />
                </span>
              </h2>
              <p className="flex gap-2 text-sky-600 transition-colors dark:text-sky-300 text-md drop-shadow items-center ">
                <LocationIcon width={20} height={20} /> {data.location},{" "}
                {data.date}
              </p>
            </div>
            <article className="flex flex-col text-md text-gray-700 dark:text-white mt-8">
              <SuggestionTile
                general_advice={{
                  title: "One phrase from AI:",
                  text: data.suggestions.general_advice,
                }}
                mood={{
                  title: "Mood:",
                  text: data.suggestions.mood,
                }}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-md mt-4">
                <SuggestionTile
                  title="Indoor Activities"
                  icon={<IndoorIcon width={20} height={20} />}
                  data={data.suggestions.indoor_activities}
                  isArray={true}
                />
                <SuggestionTile
                  title="Outdoor Activities"
                  icon={<OutdoorIcon width={20} height={20} />}
                  data={data.suggestions.outdoor_activities}
                  isArray={true}
                />
                <SuggestionTile
                  title="Attire"
                  icon={<AttireIcon width={20} height={20} />}
                  data={data.suggestions.attire}
                  isArray={true}
                />
                <SuggestionTile
                  title="Food Suggestions"
                  icon={<FoodIcon width={20} height={20} />}
                  data={data.suggestions.food_suggestions}
                  isArray={true}
                />
                <SuggestionTile
                  title="Health Tips"
                  icon={<HealthIcon width={20} height={20} />}
                  data={data.suggestions.health_tips}
                  isArray={true}
                />
                <SuggestionTile
                  title="Places to Visit"
                  icon={<PlacesIcon width={20} height={20} />}
                  data={data.suggestions.places_to_visit}
                  isArray={true}
                />
                <SuggestionTile
                  title="Music"
                  icon={<MusicIcon width={20} height={20} />}
                  musicOrMovies={data.suggestions.music}
                  isMusicOrMovies={true}
                  isArray={true}
                />
                <SuggestionTile
                  title="Movies"
                  icon={<MovieIcon width={20} height={20} />}
                  musicOrMovies={data.suggestions.movies}
                  isMusicOrMovies={true}
                  isArray={true}
                />
              </div>
            </article>
            <p className="text-sm dark:text-sky-300  text-sky-700 mt-4">
              <span className="font-bold">✅ Tip:</span> To unlock next AI query
              first search for new location.
            </p>
          </motion.section>
        </TranspContainer>
      )}
    </>
  );
};

export default SuggestionDisplay;
