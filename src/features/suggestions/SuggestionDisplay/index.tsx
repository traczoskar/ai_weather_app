import TranspContainer from "../../../components/TranspContainer";
import ReactMarkdown from "react-markdown";
import Loader from "../../../components/Loader";

interface AiData {
  isPending: boolean;
  data: any | null;
  error: any | null;
}
interface SuggestionsDisplayProps {
  aiData: AiData;
}

const SuggestionDisplay: React.FC<SuggestionsDisplayProps> = ({ aiData }) => {
  const { isPending, data, error } = aiData;

  {
    isPending && <Loader borderColor="black" />;
  }
  {
    error && <h3>{error.message}</h3>;
  }

  return (
    <>
      {data && (
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
