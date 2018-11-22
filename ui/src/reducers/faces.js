const faces = (state = {faces: [], member: undefined, name: "Not recognized"}, action) => {
  switch (action.type) {
    case "NEW_FACES":
      return {
        faces: action.value,
        member: state.member
      };
    case "NEW_FACE":
      return {
        member: action.value,
        faces: state.faces
      };
    case "NEW_NAME":
      return {
        ...state,
        name: action.value
      };
    default:
      return state;
  }
};

export default faces;