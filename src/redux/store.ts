import { configureStore } from "@reduxjs/toolkit";
import { conesReducer } from "./conesReducer";
import { gameReducer } from "./gameReducer";
import { ordersReducer } from "./ordersReducer";

export const store = configureStore({
  reducer: {
    cones: conesReducer,
    orders: ordersReducer,
    game: gameReducer,
  },
});
