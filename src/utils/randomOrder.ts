import { colors } from "constants/colors";

const getRandomColor = (): Flavor => {
  const options = Object.keys(colors);
  return options[Math.floor(Math.random() * options.length)] as Flavor;
};

export const getRandomOrder = (): Flavor[] => {
  const length = Math.ceil(Math.random() * 5);
  return Array.from({ length }, getRandomColor);
};
