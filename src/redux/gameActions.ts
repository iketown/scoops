import { nanoid } from "nanoid";
import { getRandomOrder } from "utils/randomOrder";
import { createAction } from "@reduxjs/toolkit";

export const incrementCones = createAction("INCREMENT_CONES");

export const addTip = createAction("ADD_TIP", (tip: number) => {
  return {
    payload: {
      tip,
    },
  };
});

export const setSelectedCone = createAction(
  "SET_SELECTED_CONE",
  (coneId: string) => {
    return {
      payload: {
        coneId,
      },
    };
  }
);

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
