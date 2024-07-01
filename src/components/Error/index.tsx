import Container from "../Container";

interface ErrorProps {
  error: Error | null;
  refersTo?: string;
}

const Error: React.FC<ErrorProps> = ({ error, refersTo }) => {
  return (
    <Container>
      <div className="flex flex-col items-center gap-2 w-full p-6 bg-sky-100 dark:bg-sky-900 rounded-xl shadow-md">
        <h3 className="font-bold text-sky-800 dark:text-sky-100 text-lg md:text-2xl text-center drop-shadow">
          🫢 Oops! An <span className="text-red-500">error</span> has occured.
        </h3>
        <h4 className="font-bold text-sky-700 dark:text-sky-100 text-md md:text-xl">
          🚨 Error Details :
        </h4>
        {refersTo ? (
          <p className="font-normal text-sky-700 dark:text-sky-100 text-md md:text-xl">
            (Refers to: {refersTo})
          </p>
        ) : null}
        {error?.name ? (
          <p className="font-normal  text-sky-700 dark:text-sky-200 text-sm md:text-lg drop-shadow-md">
            <span className="text-sky-800 font-bold dark:text-sky-300">
              Error name:
            </span>{" "}
            {error?.name}
          </p>
        ) : null}
        {error?.message ? (
          <p className="font-normal text-sky-700 dark:text-sky-200 text-sm md:text-lg drop-shadow-md">
            <span className="text-sky-800 font-bold dark:text-sky-300">
              Error message:
            </span>{" "}
            {error?.message || "An unknown error has occured."}
          </p>
        ) : null}
        <p className="text-center text-sky-600 text-sm md:text-md dark:text-sky-300">
          Please check your internet connection and try to reload the app ♻️{" "}
          <br />
          If the problem persists, please contact the developer.
        </p>
      </div>
    </Container>
  );
};

export default Error;
