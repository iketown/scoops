import isEqual from "lodash.isequal";

export const isConeCorrect = (order: Flavor[], scoops?: string[]) => {
  const scoopsNoIds = scoops?.map((flavorId) => {
    const [flavor] = flavorId.split("__");
    return flavor;
  });
  return isEqual(order, scoopsNoIds);
};
