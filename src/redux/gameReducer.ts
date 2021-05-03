interface GameState {
  tips: number;
  finishedCones: number;
  selectedConeId: string;
}

export const gameReducer = (
  state: GameState = {
    tips: 0,
    finishedCones: 0,
    selectedConeId: "",
  },
  action: any
): GameState => {
  if (action.type === "INCREMENT_CONES") {
    const finishedCones = state.finishedCones + 1;
    return { ...state, finishedCones };
  }
  if (action.type === "ADD_TIP") {
    const { tip } = action.payload;
    return { ...state, tips: state.tips + tip };
  }
  if (action.type === "SET_SELECTED_CONE") {
    const { coneId } = action.payload;
    if (!coneId) return state;
    return { ...state, selectedConeId: coneId };
  }
  return state;
};
