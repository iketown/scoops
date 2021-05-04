import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { ordersActions } from "./ordersSlice";
const { addCone, removeCone } = ordersActions;

const initialState: ConesState = {
  cone_B: ["green__123"],
};

export const conesSlice = createSlice({
  name: "cones",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addCone, (state, action) => {
      const { coneId } = action.payload;
      state[coneId] = [];
    });
    builder.addCase(removeCone, (state, action) => {
      const coneId = action.payload;
      delete state[coneId];
    });
  },
  reducers: {
    addScoop: {
      reducer: (
        state,
        action: PayloadAction<{ flavorId: string; coneId: string }>
      ) => {
        const { flavorId, coneId } = action.payload;
        const newCone = state[coneId] || [];
        newCone.push(flavorId);
        state[coneId] = newCone;
      },
      prepare: ({ flavor, coneId }: { flavor: Flavor; coneId: string }) => {
        const id = nanoid(5);
        const flavorId = `${flavor}__${id}`;
        return {
          payload: {
            flavorId,
            coneId,
          },
        };
      },
    },
    removeScoop: (
      state,
      action: PayloadAction<{
        coneId: string;
        index: number;
      }>
    ) => {
      const { coneId, index } = action.payload;
      if (!coneId || typeof index !== "number") return state;
      const oldCone = state[coneId] || [];
      const newCone = [...oldCone.slice(0, index), ...oldCone.slice(index + 1)];
      state[coneId] = newCone;
    },
  },
});

export const conesReducer = conesSlice.reducer;
export const conesActions = conesSlice.actions;
