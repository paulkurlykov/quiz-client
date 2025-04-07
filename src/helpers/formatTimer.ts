const formatTimer = (timer: number) => {
  const formatTime = (time: number) => time.toString().padStart(2, "0");
  const hours = String(formatTime(Math.floor(timer / 3600)));
  const mins = String(formatTime(Math.floor((timer % 3600) / 60)));
  const secs = String(formatTime(timer % 60));

  return { hours, mins, secs };
};

export default formatTimer;