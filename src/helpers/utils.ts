export const parseTime = (unix_timestamp: number) => {
  const date = new Date(unix_timestamp * 1000);
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);