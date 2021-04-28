interface GameState {
  tips: number;
  finishedCones: number;
}

export const gameReducer = (state: GameState, action: any): GameState => {
  if (action.type === "INCREMENT_CONES") {
    const finishedCones = state.finishedCones + 1;
    return { ...state, finishedCones };
  }
  if (action.type === "ADD_TIP") {
    const { tip } = action.payload;
    return { ...state, tips: state.tips + tip };
  }
  return state;
};
