import { QueryData } from "../../../../types/types";

interface AirPollutionProps {
  airPollutionData: QueryData;
}

const AirPollutionInfo: React.FC<AirPollutionProps> = ({
  airPollutionData,
}) => {
  const { isPending, data, error } = airPollutionData;
  const airComponents = data?.list[0].components;

  return (
    <div className="w-full p-8 rounded-3xl bg-sky-100 ">
      <h2 className="text-sky-700 text-xl font-semibold">Air Pollution Info</h2>
      <ul>
        {airComponents
          ? Object.entries(data).map(([key, value]) => (
              <li key={key}>
                {key} - {value as number}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default AirPollutionInfo;
