const faces = (state = {
  rects: [],
  members: {
    member1: {face: undefined, name: "Not recognized"},
    member2: {face: undefined, name: "Not recognized"},
    member3: {face: undefined, name: "Not recognized"}
  }}, action) => {
  switch (action.type) {
    case "NEW_RECTS":
      return {
        ...state,
        rects: action.value,
      };
    case "NEW_FACE":
      return {
        ...state,
        members: {
          ...state.members,
          [action.id]: {
            ...state.members[action.id],
            face: action.value
          }
        }
      };
    case "NEW_NAME":
      return {
        ...state,
        members: {
          ...state.members,
          [action.id]: {
            ...state.members[action.id],
            name: action.value
          }
        }
      };
    default:
      return state;
  }
};

export default faces;