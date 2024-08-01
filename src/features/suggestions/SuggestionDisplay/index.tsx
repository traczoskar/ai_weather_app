import Container from "../../../components/Container";
import Loader from "../../../components/Loader";
import { GeocodingData, QueryData } from "../../../types/types";
import { useEffect, useRef, useState } from "react";
import CollapseIcon from "../../../assets/icons/suggestions/collapse.svg?react";
import ExpandIcon from "../../../assets/icons/suggestions/expand.svg?react";
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
import { useMediaQuery } from "react-responsive";
import Popover from "../../../components/Popover";
import Error from "../../../components/Error";

interface SuggestionsDisplayProps {
  aiData: QueryData;
  aiRequest: () => void;
  selectedLocation: GeocodingData | null;
  weatherData: QueryData;
}

const SuggestionDisplay: React.FC<SuggestionsDisplayProps> = ({
  aiData,
  aiRequest,
  selectedLocation,
  weatherData,
}) => {
  const { isPending, data, error } = aiData;
  const { data: weather } = weatherData;
  const isTablet = useMediaQuery({ query: "(max-width: 1023px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 550px)" });
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  useEffect(() => {
    setAiResponse(data);
  }, [data]);

  useEffect(() => {
    setAiResponse(null);
  }, [selectedLocation]);

  useEffect(() => {
    setTimeout(() => {
      setIsPopoverOpen(true);
      setAnchorEl(buttonRef.current);
    }, 1000);
  }, [aiResponse]);

  return (
    <>
      {!aiResponse && !isPending && weather && (
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          aria-label="Ask AI for suggestions"
          title="Ask AI for suggestions"
          className="sm:self-end w-full sm:w-auto"
          onClick={aiRequest}
          data-test="ai-button"
        >
          <Container isButton={true}>
            <span className="  text-sky-800 transition-colors dark:text-sky-200 text-sm flex flex-wrap gap-2 drop-shadow items-center">
              <span className="dark:text-fuchsia-400  text-fuchsia-600 drop-shadow-sm dark:drop-shadow-md">
                <StarsIcon width={23} height={23} />
              </span>
              Click to ask AI for suggestions
            </span>
          </Container>
        </motion.button>
      )}
      {isPending && (
        <motion.div
          className="flex w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.75 }}
          aria-busy="true"
          data-test="ai-waiting"
        >
          <Container>
            <div className="w-full h-32 flex justify-center items-center gap-4 animate-pulseQuick">
              <span className="font-semibold text-md md:text-xl text-sky-600 dark:text-sky-200 drop-shadow">
                🤖 Waiting for AI response ...
              </span>
              <Loader />
            </div>
          </Container>
        </motion.div>
      )}
      {error && <Error error={error} refersTo="AI response section" />}
      {aiResponse && !isCollapsed ? (
        <Container
          isCollapsed={isCollapsed}
          aria-expanded="true"
          aria-label="AI response"
        >
          <motion.section
            className="flex flex-col w-full "
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.75 }}
            data-test="ai-expanded"
          >
            <div className="flex justify-between lg:gap-4 w-full">
              <h2 className="text-sky-700 transition-colors dark:text-sky-200 text-lg sm:text-xl md:text-2xl font-bold flex flex-wrap gap-3 drop-shadow items-center">
                {isMobile
                  ? "AI advices"
                  : `AI advices for today ${
                      data.location ? `at ${data.location}` : ""
                    }`}
                <span className="text-fuchsia-400 drop-shadow-md">
                  <StarsIcon
                    width={isMobile ? 23 : 28}
                    height={isMobile ? 23 : 28}
                  />
                </span>
              </h2>
              <div className="flex gap-4">
                {!isTablet && (
                  <p className="flex gap-2 text-sky-600 transition-colors dark:text-sky-300 text-sm drop-shadow items-center ">
                    <LocationIcon width={20} height={20} /> {data.location},{" "}
                    {data.date}
                  </p>
                )}
                <button
                  className="text-sky-600 dark:text-sky-400 p-3 hover:bg-sky-100 dark:hover:bg-sky-700 transition-colors"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                >
                  {isCollapsed ? (
                    <ExpandIcon width={25} height={25} />
                  ) : (
                    <CollapseIcon width={25} height={25} />
                  )}
                </button>
              </div>
            </div>
            {isTablet && (
              <p className="flex gap-2 text-sky-600 transition-colors dark:text-sky-300 text-sm sm:text-md drop-shadow items-center ">
                <LocationIcon width={20} height={20} /> {data.location},{" "}
                {data.date}
              </p>
            )}
            <article
              data-test="ai-expanded-general"
              className="flex flex-col text-md text-gray-700 dark:text-white mt-8"
            >
              <SuggestionTile
                general_advice={{
                  title: "Summary from AI:",
                  text: data.suggestions.general_advice,
                }}
                mood={{
                  title: "Mood:",
                  text: data.suggestions.mood,
                }}
              />
              <div
                data-test="ai-expanded-list"
                className="grid grid-cols-1 md:grid-cols-2 gap-4 text-md mt-4"
              >
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
            <p
              data-test="ai-tip"
              className="text-sm dark:text-sky-300  text-sky-700 mt-4"
            >
              <span className="font-bold">✅ Tip:</span> To unlock next AI query
              first search for new location.
            </p>
          </motion.section>
        </Container>
      ) : (
        aiResponse && (
          <Container
            isCollapsed={isCollapsed}
            aria-expanded="false"
            aria-label="AI response"
          >
            <motion.section
              className="flex flex-col w-full"
              data-test="ai-collapsed"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.75 }}
            >
              <div className="flex justify-between lg:gap-4  w-full">
                <h2 className="text-sky-700 transition-colors dark:text-sky-200   text-lg sm:text-xl md:text-2xl font-bold flex flex-wrap gap-3 drop-shadow items-center">
                  {isMobile
                    ? "AI advices"
                    : `AI advices for today ${
                        data.location ? `at ${data.location}` : ""
                      }`}
                  <span className="text-fuchsia-400 drop-shadow-md">
                    <StarsIcon
                      width={isMobile ? 23 : 28}
                      height={isMobile ? 23 : 28}
                    />
                  </span>
                </h2>
                <div className="flex gap-4">
                  {!isTablet && (
                    <p className="flex gap-2 text-sky-600 transition-colors dark:text-sky-300 text-sm drop-shadow items-center">
                      <LocationIcon width={20} height={20} /> {data.location},{" "}
                      {data.date}
                    </p>
                  )}
                  <button
                    ref={buttonRef}
                    aria-label="Expand AI advice"
                    data-test="ai-expand-button"
                    className="text-sky-600 dark:text-sky-400 p-3 hover:bg-sky-100 dark:hover:bg-sky-700 transition-colors"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    onMouseEnter={() => setAnchorEl(buttonRef.current)}
                  >
                    {isCollapsed ? (
                      <ExpandIcon width={25} height={25} />
                    ) : (
                      <CollapseIcon width={25} height={25} />
                    )}
                  </button>
                  <Popover
                    anchorEl={anchorEl}
                    open={isPopoverOpen}
                    onClose={() => setIsPopoverOpen(false)}
                  >
                    <p>Click the button to expand AI advice.</p>
                  </Popover>
                </div>
              </div>
              <article
                data-test="ai-collapsed-general"
                className="flex flex-col text-md text-gray-700 dark:text-white mt-4"
              >
                <SuggestionTile
                  general_advice={{
                    title: "Summary from AI:",
                    text: data.suggestions.general_advice,
                  }}
                  mood={{
                    title: "Mood:",
                    text: data.suggestions.mood,
                  }}
                />
              </article>
            </motion.section>
          </Container>
        )
      )}
    </>
  );
};

export default SuggestionDisplay;
