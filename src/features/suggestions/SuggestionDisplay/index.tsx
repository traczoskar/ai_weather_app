import TranspContainer from "../../../components/TranspContainer";
import Loader from "../../../components/Loader";
import { GeocodingData, QueryData } from "../../../types/types";
import { useEffect, useState } from "react";
import LocationIcon from "../../../assets/icons/location.svg?react";
import StarsIcon from "../../../assets/icons/stars.svg?react";
import Button from "../../../components/Button";
import SuggestionTile from "../SuggestionTile";

interface SuggestionsDisplayProps {
  aiData: QueryData;
  weatherData: QueryData;
  selectedLocation: GeocodingData | null;
  aiRequest: () => void;
}

const SuggestionDisplay: React.FC<SuggestionsDisplayProps> = ({
  aiData,
  weatherData,
  selectedLocation,
  aiRequest,
}) => {
  const { isPending, data, error } = aiData;
  const { data: weather } = weatherData;
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
      {weather && (
        <div className="flex self-end gap-4 items-center absolute top-6 right-6">
          {isPending ? (
            <div className="flex text-sky-700 text-sm font-light gap-4">
              Waiting for AI response...
              <Loader />
            </div>
          ) : (
            <Button onClick={aiRequest} icon={<StarsIcon />}>
              Ask AI for advice
            </Button>
          )}
        </div>
      )}
      {aiResponse && (
        <TranspContainer>
          <section className="flex flex-col w-full">
            <div className="flex justify-between w-full">
              <h2 className="text-sky-700 transition-colors dark:text-sky-200 text-2xl font-semibold flex gap-4 drop-shadow items-center">
                AI advices for today {`at ${data.location}`}
                <StarsIcon width={28} height={28} />
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
              <div className="grid grid-cols-2 gap-4 text-md mt-4">
                <SuggestionTile
                  title="Indoor Activities"
                  data={data.suggestions.indoor_activities}
                  isArray={true}
                />
                <SuggestionTile
                  title="Outdoor Activities"
                  data={data.suggestions.outdoor_activities}
                  isArray={true}
                />
                <SuggestionTile
                  title="Attire"
                  data={data.suggestions.attire}
                  isArray={true}
                />
                <SuggestionTile
                  title="Food Suggestions"
                  data={data.suggestions.food_suggestions}
                  isArray={true}
                />
                <SuggestionTile
                  title="Health Tips"
                  data={data.suggestions.health_tips}
                  isArray={true}
                />
                <SuggestionTile
                  title="Places to Visit"
                  data={data.suggestions.places_to_visit}
                  isArray={true}
                />
                <SuggestionTile
                  title="Music"
                  data={data.suggestions.music}
                  isArray={true}
                />
                <SuggestionTile
                  title="Movies"
                  data={data.suggestions.movies}
                  isArray={true}
                />
              </div>
            </article>
          </section>
        </TranspContainer>
      )}
    </>
  );
};

export default SuggestionDisplay;
