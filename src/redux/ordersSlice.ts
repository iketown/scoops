import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { getRandomOrder } from "utils/randomOrder";

const initialState: OrdersState = {
  cone_A: ["brown", "blue"],
  cone_B: ["green", "pink"],
  cone_C: ["blue", "white"],
};

export const ordersSlice = createSlice({
  initialState,
  name: "orders",
  reducers: {
    addCone: {
      reducer: (
        state,
        action: PayloadAction<{ coneId: string; newOrder: Flavor[] }>
      ) => {
        const { coneId, newOrder } = action.payload;
        state[coneId] = newOrder;
      },
      prepare: () => {
        const coneId = `cone__${nanoid(5)}`;
        const newOrder = getRandomOrder();
        return {
          payload: {
            coneId,
            newOrder,
          },
        };
      },
    },
    removeCone: (state, action: PayloadAction<string>) => {
      const coneId = action.payload;
      delete state[coneId];
    },
  },
});

export const ordersReducer = ordersSlice.reducer;
export const ordersActions = ordersSlice.actions;
