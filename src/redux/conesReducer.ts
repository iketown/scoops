export const conesReducer = (
  state: ConesState = {
    cone_B: ["green__123"],
  },
  action: any
) => {
  switch (action.type) {
    case "ADD_SCOOP": {
      const { flavorId, coneId } = action.payload;
      if (!flavorId || !coneId) return state;
      const oldCone = state[coneId] || [];
      const newCones = { ...state, [coneId]: [...oldCone, flavorId] };
      return newCones;
    }
    case "REMOVE_SCOOP": {
      const { coneId, index } = action.payload;
      if (!coneId || typeof index !== "number") return state;
      const oldCone = state[coneId] || [];
      const newCone = [...oldCone.slice(0, index), ...oldCone.slice(index + 1)];
      return { ...state, [coneId]: newCone };
    }
    case "ADD_CONE": {
      const { coneId } = action.payload;
      if (!coneId) return state;
      return { ...state, [coneId]: [] };
    }
    case "REMOVE_CONE": {
      const { coneId } = action.payload;
      const newState = { ...state };
      delete newState[coneId];
      return newState;
    }
    default:
      return state;
  }
};
