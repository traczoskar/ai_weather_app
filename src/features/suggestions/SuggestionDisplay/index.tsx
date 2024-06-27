import TranspContainer from "../../../components/TranspContainer";
import ReactMarkdown from "react-markdown";
import Loader from "../../../components/Loader";
import { GeocodingData, QueryData } from "../../../types/types";
import { useEffect, useState } from "react";
import StarsIcon from "../../../assets/icons/stars.svg?react";
import Button from "../../../components/Button";

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
          <section className="flex flex-col w-auto">
            <h2 className="text-2xl font-bold mb-4 dark:text-sky-100">
              AI suggestion:
            </h2>
            <article className="text-md text-gray-700 dark:text-white">
              <ReactMarkdown>{data[0].response}</ReactMarkdown>
            </article>
          </section>
        </TranspContainer>
      )}
    </>
  );
};

export default SuggestionDisplay;
