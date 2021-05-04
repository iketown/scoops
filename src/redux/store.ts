import { configureStore } from "@reduxjs/toolkit";
import { conesReducer } from "./conesReducer";
import { gameReducer } from "./gameReducer";
import { ordersReducer } from "./ordersSlice";

export const store = configureStore({
  reducer: {
    cones: conesReducer,
    orders: ordersReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
