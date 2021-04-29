export const ordersReducer = (state: OrdersState, action: any) => {
  switch (action.type) {
    case "ADD_CONE": {
      const { coneId, newOrder } = action.payload;
      if (!coneId || !newOrder) return state;
      return { ...state, [coneId]: newOrder };
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
