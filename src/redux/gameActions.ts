export const incrementCones = () => {
  return {
    type: "INCREMENT_CONES",
  };
};

export const addTip = (tip: number) => {
  return {
    type: "ADD_TIP",
    payload: {
      tip,
    },
  };
};
