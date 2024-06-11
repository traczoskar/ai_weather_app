import WeatherForm from "../../features/weather/WeatherForm";

interface HeaderProps {
  title: string;
  updateLocation: (location: any) => void;
  weatherData: {
    isPending: boolean;
    data: any;
    error: any;
  } | null;
}

const Header = ({ title, updateLocation, weatherData }: HeaderProps) => {
  return (
    <header className="flex justify-between items-center w-full mt-6">
      <div className="flex items-center">
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          className="w-8 h-8 mr-3"
          viewBox="0 0 512 512"
        >
          <g>
            <g>
              <path
                fill="currentColor"
                d="M407,0H105C47.103,0,0,47.103,0,105v302c0,57.897,47.103,105,105,105h302c57.897,0,105-47.103,105-105V105
			C512,47.103,464.897,0,407,0z M128.801,279.245C100.655,266.854,81,238.726,81,206c0-44.183,35.817-80,80-80
			c27.611,0,51.939,13.997,66.312,35.275c-41.606,13.414-72.466,50.983-75.978,96.107
			C142.342,263.024,134.676,270.512,128.801,279.245z M361,366c-23.971,0-152.096,0-170,0c-24.853,0-45-20.147-45-45
			c0-21.687,15.343-39.787,35.765-44.048C181.274,273.37,181,269.718,181,266c0-44.183,35.817-80,80-80
			c38.711,0,70.997,27.496,78.401,64.023C346.105,247.434,353.383,246,361,246c33.137,0,60,26.863,60,60
			C421,339.137,394.137,366,361,366z"
              />
            </g>
          </g>
        </svg>
        <h1 className="text-3xl font-bold font-['Raleway'] ">{title}</h1>
      </div>
      <WeatherForm updateLocation={updateLocation} weatherData={weatherData} />
    </header>
  );
};

export default Header;
