import TranspContainer from "../../../components/TranspContainer";
import ReactMarkdown from "react-markdown";
import Loader from "../../../components/Loader";
import { GeocodingData, QueryData } from "../../../types/types";
import { useEffect, useState } from "react";

interface SuggestionsDisplayProps {
  aiData: QueryData;
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
    isPending && <Loader borderColor="black" />;
  }
  {
    error && <h3>{error.message}</h3>;
  }

  return (
    <>
      {aiResponse && (
        <TranspContainer>
          <section className="flex flex-col w-auto">
            <h2 className="text-2xl font-bold mb-4">AI suggestion:</h2>
            <article className="text-md text-gray-700">
              <ReactMarkdown>{data}</ReactMarkdown>
            </article>
          </section>
        </TranspContainer>
      )}
    </>
  );
};

export default SuggestionDisplay;
