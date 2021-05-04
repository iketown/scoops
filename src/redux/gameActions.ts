import { createAction } from "@reduxjs/toolkit";
import { ordersActions } from "./ordersSlice";
import { conesActions } from "./conesSlice";

export const incrementCones = createAction("INCREMENT_CONES");

export const { addCone, removeCone } = ordersActions;
export const { addScoop, removeScoop } = conesActions;

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
