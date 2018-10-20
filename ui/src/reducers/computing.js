const computing = (state = false, action) => {
  switch (action.type) {
    case "COMPUTING":
      return action.value;
    default:
      return state;
  }
};

export default computing;