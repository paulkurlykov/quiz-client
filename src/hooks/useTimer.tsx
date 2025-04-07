import { useEffect, useState } from "react";

const useTimer = () => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimer((st) => st + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => time.toString().padStart(2, "0");
  const hours = formatTime(Math.floor(timer / 3600));
  const mins = formatTime(Math.floor((timer % 3600) / 60));
  const secs = formatTime(timer % 60);

  return { hours, mins, secs };
};

export default useTimer;