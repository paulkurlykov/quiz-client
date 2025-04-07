import { useState, useEffect } from "react";
import { useQuestions } from "@/context/main.context";
import formatTimer from "@/helpers/formatTimer";
import DisplayTime from "./DisplayTime";


function Timer() {
  const [timer, setTimer] = useState(0);

  const { dispatch } = useQuestions();

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((st) => st + 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    dispatch({ type: "updateTimer", payload: timer });
  }, [timer, dispatch]);



  const {hours, mins, secs} = formatTimer(timer);

  return (
        <DisplayTime hours={hours} mins={mins} secs={secs} />
  );
}

export default Timer;
