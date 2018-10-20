const faces = (state = {faces: [], member: undefined}, action) => {
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
    default:
      return state;
  }
};

export default faces;