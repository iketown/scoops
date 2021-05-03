import { incrementCones, addTip, setSelectedCone } from "redux/gameActions";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  tips: 0,
  finishedCones: 0,
  selectedConeId: "",
};

export const gameReducer = createReducer(initialState, (builder) => {
  builder.addCase(incrementCones, (state, action) => {
    state.finishedCones++;
  });
  builder.addCase(addTip, (state, action) => {
    const { tip } = action.payload;
    state.tips += tip;
  });
  builder.addCase(setSelectedCone, (state, action) => {
    const { coneId } = action.payload;
    if (!coneId) return state;
    state.selectedConeId = coneId;
  });
});
