import { nanoid } from "nanoid";
import { getRandomOrder } from "utils/randomOrder";
export const incrementCones = () => {
  return {
    type: "INCREMENT_CONES",
  };
};

export const addTip = (tip: number) => {
  return {
    type: "ADD_TIP",
    payload: {
      tip,
    },
  };
};

export const addScoop = ({
  flavor,
  coneId,
}: {
  flavor: Flavor;
  coneId: string;
}) => {
  const id = nanoid(5);
  const flavorId = `${flavor}__${id}`;
  return {
    type: "ADD_SCOOP",
    payload: {
      flavorId,
      coneId,
    },
  };
};
export const addCone = () => {
  const coneId = `cone__${nanoid(5)}`;
  const newOrder = getRandomOrder();
  return {
    type: "ADD_CONE",
    payload: {
      coneId,
      newOrder,
    },
  };
};

export const removeScoop = ({
  coneId,
  index,
}: {
  coneId: string;
  index: number;
}) => {
  return {
    type: "REMOVE_SCOOP",
    payload: {
      coneId,
      index,
    },
  };
};
export const removeCone = (coneId: string) => {
  return {
    type: "REMOVE_CONE",
    payload: {
      coneId,
    },
  };
};
