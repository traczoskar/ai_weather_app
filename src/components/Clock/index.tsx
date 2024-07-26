import { useEffect, useState } from "react";

interface ClockProps {
  timezone: number;
}

const Clock: React.FC<ClockProps> = ({ timezone }) => {
  const [currentTime, setCurrentTime] = useState<string>("");

  const updateTime = () => {
    const now = new Date();
    const localTime = now.getTime();
    const localOffset = now.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const targetTime = utc + timezone * 1000;
    const targetDate = new Date(targetTime);

    const hours = targetDate.getHours().toString().padStart(2, "0");
    const minutes = targetDate.getMinutes().toString().padStart(2, "0");
    const seconds = targetDate.getSeconds().toString().padStart(2, "0");

    setCurrentTime(`${hours}:${minutes}:${seconds}`);
  };

  useEffect(() => {
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, [timezone]);

  return <span data-test="clock">{currentTime}</span>;
};

export default Clock;
