import TranspContainer from "../../../components/TranspContainer";

interface SuggestionDisplayProps {
  message: string;
}

const SuggestionDisplay = ({ message }: SuggestionDisplayProps) => {
  return (
    <TranspContainer>
      <section className="flex flex-col w-96">
        <h2 className="text-2xl font-bold mb-4">AI suggestion:</h2>
        <p>{message}</p>
      </section>
    </TranspContainer>
  );
};

export default SuggestionDisplay;
