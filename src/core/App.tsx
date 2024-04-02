import { useDispatch, useSelector } from "react-redux";
import {
  fetchGeoCoding,
  selectError,
  selectGeoCodingData,
  selectStatus,
} from "./apiDataSlice";

export default function App() {
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const response = useSelector(selectGeoCodingData);
  const dispatch = useDispatch();

  return (
    <>
      <h1 className="text-3xl">Hello world!</h1>
      <div>
        <button onClick={() => dispatch(fetchGeoCoding())}>
          Pobierz dane geolokalizacyjne
        </button>
        {status === "loading" && <p>Ładowanie...</p>}
        {status === "error" && <p>Wystąpił błąd: {error}</p>}
        {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      </div>
    </>
  );
}
