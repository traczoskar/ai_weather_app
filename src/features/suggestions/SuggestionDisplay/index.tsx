import { useSelector } from "react-redux";
import TranspContainer from "../../../components/TranspContainer";
import { selectAIResponse } from "../../../slices/aiCompletionSlice";
import ReactMarkdown from "react-markdown";

const SuggestionDisplay = () => {
  const aiResponse = useSelector(selectAIResponse);
  return (
    <>
      {aiResponse && (
        <TranspContainer>
          <section className="flex flex-col w-96">
            <h2 className="text-2xl font-bold mb-4">AI suggestion:</h2>
            <article className="text-sm text-gray-200">
              {/* <p className="text-sm font-normal py-4 whitespace-pre-line">
          {aiResponse}
        </p> */}
              <ReactMarkdown>{aiResponse}</ReactMarkdown>
            </article>
          </section>
        </TranspContainer>
      )}
    </>
  );
};
export default SuggestionDisplay;
